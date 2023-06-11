# Classifiers

Here's how to use EnergeticAI's few-shot classifier library to categorize text, given only a few examples of each category.

## About the model

EnergeticAI Classifiers is a wrapper around the [EnergeticAI Embeddings](embeddings.md) library. It uses the [Universal Sentence Encoder](https://arxiv.org/abs/1803.11175) from Google to convert text into a 512-dimensional vector, and then uses a simple nearest-neighbor search to find the closest training example.

There's no complicated training process. You just need to provide a few examples of each category, and the model will do the rest.

## Creating a classifier

You can install the classifiers package using npm:

```bash
npm install --save @energetic-ai/core @energetic-ai/classifiers
```

With the classifiers package, you supply a list of training examples to `initClassifier()`.

Each example is a pair of a string and a label. The label can be any string, but it's best to keep it short and simple. You'll need at least 3 examples for each label to work reliably.

Once you have a classifier, you can use it to classify a single string, or a batch of strings. If you pass a single string, you'll get a single classification back. If you pass an array of strings, you'll get an array of classifications back.

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

## Improving cold-start performance

The first time you call `initClassifier()`, it will download model weights for the [embeddings](embeddings.md) package from the internet. This can take a few seconds, but you can speed it up by installing the English language model weights:

```bash
npm install --save @energetic-ai/model-embeddings-en
```

Then, you can pass the model weights directly into `initClassifier()`:

```js
import { initClassifier } from "@energetic-ai/classifiers";
import { modelSource } from "@energetic-ai/model-embeddings-en";

(async () => {
  const classifier = await initClassifier(
    [
      /* ...examples... */
    ],
    modelSource
  );
  // ... snip ...
})();
```

## Improving accuracy

### More examples

If you have a lot of training data to work with, the classifier will be unwieldy to initialize, particularly in serverless functions. There's a few ways you can address this:

- **Use a vector database to find nearest neighbors**: If you have a lot of training data, you can use the [embeddings](embeddings.md) library directly, and store the embeddings in a vector database. Then, you can fetch the nearest neighbors from the database when you need to classify a string.
- **Use a model**: If you have a lot of training data, you can train a model (e.g. a random forest or SVM model) to classify embeddings. This will be more accurate than the few-shot approach described here, but it will come with much higher complexity.

### Better examples

The classifier works best when you have fairly diverse examples for each category from your dataset. If you have a lot of examples that are very similar within a category, the classifier may no capture all of the nuance of that label.

For example, if you have a lot of examples of "positive" text that are all about the weather, the classifier may not be able to classify "positive" text about other topics.

## Limitations

### English-only

The model is currently English-only. Please chime in on [the GitHub issue](https://github.com/realworldprivacy/energetic-ai/issues/1) if you'd like to see support for one of the pre-trained multilingual models.

### Handling longer text

This classification model performs best on sentences and short paragraphs. See the ideas around this in the [embeddings](embeddings.md) guide.
