import { EmbeddingsModelSource, EmbeddingsModel } from "@energetic-ai/embeddings";
import { KNNClassifier } from "./knnClassifier";
export type ClassifierExample = [string, string];
type ClassifierExampleEmbedding = [number[], string];
type ClassifierResult = {
    label: string;
    classIndex: number;
    confidences: {
        [label: string]: number;
    };
};
declare class Classifier {
    model: EmbeddingsModel;
    knn: KNNClassifier;
    constructor(examples: ClassifierExampleEmbedding[], model: EmbeddingsModel);
    classify(inputs: string): Promise<ClassifierResult>;
    classify(inputs: string[]): Promise<ClassifierResult[]>;
}
export declare function initClassifier(examples: ClassifierExample[], modelSource?: EmbeddingsModelSource): Promise<Classifier>;
export {};
