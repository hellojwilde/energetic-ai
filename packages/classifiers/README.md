<p align="center">
  <img src="https://raw.githubusercontent.com/realworldprivacy/energetic-ai/main/logo.png" alt="EnergeticAI" width="369" height="84">
</p>

<p align="center">Fast, easy-to-use AI few-shot text classification, optimized for serverless functions.</p>

# EnergeticAI Classifiers

EnergeticAI Classifiers is a library for few-shot text classification, which is the task of classifying text into a set of categories, given only a few examples of each category.

There's no complicated training pipelines to maintain. Just provide a few examples of each category, and you're good to go.

It's great for assessing sentiment, categorizing support tickets, and more.

## Install

Install this package, along with `@energetic-ai/core`, and any model weights (e.g. `@energetic-ai/model-embeddings-en`):

```bash
npm install @energetic-ai/core @energetic-ai/classifiers @energetic-ai/model-embeddings-en
```

## Usage

You can easily call this method to create a classifier, and use it to predict categories for new text:

```js
import { initClassifier } from "@energetic-ai/classifiers";
import { modelSource } from "@energetic-ai/model-embeddings-en";

(async () => {
  // Initialize with training examples
  const classifier = await initClassifier(
    [
      ["The world is happy", "Positive"],
      ["Work is so fun", "Positive"],
      ["I had a great day", "Positive"],
      ["I had a bad day", "Negative"],
      ["I am frustrated", "Negative"],
      ["I am depressed", "Negative"],
    ],
    modelSource
  );

  // Classify a single string
  const single = await classifier.classify("The weather is so nice today");
  // { "label": "Positive" ... }

  // Classify multiple strings in a batch
  const multiple = await classifier.classify([
    "What is this? I am so angry!",
    "I am so excited!",
  ]);
  // [{ "label": "Negative" ... }, { "label": "Positive" ... }]
})();
```

## Examples

See the [examples](../../examples) directory for examples.

## Development

This repository uses [Lerna](https://lerna.js.org/) to manage packages, and [Vitest](https://vitest.dev/) to run tests.

Run tests with this method:

```bash
npm run test
```

## License

[Apache 2.0](LICENSE), except for dependencies.

## Acknowledgements

This project is derived from [TensorFlow.js](https://github.com/tensorflow/tfjs) and the [KNN Classifier library](https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier), which are also Apache 2.0 licensed.
