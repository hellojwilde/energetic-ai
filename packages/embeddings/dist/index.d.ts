import type { GraphModel } from "@energetic-ai/core";
import { Tokenizer, Vocabulary } from "./tokenizer";
export type EmbeddingsModelData = {
    vocabulary: Vocabulary;
    model: GraphModel;
};
export type EmbeddingsModelSource = () => Promise<EmbeddingsModelData>;
declare class EmbeddingsModel {
    tokenizer: Tokenizer;
    model: GraphModel;
    constructor(data: EmbeddingsModelData);
    embed(inputs: string[] | string): Promise<number[][]>;
}
export declare const remoteModelSource: EmbeddingsModelSource;
export declare function initModel(source?: EmbeddingsModelSource): Promise<EmbeddingsModel>;
export {};
