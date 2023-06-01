import { test } from "vitest";
import { initModel } from "../dist/index";

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
