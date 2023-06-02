import { test } from "vitest";
import { initModel, distance } from "../dist/index";

test("compute embedding for text", async ({ expect }) => {
  const model = await initModel();

  const embeddings = await model.embed("hello world");

  expect(embeddings.length).eq(512);
  expect(embeddings).toMatchSnapshot();
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

test(
  "test distnace function",
  async ({ expect }) => {
    const model = await initModel();
    const [healthy, delicious, embeddings] = await model.embed([
      "Fruit is healthy",
      "Fruit is delicious",
      "Embeddings are a powerful machine learning tool",
    ]);

    expect(distance(healthy, delicious)).closeTo(0.89, 0.01);
    expect(distance(healthy, embeddings)).closeTo(0.24, 0.01);
  },
  { timeout: 100000 }
);
