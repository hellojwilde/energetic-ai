var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../embeddings/dist/index.js
var require_dist = __commonJS({
  "../embeddings/dist/index.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var lib_exports2 = {};
    __export2(lib_exports2, {
      EmbeddingsModel: () => EmbeddingsModel2,
      distance: () => distance,
      initModel: () => initModel2,
      remoteModelSource: () => remoteModelSource2
    });
    module2.exports = __toCommonJS2(lib_exports2);
    var import_core4 = require("@energetic-ai/core");
    var stringToChars = (input) => {
      const symbols = [];
      for (const symbol of input) {
        symbols.push(symbol);
      }
      return symbols;
    };
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
    var EmbeddingsModel2 = class {
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
        const indices = (0, import_core4.tensor2d)(
          flattenedIndicesArr,
          [flattenedIndicesArr.length, 2],
          "int32"
        );
        const values = (0, import_core4.tensor1d)(import_core4.util.flatten(encodings), "int32");
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
      const tensor1 = (0, import_core4.tensor1d)(embedding1);
      const tensor2 = (0, import_core4.tensor1d)(embedding2);
      return (0, import_core4.div)(
        (0, import_core4.dot)(tensor1, tensor2),
        (0, import_core4.mul)((0, import_core4.norm)(tensor1), (0, import_core4.norm)(tensor2))
      ).arraySync();
    }
    var remoteModelSource2 = async function() {
      const [model, vocabulary] = await Promise.all([
        (0, import_core4.loadGraphModel)(
          "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1",
          { fromTFHub: true }
        ),
        import_core4.util.fetch(
          "https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/vocab.json"
        ).then((d) => d.json())
      ]);
      return { model, vocabulary };
    };
    async function initModel2(source = remoteModelSource2) {
      const [_, data] = await Promise.all([(0, import_core4.ready)(), source()]);
      return new EmbeddingsModel2(data);
    }
  }
});

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  initClassifier: () => initClassifier
});
module.exports = __toCommonJS(lib_exports);
var import_embeddings = __toESM(require_dist());

// lib/knnClassifier.ts
var import_core2 = require("@energetic-ai/core");

// lib/util.ts
var import_core = require("@energetic-ai/core");
function concatWithNulls(ndarray1, ndarray2) {
  if (ndarray1 == null && ndarray2 == null) {
    return null;
  }
  if (ndarray1 == null) {
    return ndarray2.clone();
  } else if (ndarray2 === null) {
    return ndarray1.clone();
  }
  return (0, import_core.concat)([ndarray1, ndarray2], 0);
}
function topK(values, k) {
  const valuesAndIndices = [];
  for (let i = 0; i < values.length; i++) {
    valuesAndIndices.push({ value: values[i], index: i });
  }
  valuesAndIndices.sort((a, b) => {
    return b.value - a.value;
  });
  const topkValues = new Float32Array(k);
  const topkIndices = new Int32Array(k);
  for (let i = 0; i < k; i++) {
    topkValues[i] = valuesAndIndices[i].value;
    topkIndices[i] = valuesAndIndices[i].index;
  }
  return { values: topkValues, indices: topkIndices };
}

