import { describe, bench } from "vitest";
import { LoremIpsum } from "lorem-ipsum";
import * as e from "@energetic-ai/core";
import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const text = lorem.generateSentences(5);

describe("cold start", () => {
  bench("EnergeticAI (default)", async () => {
    const model = await initModel();
    await model.embed(text);
  });

  bench("EnergeticAI (optimized)", async () => {
    const model = await initModel(modelSource);
    await model.embed(text);
  });

  bench("Universal Sentence Encoder (default)", async () => {
    await tf.setBackend("cpu");
    const model = await use.load();
    const tensor = await model.embed(text);
    await tensor.array();
  });

  bench("Universal Sentence Encoder (optimized)", async () => {
    await tf.setBackend("tensorflow");
    const model = await use.load();
    const tensor = await model.embed(text);
    await tensor.array();
  });
});

describe("warm start", async () => {
  const energeticModel = await initModel(modelSource);
  const model = await use.load();

  bench("EnergeticAI (default)", async () => {
    await e.setBackend("wasm");
    await energeticModel.embed(text);
  });

  bench("EnergeticAI (optimized)", async () => {
    await e.setBackend("wasm");
    await energeticModel.embed(text);
  });

  bench("Universal Sentence Encoder (default)", async () => {
    await tf.setBackend("cpu");
    const tensor = await model.embed(text);
    await tensor.array();
  });

  bench("Universal Sentence Encoder (optimized)", async () => {
    await tf.setBackend("tensorflow");
    const tensor = await model.embed(text);
    await tensor.array();
  });
});
