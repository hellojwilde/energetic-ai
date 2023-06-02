# 📦 embeddings

An optimized library for querying sentence embeddings based on the [Universal Sentence Encoder](https://arxiv.org/pdf/1803.11175.pdf). Each embedding is returned as a 512-dimensional array, and you can query multiple sentences at once.

## Install

```bash
npm install @energetic-ai/embeddings
```

## Usage

If you don't supply a specific model source, `initModel` will implicitly use `remoteModelSource` to download the model weights from [TFHub](https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1) on first use, which can take ~2 seconds.

```js
import { initModel } from "@energetic-ai/embeddings";
(async () => {
  const model = await initModel();
  const embeddings = await model.embed(["hello", "world"]);
  console.log(embeddings);
})();
```

You can also download the model weights locally by installing the `@energetic-ai/model-embeddings-en` package, and reduce cold start inference to ~20 ms at the cost of module size.

```js
import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
(async () => {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(["hello"]);
  console.log(embeddings[0]);
})();
```

## Exports

| Export                                                                                 | Description                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Tokenizer`                                                                            | A class that represents a tokenizer used for encoding input strings into sequences of numbers based on a provided vocabulary.                                                                                                                                                        |
| `Vocabulary`                                                                           | An array of tuples representing a collection of words or tokens along with their corresponding numeric indices. It is used by the `Tokenizer` class for encoding purposes.                                                                                                           |
| `EmbeddingsModelData`                                                                  | A type representing data for an embeddings model, both vocabulary and model weights.                                                                                                                                                                                                 |
| `EmbeddingsModelSource`                                                                | A type representing a function that returns a promise of `EmbeddingsModelData`.                                                                                                                                                                                                      |
| `EmbeddingsModel`                                                                      | A class representing an embeddings model, with a tokenizer and a graph model.                                                                                                                                                                                                        |
| `EmbeddingsModel.embed(inputs: string[])` or `EmbeddingsModel.embed(inputs: string[])` | A method of the `EmbeddingsModel` class that returns embeddings for each of the input strings, as 512-dimensional vectors. Regardless of the input format, the return value is always an array of arrays.                                                                            |
| `remoteModelSource`                                                                    | A constant representing an `EmbeddingsModelSource` that downloads the model weights from [TFHub](https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1).                                                                                               |
| `initModel(source?: EmbeddingsModelSource)`                                            | A function that initializes an embeddings model with an optional model source. If no model source is passed, `remoteModelSource` is used, which will download weights from [TFHub](https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1) when called. |
