import {
  ready,
  loadGraphModel,
  util,
  tensor1d,
  tensor2d,
  NamedTensorMap,
  Tensor,
  Tensor2D,
  div,
  dot,
  norm,
  mul,
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

  async embed(input: string): Promise<number[]>;

  async embed(input: string[]): Promise<number[][]>;

  async embed(inputs: string[] | string): Promise<number[][] | number[]> {
    const wrappedInputs = typeof inputs === "string" ? [inputs] : inputs;
    const encodings = wrappedInputs.map((d) => this.tokenizer.encode(d));

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

    const embeddingsTensor = (await this.model.executeAsync(
      modelInputs
    )) as Tensor2D;
    indices.dispose();
    values.dispose();

    const embeddings = await embeddingsTensor.array();
    embeddingsTensor.dispose();

    return typeof inputs === "string" ? embeddings[0] : embeddings;
  }
}

export function distance(embedding1: number[], embedding2: number[]): number {
  const tensor1 = tensor1d(embedding1);
  const tensor2 = tensor1d(embedding2);
  return div(
    dot(tensor1, tensor2),
    mul(norm(tensor1), norm(tensor2))
  ).arraySync() as number;
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
