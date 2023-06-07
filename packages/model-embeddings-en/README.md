<p align="center">
  <img src="https://raw.githubusercontent.com/realworldprivacy/energetic-ai/main/logo.png" alt="EnergeticAI" width="369" height="84">
</p>

<p align="center">Pre-trained English-language model weights for <code>@energetic-ai/embeddings</code>.</p>

# EnergeticAI Embedding Model Weights (English)

This package contains pre-trained English-language model weights for `@energetic-ai/embeddings`.

## Install

```bash
npm install @energetic-ai/model-embeddings-en
```

## Usage

To use this, simply import `modelSource` from this package and pass it to `initModel()` in `@energetic-ai/embeddings`:

```js
import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
(async () => {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(["hello", "world"]);
  console.log(embeddings);
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

This package is derived from the [Universal Sentence Encoder Lite model weights](https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1), which are also Apache 2.0 licensed.
