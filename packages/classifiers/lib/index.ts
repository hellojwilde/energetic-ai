import {
  EmbeddingsModelSource,
  EmbeddingsModel,
  initModel,
  remoteModelSource,
} from "@energetic-ai/embeddings";
import { KNNClassifier } from "./knnClassifier";
import { tensor1d } from "@energetic-ai/core";

export type ClassifierExample = [string, string];

type ClassifierExampleEmbedding = [number[], string];
type ClassifierResult = {
  label: string;
  classIndex: number;
  confidences: { [label: string]: number };
};

class Classifier {
  model: EmbeddingsModel;
  knn: KNNClassifier;

  constructor(examples: ClassifierExampleEmbedding[], model: EmbeddingsModel) {
    this.model = model;
    this.knn = new KNNClassifier();
    for (let [embedding, label] of examples) {
      this.knn.addExample(tensor1d(embedding), label);
    }
  }

  async classify(inputs: string): Promise<ClassifierResult>;

  async classify(inputs: string[]): Promise<ClassifierResult[]>;

  async classify(
    inputs: string | string[]
  ): Promise<ClassifierResult | ClassifierResult[]> {
    const wrappedInputs = typeof inputs === "string" ? [inputs] : inputs;
    const embeddings = await this.model.embed(wrappedInputs);
    const results = await Promise.all(
      embeddings.map((embedding) => this.knn.predictClass(tensor1d(embedding)))
    );

    if (typeof inputs === "string") {
      return results[0];
    }
    return results;
  }
}

export async function initClassifier(
  examples: ClassifierExample[],
  modelSource: EmbeddingsModelSource = remoteModelSource
): Promise<Classifier> {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(examples.map((d) => d[0]));
  const examplesWithEmbeddings = examples.map(
    (d, i) => [embeddings[i], d[1]] as ClassifierExampleEmbedding
  );
  return new Classifier(examplesWithEmbeddings, model);
}
