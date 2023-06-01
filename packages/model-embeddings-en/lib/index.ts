import type { EmbeddingsModelSource } from "@energetic-ai/embeddings";
import { loadGraphModel } from "@energetic-ai/core";
import { readFile } from "fs/promises";

export const modelSource: EmbeddingsModelSource = async () => {
  const [model, vocabulary] = await Promise.all([
    loadGraphModel(`file://${__dirname}/model.json`),
    readFile(`${__dirname}/vocab.json`, "utf-8").then((d) => JSON.parse(d)),
  ]);
  return { model, vocabulary };
};
