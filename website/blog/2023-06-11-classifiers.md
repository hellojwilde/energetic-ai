---
slug: classifiers
title: "EnergeticAI Classifiers"
authors: hellojwilde
tags: [documentation, blog, energetic-ai]
---

We're introducing [EnergeticAI Classifiers](/docs/guides/classifiers), a new library for few-shot text classification.

## What is few-shot text classification?

Few-shot text classification is the task of classifying text into a set of categories, given only a few examples of each category.

For example, you might want to classify support tickets into categories like "Billing", "Technical", and "Other". You could provide a few examples of each category, and then use the model to classify new tickets. Over time, you can adjust the categories, and the model will adapt without retraining.

This differs from traditional text classification, where you need hundreds or thousands of examples, and retrain the model every time you want to add a new category.

## How do I use EnergeticAI Classifiers?

You can use EnergeticAI Classifiers in just a few lines of code.

First, install the library from npm:

```bash
npm install @energetic-ai/core @energetic-ai/classifiers
```

Then, you can create a model and use it to classify text:

```js
import { initClassifier } from "@energetic-ai/classifiers";

(async () => {
  // Initialize with training examples
  const classifier = await initClassifier([
    ["The world is happy", "Positive"],
    ["Work is so fun", "Positive"],
    ["I had a great day", "Positive"],
    ["I had a bad day", "Negative"],
    ["I am frustrated", "Negative"],
    ["I am depressed", "Negative"],
  ]);

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

Each label result contains confidence values, which you can use to filter out low-confidence labels if you want.

## How does it work?

EnergeticAI Classifiers builds on top of the [Embeddings](/docs/guides/embeddings) to convert embeddings for the examples of each category. During classification, it uses a [KNN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) lookup to find the buckets with the closest embeddings, and then returns the most common label from those buckets.

# Acknowledgements

This project is standing on the shoulder of giants, derived from the KNN Classifier in [TensorFlow.js KNN Classifier](https://github.com/tensorflow/tfjs-models/tree/master/knn-classifier) library.

## Get involved

We'd love to have you involved in the project! Here's some ways you can help:

- **Try it out**. We'd love to hear your feedback on the project. If you have any questions or comments, please [open an issue](https://github.com/realworldprivacy/energetic-ai/issues).
- **Spread the word**. Please [star the project](https://github.com/realworldprivacy/energetic-ai) on GitHub and share it with your friends and colleagues!
- **Contribute**. We'd love to have you contribute to the project. If you're interested in contributing, please [open an issue](https://github.com/realworldprivacy/energetic-ai/issues) and we'll help you get started.
