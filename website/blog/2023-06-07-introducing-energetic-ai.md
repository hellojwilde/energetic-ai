---
slug: introducing-energetic-ai
title: Introducing EnergeticAI
authors: hellojwilde
tags: [documentation, blog, energetic-ai]
---

We're excited to introduce [EnergeticAI](/), a Node.js library that makes it easy to build apps with open-source AI models.

The norm in the AI space is to send massive amounts of data to prioprietary foundation model providers. This is creates significant risk to any company doing this:

- **Privacy & security**. You're sending data to a third party, making the foundation model provider a single point of failure for your business, and creating a privacy risk for your customers.
- **Financial**. Your product unit economics depend on the foundation model provider's rates and they can change their pricing at any time.
- **Vendor lock-in**. You're building your business on top of the foundation model provider's platform idiosyncracies, and it's not always easy to switch to another provider if you need to in a hurry.

Ideally, you'd able to `npm install` an AI model and use it to build your app.

There's a few existing open-source AI models that you can find on NPM, but they're frequently packaged in ways that make them large and slow in [serverless functions](key-concepts/serverless.md), require a surprising amount of configuration to get working, or not have appropriate licensing for commercial use.

## Enter, EnergeticAI

EnergeticAI solves this, with a distribution of [TensorFlow.js](https://www.tensorflow.org/js) optimized for [serverless functions](/key-concepts/serverless.md):

- **Small module size** (~3 MB vs. 146 MB - 513 MB for stock TensorFlow.js)
- **Fast cold-start inference** (~50 ms vs. 2000+ ms for stock TensorFlow.js)
- **Incredible ease-of-use** (pre-trained models for common cases)

It's intended to be a condensed replacement for TensorFlow.js, so you can use it with much existing code and models, and it's licensed as [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) for commercial use. Dependencies may have different licenses, though on principle we leverage models with permissive licenses.

We're starting with a single pre-trained model, [embeddings](/guides/embeddings.md), and plan to add more soon.

We have a comprehensive [tutorial](/tutorial.md) to show how to use embeddings to power product recommendations for an e-commerce site:

[![Tutorial](/img/tutorial.png)](/tutorial.md)

## Getting started

EnergeticAI is as easy as `npm install`:

```bash
npm install @energetic-ai/core @energetic-ai/embeddings @energetic-ai/model-embeddings-en
```

Then, you can import the model library and use it:

```js
import { initModel, distance } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";

(async () => {
  const model = await initModel(modelSource);
  const embeddings = await model.embed(["hello", "world"]);
  console.log(distance(embeddings[0], embeddings[1])));
})();
```

## What's next

We're just getting started with EnergeticAI, and we have a lot of exciting things planned:

- **More libraries**. We're exploring libraries to make it easy to leverage the embeddings model for more use-cases, such as few-shot classification.
- **More models**. We're exploring importing more models, such as a multilingual embeddigns model, as well as models like [BERT](https://arxiv.org/abs/1810.04805) to enable use-cases like question-answering.
- **More integrations**. We're exploring more ready-to-use options, such as a library for semantic search that can be dropped into libraries such as Docasaurus.

## Acknowledgements

This project is standing on the shoulder of giants, derived from [TensorFlow.js](https://www.tensorflow.org/js), and leveraging [Universal Sentence Encoder](https://tfhub.dev/google/universal-sentence-encoder-lite/2) from [TensorFlow Hub](https://tfhub.dev/). This project would not have been possible without the foundational work of these projects.

## Get involved

We'd love to have you involved in the project! Here's some ways you can help:

- **Try it out**. We'd love to hear your feedback on the project. If you have any questions or comments, please [open an issue](https://github.com/realworldprivacy/energetic-ai/issues).
- **Contribute**. We'd love to have you contribute to the project. If you're interested in contributing, please [open an issue](https://github.com/realworldprivacy/energetic-ai/issues) and we'll help you get started.
- **Spread the word**. If you know anyone who might be interested in the project, please share it with them!
