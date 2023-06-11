import { test } from "vitest";
import { initClassifier } from "../dist/index";

test("classify sentence sentiment", async ({ expect }) => {
  const classifier = await initClassifier([
    ["The world is happy", "Positive"],
    ["Work is so fun", "Positive"],
    ["I had a great day", "Positive"],
    ["I had a bad day", "Negative"],
    ["I am frustrated", "Negative"],
    ["I am depressed", "Negative"],
  ]);

  const single = await classifier.classify("The weather is so nice today");
  expect(single.label).eq("Positive");

  const multiple = await classifier.classify([
    "What is this? I am so angry!",
    "I am so excited!",
  ]);
  expect(Array.isArray(multiple)).eq(true);
  expect(multiple[0].label).eq("Negative");
  expect(multiple[1].label).eq("Positive");
});
