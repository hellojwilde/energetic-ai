import type { GraphModel } from "@energetic-ai/core";
import { Tokenizer, Vocabulary } from "./tokenizer";
export type EmbeddingsModelData = {
    vocabulary: Vocabulary;
    model: GraphModel;
};
export type EmbeddingsModelSource = () => Promise<EmbeddingsModelData>;
export declare class EmbeddingsModel {
    tokenizer: Tokenizer;
    model: GraphModel;
    constructor(data: EmbeddingsModelData);
    embed(input: string): Promise<number[]>;
    embed(input: string[]): Promise<number[][]>;
}
export declare function distance(embedding1: number[], embedding2: number[]): number;
export declare const remoteModelSource: EmbeddingsModelSource;
export declare function initModel(source?: EmbeddingsModelSource): Promise<EmbeddingsModel>;
