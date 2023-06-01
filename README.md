<p align="center">

  <img src="https://raw.githubusercontent.com/realworldprivacy/energetic-ai/main/logo.png" alt="EnergeticAI" width="246" height="56">
</p>

<p align="center">Run open-source AI in serverless functions, up to 67x faster.</p>

# EnergeticAI

EnergeticAI is a distribution of TensorFlow.js optimized for serverless functions:

- **small module size** (~3 MB vs. 146 MB - 513 MB for stock TensorFlow.js)
- **fast cold-start inference** (~50 ms vs. 2000+ ms for stock TensorFlow.js)
- **incredible ease-of-use** (pre-trained models for common cases)

It's intended to be a condensed replacement for TensorFlow.js, so you can use it with much existing code and models.

## Install

EnergeticAI is available on NPM.

It's broken down into packages to minimize bundle size. You'll need to install the **core package**, along with any **model libraries** you want to use (e.g. embeddings):

```bash
npm install @energeticai/core @energeticai/embeddings
```

Optionally, you can install the **model weights**. If you don't, the model weights will be downloaded on first inference.

```bash
npm install @energetic-ai/model-embeddings-en
```

You can see a full list of packages below.

## Usage

```js
import { initModel } from "@energetic-ai/embeddings";
(async () => {
  const model = await initModel();
  const embeddings = await model.embed(["hello", "world"]);
  console.log(embeddings);
})();
```

## Packages

This repository contains the following packages:

- **@energetic-ai/core**: the core EnergeticAI library
- **@energetic-ai/embeddings**: embeddings model library
- **@energetic-ai/model-embeddings-en**: English embeddings model weights

## Examples

See the [examples](examples) directory for examples.

## Development

This repository uses [Lerna](https://lerna.js.org/) to manage packages, and [Vitest](https://vitest.dev/) to run tests.

## License

[Apache 2.0](LICENSE)

EnergeticAI is derived from TensorFlow and models on TFHub, which are also Apache 2.0 licensed.
