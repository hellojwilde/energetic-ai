<p align="center">
  <img src="https://raw.githubusercontent.com/realworldprivacy/energetic-ai/main/logo.png" alt="EnergeticAI" width="369" height="84">
</p>

<p align="center">Fast, easy-to-use AI sentence embeddings, optimized for serverless functions.</p>

# EnergeticAI Embeddings

EnergeticAI Embeddings is a library for computing sentence embeddings, which are vector representations of sentences that capture their meaning.

Sentence embeddings can be used for semantic search, recommendations, clustering, and more.

It leverages the Universal Sentence Encoder model from Google Research, which is trained on a variety of data sources and outputs 512-dimensional embeddings.

## Install

Install this package, along with `@energetic-ai/core` and model weights (e.g. `@energetic-ai/model-embeddings-en`):

```bash
npm install @energetic-ai/core @energetic-ai/embeddings @energetic-ai/model-embeddings-en
```

## Usage

You can easily call this method to compute embeddings for a list of sentences, and compare distances:

```js
import { initModel, distance } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
(async () => {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(["hello", "world"]);
  console.log(distance(embeddings[0], embeddings[1])));
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

This project is derived from [TensorFlow.js](https://github.com/tensorflow/tfjs) and the [Universal Sentence Encoder model library](https://github.com/tensorflow/tfjs-models), which are also Apache 2.0 licensed.
