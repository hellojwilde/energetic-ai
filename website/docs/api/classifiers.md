# 📦 classifiers

A library for few-shot text classification, which is the task of classifying text into a set of categories, given only a few examples of each category.

## Install

```bash
npm install @energetic-ai/classifiers
```

## Usage

If you don't supply a specific model source, `initClassifier` will implicitly use `remoteModelSource` to download the model weights from [TFHub](https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1) on first use, which can take ~2 seconds.

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

You can also download the model weights locally by installing the `@energetic-ai/model-embeddings-en` package, and reduce cold start inference to ~20 ms at the cost of module size.

```js
import { initClassifier } from "@energetic-ai/classifiers";
import { modelSource } from "@energetic-ai/model-embeddings-en";
(async () => {
  const model = await initClassifier(
    [
      /* ...examples... */
    ],
    modelSource
  );
  // ... snip ...
})();
```

## Exports

Here's the table for the provided code:

| Export                          | Description                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ClassifierExample`             | A type representing an example for classification, consisting of two strings: input and label.                                        |
| `ClassifierExampleEmbedding`    | A type representing an example embedding for classification, consisting of an array of numbers (embedding) and a string (label).      |
| `ClassifierResult`              | A type representing the result of classification, containing the predicted label, class index, and confidence scores for each label.  |
| `Classifier`                    | A class representing a classifier, which uses an embeddings model and a KNN classifier for classification.                            |
| `Classifier.model`              | A property of the `Classifier` class representing the embeddings model used for classification.                                       |
| `Classifier.knn`                | A property of the `Classifier` class representing the KNN classifier used for classification.                                         |
| `Classifier.constructor`        | The constructor method of the `Classifier` class, used for initializing the classifier with examples and an embeddings model.         |
| `Classifier.classify(inputs)`   | A method of the `Classifier` class that classifies a single input string and returns a promise of `ClassifierResult`.                 |
| `Classifier.classify(inputs[])` | A method of the `Classifier` class that classifies an array of input strings and returns a promise of an array of `ClassifierResult`. |
| `initClassifier`                | A function that initializes a classifier with examples and an optional embeddings model source.                                       |
