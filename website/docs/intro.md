# Introduction

EnergeticAI makes it easy to run AI models in [serverless functions](key-concepts/serverless.md).

It's a distribution of TensorFlow.js optimized for serverless functions:

- **Small module size** (~3 MB vs. 146 MB - 513 MB for stock TensorFlow.js)
- **Fast cold-start inference** (~50 ms vs. 2000+ ms for stock TensorFlow.js)
- **Incredible ease-of-use** (pre-trained models for common cases)

It's intended to be a condensed replacement for TensorFlow.js, so you can use it with much existing code and models.

## Getting Started

EnergeticAI is available on NPM.

Install the **core package**, along with any **model libraries** you want to use (e.g. embeddings):

```bash
npm install @energetic-ai/core @energetic-ai/embeddings @energetic-ai/model-embeddings-en
```

Here's an example of using the embeddings model:

```js
import { initModel, distance } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
(async () => {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(["hello", "world"]);
  console.log(distance(embeddings[0], embeddings[1])));
})();
```

Once you've given that a spin, head over to our [tutorial](tutorial.md) for an in-depth example of using embeddings to power product recommendations.

## Models

Currently EnergeticAI supports one pre-trained model out of the box:

- [Embeddings](models/embeddings.md)

We're excited to add more soon!

## Design principles

When designing EnergeticAI, we're guided by the following principles:

- **Serverless first**. We optimize for [serverless functions](key-concepts/serverless.md), as that's the most constrained environment. If it works there, it'll work anywhere.
- **Minimal configuration**. We focus on having a small API surface area that's easy to use with minimal configuration options. For example, we exclusively accelerate through WebAssembly, as that's fast enough and widely available.
- **Support incremental adoption**. The EnergeticAI core module is a drop-in replacement for `@tensorflow/tfjs-core`, so you can use it with existing code and models. And the APIs are designed to mimic familiar embeddings and classification libraries, so you can use it with minimal changes to your code.

## Comparison with other tools

### Tensorflow.js

TensorFlow.js is a fantastic open-source library, but not well optimized for the contraints of [serverless functions](key-concepts/serverless.md):

- **Module size**. Serverless functions have tight limits around module size, and TensorFlow.js is a large library on its own (146 MB - 513 MB uncompressed) and frequently not deployable in serverless environments at all without careful attention to packaging.
- **Cold start**. Packages like the Universal Sentence Encoder for TensorFlow.js assume you'll able to download the model weights on first use. This adds unacceptable latency to cold starts, which are critical to minimize for serverless functions.
- **Warm start**. TensorFlow.js by default uses a CPU backend that's pretty slow. There's alternate backends, but it requires further configuration.

EnergeticAI is an optimized distribution of TensorFlow.js that solves for these problems.

### OpenAI

OpenAI's APIs provide a fantastic proprietary set of AI models. They're easy to use in serverless functions, and the models are more powerful than EnergeticAI's, but come with privacy risk (as you'll have OpenAI as a data processor), cost money, and add vendor lock-in.

### Cohere

Cohere's APIs are similarly fantastic proprietary AI models that are easy to use in serverlesss functions. At time of writing Cohere adds [extra review steps](https://docs.cohere.com/docs/usage-guidelines) required to go to production, and comes with similar privacy, billing, and vendor lock-in risks as OpenAI.

## Staying informed

- [GitHub](https://github.com/realworldprivacy/energetic-ai)
- [Blog](/blog)
- [Real World Privacy](https://realworldprivacy.com/subscribe)

## Something missing?

If something is missing, please [open an issue](https://github.com/realworldprivacy/energetic-ai/issues/new) or send a [pull request](https://github.com/realworldprivacy/energetic-ai/pulls). We're excited to work with you to get it added!
