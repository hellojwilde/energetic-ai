var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  EmbeddingsModel: () => EmbeddingsModel,
  distance: () => distance,
  initModel: () => initModel,
  remoteModelSource: () => remoteModelSource
});
module.exports = __toCommonJS(lib_exports);
var import_core = require("@energetic-ai/core");

// lib/stringToChars.ts
var stringToChars = (input) => {
  const symbols = [];
  for (const symbol of input) {
    symbols.push(symbol);
  }
  return symbols;
};

// lib/trie.ts
var TrieNode = class {
  constructor() {
    this.parent = null;
    this.children = {};
    this.end = false;
    this.word = [[], 0, 0];
  }
};
var Trie = class {
  constructor() {
    this.root = new TrieNode();
  }
  /**
   * Inserts a token into the trie.
   */
  insert(word, score, index) {
    let node = this.root;
    const symbols = stringToChars(word);
    for (let i = 0; i < symbols.length; i++) {
      if (!node.children[symbols[i]]) {
        node.children[symbols[i]] = new TrieNode();
        node.children[symbols[i]].parent = node;
        node.children[symbols[i]].word[0] = node.word[0].concat(symbols[i]);
      }
      node = node.children[symbols[i]];
      if (i === symbols.length - 1) {
        node.end = true;
        node.word[1] = score;
        node.word[2] = index;
      }
    }
  }
  /**
   * Returns an array of all tokens starting with ss.
   *
   * @param ss The prefix to match on.
   */
  commonPrefixSearch(ss) {
    const output = [];
    let node = this.root.children[ss[0]];
    for (let i = 0; i < ss.length && node; i++) {
      if (node.end) {
        output.push(node.word);
      }
      node = node.children[ss[i + 1]];
    }
    if (!output.length) {
      output.push([[ss[0]], 0, 0]);
    }
    return output;
  }
};

// lib/tokenizer.ts
var separator = "\u2581";
function processInput(str) {
  const normalized = str.normalize("NFKC");
  return normalized.length > 0 ? separator + normalized.replace(/ /g, separator) : normalized;
}
var RESERVED_SYMBOLS_COUNT = 6;
var Tokenizer = class {
  constructor(vocabulary, reservedSymbolsCount = RESERVED_SYMBOLS_COUNT) {
    this.vocabulary = vocabulary;
    this.reservedSymbolsCount = reservedSymbolsCount;
    this.trie = new Trie();
    for (let i = this.reservedSymbolsCount; i < this.vocabulary.length; i++) {
      this.trie.insert(this.vocabulary[i][0], this.vocabulary[i][1], i);
    }
  }
  encode(input) {
    const nodes = [];
    const words = [];
    const best = [];
    input = processInput(input);
    const symbols = stringToChars(input);
    for (let i = 0; i <= symbols.length; i++) {
      nodes.push({});
      words.push(0);
      best.push(0);
    }
    for (let i = 0; i < symbols.length; i++) {
      const matches = this.trie.commonPrefixSearch(symbols.slice(i));
      for (let j = 0; j < matches.length; j++) {
        const piece = matches[j];
        const obj = { key: piece[0], score: piece[1], index: piece[2] };
        const endPos = piece[0].length;
        if (nodes[i + endPos][i] == null) {
          nodes[i + endPos][i] = [];
        }
        nodes[i + endPos][i].push(obj);
      }
    }
    for (let endPos = 0; endPos <= symbols.length; endPos++) {
      for (const startPos in nodes[endPos]) {
        const arr = nodes[endPos][startPos];
        for (let j = 0; j < arr.length; j++) {
          const word = arr[j];
          const score = word.score + best[endPos - word.key.length];
          if (best[endPos] === 0 || score >= best[endPos]) {
            best[endPos] = score;
            words[endPos] = arr[j].index;
          }
        }
      }
    }
    const results = [];
    let iter = words.length - 1;
    while (iter > 0) {
      results.push(words[iter]);
      iter -= this.vocabulary[words[iter]][0].length;
    }
    const merged = [];
    let isPreviousUnk = false;
    for (let i = 0; i < results.length; i++) {
      const id = results[i];
      if (!(isPreviousUnk && id === 0)) {
        merged.push(id);
      }
      isPreviousUnk = id === 0;
    }
    return merged.reverse();
  }
};

// lib/index.ts
var EmbeddingsModel = class {
  constructor(data) {
    this.tokenizer = new Tokenizer(data.vocabulary);
    this.model = data.model;
  }
  async embed(inputs) {
    const wrappedInputs = typeof inputs === "string" ? [inputs] : inputs;
    const encodings = wrappedInputs.map((d) => this.tokenizer.encode(d));
    const indicesArr = encodings.map(
      (arr, i) => arr.map((d, index) => [i, index])
    );
    let flattenedIndicesArr = [];
    for (let i = 0; i < indicesArr.length; i++) {
      flattenedIndicesArr = flattenedIndicesArr.concat(
        indicesArr[i]
      );
    }
    const indices = (0, import_core.tensor2d)(
      flattenedIndicesArr,
      [flattenedIndicesArr.length, 2],
      "int32"
    );
    const values = (0, import_core.tensor1d)(import_core.util.flatten(encodings), "int32");
    const modelInputs = { indices, values };
    const embeddingsTensor = await this.model.executeAsync(
      modelInputs
    );
    indices.dispose();
    values.dispose();
    const embeddings = await embeddingsTensor.array();
    embeddingsTensor.dispose();
    return typeof inputs === "string" ? embeddings[0] : embeddings;
  }
};
function distance(embedding1, embedding2) {
  const tensor1 = (0, import_core.tensor1d)(embedding1);
  const tensor2 = (0, import_core.tensor1d)(embedding2);
  return (0, import_core.div)(
    (0, import_core.dot)(tensor1, tensor2),
    (0, import_core.mul)((0, import_core.norm)(tensor1), (0, import_core.norm)(tensor2))
  ).arraySync();
}
var remoteModelSource = async function() {
  const [model, vocabulary] = await Promise.all([
    (0, import_core.loadGraphModel)(
      "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1",
      { fromTFHub: true }
    ),
    import_core.util.fetch(
      "https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/vocab.json"
    ).then((d) => d.json())
  ]);
  return { model, vocabulary };
};
async function initModel(source = remoteModelSource) {
  const [_, data] = await Promise.all([(0, import_core.ready)(), source()]);
  return new EmbeddingsModel(data);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmbeddingsModel,
  distance,
  initModel,
  remoteModelSource
});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
