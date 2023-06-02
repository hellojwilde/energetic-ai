import { test } from "vitest";
import { initModel } from "../dist/index";
import { tensor1d, dot, norm, div, mul } from "@energetic-ai/core";

function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  const tensor1 = tensor1d(embedding1);
  const tensor2 = tensor1d(embedding2);
  return div(
    dot(tensor1, tensor2),
    mul(norm(tensor1), norm(tensor2))
  ).arraySync() as number;
}

test("compute embedding for text", async ({ expect }) => {
  const model = await initModel();

  const embeddings = await model.embed("hello world");

  expect(embeddings.length).eq(1);
  expect(embeddings[0].length).eq(512);
  expect(embeddings[0]).toMatchSnapshot();
});

test("compute embedding for array of text", async ({ expect }) => {
  const model = await initModel();
  const embeddings = await model.embed([
    "the fox jumped over the lazy dog",
    "lorem ipsum",
  ]);

  expect(embeddings.length).eq(2);
  expect(embeddings[0].length).eq(512);
  expect(embeddings[1].length).eq(512);
  expect(embeddings).toMatchSnapshot();
});

test.only(
  "example: embeddings similarity",
  async ({ expect }) => {
    const model = await initModel();
    const [healthy, delicious, embeddings] = await model.embed([
      "Fruit is healthy",
      "Fruit is delicious",
      "Embeddings are a powerful machine learning tool",
    ]);

    expect(cosineSimilarity(healthy, delicious)).closeTo(0.89, 0.01);
    expect(cosineSimilarity(healthy, embeddings)).closeTo(0.24, 0.01);
  },
  { timeout: 100000 }
);