// lib/knnClassifier.ts
var KNNClassifier = class {
  constructor() {
    // Individual class datasets used when adding examples. These get concatenated
    // into the full trainDatasetMatrix when a prediction is made.
    this.classDatasetMatrices = {};
    this.classExampleCount = {};
    this.labelToClassId = {};
    this.nextClassId = 0;
  }
  /**
   * Adds the provided example to the specified class.
   */
  addExample(example, label) {
    if (this.exampleShape == null) {
      this.exampleShape = example.shape;
    }
    if (!import_core2.util.arraysEqual(this.exampleShape, example.shape)) {
      throw new Error(
        `Example shape provided, ${example.shape} does not match previously provided example shapes ${this.exampleShape}.`
      );
    }
    this.clearTrainDatasetMatrix();
    if (!(label in this.labelToClassId)) {
      this.labelToClassId[label] = this.nextClassId++;
    }
    (0, import_core2.tidy)(() => {
      const normalizedExample = this.normalizeVectorToUnitLength(
        (0, import_core2.reshape)(example, [example.size])
      );
      const exampleSize = normalizedExample.shape[0];
      if (this.classDatasetMatrices[label] == null) {
        this.classDatasetMatrices[label] = (0, import_core2.reshape)(normalizedExample, [
          1,
          exampleSize
        ]);
      } else {
        const newTrainLogitsMatrix = (0, import_core2.concat)(
          [
            (0, import_core2.reshape)(this.classDatasetMatrices[label], [
              this.classExampleCount[label],
              exampleSize
            ]),
            (0, import_core2.reshape)(normalizedExample, [1, exampleSize])
          ],
          0
        );
        this.classDatasetMatrices[label].dispose();
        this.classDatasetMatrices[label] = newTrainLogitsMatrix;
      }
      (0, import_core2.keep)(this.classDatasetMatrices[label]);
      if (this.classExampleCount[label] == null) {
        this.classExampleCount[label] = 0;
      }
      this.classExampleCount[label]++;
    });
  }
  /**
   * This method return distances between the input and all examples in the
   * dataset.
   *
   * @param input The input example.
   * @returns cosine similarities for each entry in the database.
   */
  similarities(input) {
    return (0, import_core2.tidy)(() => {
      const normalizedExample = this.normalizeVectorToUnitLength(
        (0, import_core2.reshape)(input, [input.size])
      );
      const exampleSize = normalizedExample.shape[0];
      if (this.trainDatasetMatrix == null) {
        let newTrainLogitsMatrix = null;
        for (const label in this.classDatasetMatrices) {
          newTrainLogitsMatrix = concatWithNulls(
            newTrainLogitsMatrix,
            this.classDatasetMatrices[label]
          );
        }
        this.trainDatasetMatrix = newTrainLogitsMatrix;
      }
      if (this.trainDatasetMatrix == null) {
        console.warn("Cannot predict without providing training examples.");
        return null;
      }
      (0, import_core2.keep)(this.trainDatasetMatrix);
      const numExamples = this.getNumExamples();
      return (0, import_core2.reshape)(
        (0, import_core2.matMul)(
          (0, import_core2.reshape)(this.trainDatasetMatrix, [numExamples, exampleSize]),
          (0, import_core2.reshape)(normalizedExample, [exampleSize, 1])
        ),
        [numExamples]
      );
    });
  }
  /**
   * Predicts the class of the provided input using KNN from the previously-
   * added inputs and their classes.
   *
   * @param input The input to predict the class for.
   * @returns A dict of the top class for the input and an array of confidence
   * values for all possible classes.
   */
  async predictClass(input, k = 3) {
    if (k < 1) {
      throw new Error(
        `Please provide a positive integer k value to predictClass.`
      );
    }
    if (this.getNumExamples() === 0) {
      throw new Error(
        `You have not added any examples to the KNN classifier. Please add examples before calling predictClass.`
      );
    }
    const knn = (0, import_core2.tidy)(() => (0, import_core2.cast)(this.similarities(input), "float32"));
    const kVal = Math.min(k, this.getNumExamples());
    const topKIndices = topK(await knn.data(), kVal).indices;
    knn.dispose();
    return this.calculateTopClass(topKIndices, kVal);
  }
  /**
   * Clears the saved examples from the specified class.
   */
  clearClass(label) {
    if (this.classDatasetMatrices[label] == null) {
      throw new Error(`Cannot clear invalid class ${label}`);
    }
    this.classDatasetMatrices[label].dispose();
    delete this.classDatasetMatrices[label];
    delete this.classExampleCount[label];
    this.clearTrainDatasetMatrix();
  }
  clearAllClasses() {
    for (const label in this.classDatasetMatrices) {
      this.clearClass(label);
    }
  }
  getClassExampleCount() {
    return this.classExampleCount;
  }
  getClassifierDataset() {
    return this.classDatasetMatrices;
  }
  getNumClasses() {
    return Object.keys(this.classExampleCount).length;
  }
  setClassifierDataset(classDatasetMatrices) {
    this.clearTrainDatasetMatrix();
    this.classDatasetMatrices = classDatasetMatrices;
    for (const label in classDatasetMatrices) {
      this.classExampleCount[label] = classDatasetMatrices[label].shape[0];
    }
  }
  /**
   * Calculates the top class in knn prediction
   * @param topKIndices The indices of closest K values.
   * @param kVal The value of k for the k-nearest neighbors algorithm.
   */
  calculateTopClass(topKIndices, kVal) {
    let topLabel;
    const confidences = {};
    if (topKIndices == null) {
      return {
        classIndex: this.labelToClassId[topLabel],
        label: topLabel,
        confidences
      };
    }
    const classOffsets = {};
    let offset = 0;
    for (const label in this.classDatasetMatrices) {
      offset += this.classExampleCount[label];
      classOffsets[label] = offset;
    }
    const votesPerClass = {};
    for (const label in this.classDatasetMatrices) {
      votesPerClass[label] = 0;
    }
    for (let i = 0; i < topKIndices.length; i++) {
      const index = topKIndices[i];
      for (const label in this.classDatasetMatrices) {
        if (index < classOffsets[label]) {
          votesPerClass[label]++;
          break;
        }
      }
    }
    let topConfidence = 0;
    for (const label in this.classDatasetMatrices) {
      const probability = votesPerClass[label] / kVal;
      if (probability > topConfidence) {
        topConfidence = probability;
        topLabel = label;
      }
      confidences[label] = probability;
    }
    return {
      classIndex: this.labelToClassId[topLabel],
      label: topLabel,
      confidences
    };
  }
  /**
   * Clear the lazily-loaded train logits matrix due to a change in
   * training data.
   */
  clearTrainDatasetMatrix() {
    if (this.trainDatasetMatrix != null) {
      this.trainDatasetMatrix.dispose();
      this.trainDatasetMatrix = null;
    }
  }
  /**
   * Normalize the provided vector to unit length.
   */
  normalizeVectorToUnitLength(vec) {
    return (0, import_core2.tidy)(() => {
      const sqrtSum = (0, import_core2.norm)(vec);
      return (0, import_core2.div)(vec, sqrtSum);
    });
  }
  getNumExamples() {
    let total = 0;
    for (const label in this.classDatasetMatrices) {
      total += this.classExampleCount[label];
    }
    return total;
  }
  dispose() {
    this.clearTrainDatasetMatrix();
    for (const label in this.classDatasetMatrices) {
      this.classDatasetMatrices[label].dispose();
    }
  }
};

// lib/index.ts
var import_core3 = require("@energetic-ai/core");
var Classifier = class {
  constructor(examples, model) {
    this.model = model;
    this.knn = new KNNClassifier();
    for (let [embedding, label] of examples) {
      this.knn.addExample((0, import_core3.tensor1d)(embedding), label);
    }
  }
  async classify(inputs) {
    const wrappedInputs = typeof inputs === "string" ? [inputs] : inputs;
    const embeddings = await this.model.embed(wrappedInputs);
    const results = await Promise.all(
      embeddings.map((embedding) => this.knn.predictClass((0, import_core3.tensor1d)(embedding)))
    );
    if (typeof inputs === "string") {
      return results[0];
    }
    return results;
  }
};
async function initClassifier(examples, modelSource = import_embeddings.remoteModelSource) {
  const model = await (0, import_embeddings.initModel)(modelSource);
  const embeddings = await model.embed(examples.map((d) => d[0]));
  const examplesWithEmbeddings = examples.map(
    (d, i) => [embeddings[i], d[1]]
  );
  return new Classifier(examplesWithEmbeddings, model);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initClassifier
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
/**
 * @license
 * Copyright 2023 Real World Privacy LLC. All Rights Reserved.
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
