import {
  ready,
  loadGraphModel,
  util,
  tensor1d,
  tensor2d,
  NamedTensorMap,
  Tensor,
  Tensor2D,
} from "@energetic-ai/core";
import type { GraphModel } from "@energetic-ai/core";
import { Tokenizer, Vocabulary } from "./tokenizer";

export type EmbeddingsModelData = {
  vocabulary: Vocabulary;
  model: GraphModel;
};

export type EmbeddingsModelSource = () => Promise<EmbeddingsModelData>;

interface EmbeddingModelInputs extends NamedTensorMap {
  indices: Tensor;
  values: Tensor;
}

class EmbeddingsModel {
  tokenizer: Tokenizer;
  model: GraphModel;

  constructor(data: EmbeddingsModelData) {
    this.tokenizer = new Tokenizer(data.vocabulary);
    this.model = data.model;
  }

  async embed(inputs: string[] | string): Promise<number[][]> {
    if (typeof inputs === "string") {
      inputs = [inputs];
    }
    const encodings = inputs.map((d) => this.tokenizer.encode(d));

    const indicesArr = encodings.map((arr, i) =>
      arr.map((d, index) => [i, index])
    );

    let flattenedIndicesArr: Array<[number, number]> = [];
    for (let i = 0; i < indicesArr.length; i++) {
      flattenedIndicesArr = flattenedIndicesArr.concat(
        indicesArr[i] as Array<[number, number]>
      );
    }

    const indices = tensor2d(
      flattenedIndicesArr,
      [flattenedIndicesArr.length, 2],
      "int32"
    );
    const values = tensor1d(util.flatten(encodings) as number[], "int32");

    const modelInputs: EmbeddingModelInputs = { indices, values };

    const embeddingsTensor = await this.model.executeAsync(modelInputs);
    indices.dispose();
    values.dispose();

    return await (embeddingsTensor as Tensor2D).array();
  }
}

export const remoteModelSource: EmbeddingsModelSource =
  async function (): Promise<EmbeddingsModelData> {
    const [model, vocabulary] = await Promise.all([
      loadGraphModel(
        "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1",
        { fromTFHub: true }
      ),
      util
        .fetch(
          "https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/vocab.json"
        )
        .then((d) => d.json()),
    ]);

    return { model, vocabulary };
  };

export async function initModel(
  source: EmbeddingsModelSource = remoteModelSource
) {
  const [_, data] = await Promise.all([ready(), source()]);
  return new EmbeddingsModel(data);
}
