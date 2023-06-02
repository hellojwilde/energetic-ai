# Embeddings

Here's how to use EnergeticAI's pre-trained embeddings model.

:::tip

Need an introduction to embeddings? Check out [this overview](../key-concepts/embeddings.md).

:::

## About the model

EnergeticAI uses the lightweight, English-only version of the [Universal Sentence Encoder](https://arxiv.org/abs/1803.11175) from Google. This model is trained on a variety of data sources, and is designed to be a general-purpose model that can be used for a variety of tasks.

Given a sentence or short paragraph in English, the model will return a **512-dimensional vector** that represents the meaning of the text.

## Getting started

You can install the embeddings package using npm:

```bash
npm install --save @energetic-ai/core @energetic-ai/embeddings
```

Then you can compute embeddings for a single string or multiple strings at once. If you pass in an array of strings, you'll get an array of embeddings back. If you pass a single string, you'll get a single embedding back.

```js
import { initModel } from "@energetic-ai/embeddings";

(async () => {
  const model = await initModel();

  // You can also embed a single string
  const embedding = await model.embed(
    "Embeddings are a powerful machine learning tool"
  );

  // Embed multiple strings at once
  const [healthy, delicious] = await model.embed([
    "Fruit is healthy",
    "Fruit is delicious",
  ]);
})();
```

## Improving cold-start performance

The first time you call `initModel()`, it will download the model weights from the internet. This can take a few seconds, but you can speed it up by installing the English language model weights:

```bash
npm install --save @energetic-ai/model-embeddings-en
```

Then, you can pass the model weights directly into `initModel()`:

```js
import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";

(async () => {
  const model = await initModel(modelSource);
  // ... snip ...
})();
```

## Comparing embeddings

As we alluded to above, there's a convenient `distance()` function that computes the cosine similarity between two embeddings. The result is a number between 0 and 1, where 0 means the embeddings are completely different, and 1 means the embeddings are identical.

```js
import { initModel, distance } from "@energetic-ai/embeddings";

(async () => {
  const model = await initModel();
  const [healthy, delicious, embeddings] = await model.embed([
    "Fruit is healthy",
    "Fruit is delicious",
    "Embeddings are a powerful machine learning tool",
  ]);

  console.log(distance(healthy, delicious)); // 0.89 (high similarity)
  console.log(distance(healthy, embeddings)); // 0.24 (low similarity)
})();
```

If you're building something simple, it's worth starting with this function before you try to build something more complex (e.g. using a vector database). It's pretty fast, and it's often good enough.

## Storing embeddings

If you're trying to make comparisons with millions of items or more, it's worth considering a vector database such as Postgres, Redis, or Milvus, which can perform these comparisons efficiently.

### Open-source vector databases

General purpose databases with vector support:

- **Postgres**: You can store and index vectors in Postgres using the [pgvector](https://github.com/pgvector/pgvector) extension. A number of managed Postgres providers including [Supabase](https://supabase.com/), [Neon](https://neon.tech/), and [Fly.io](https://fly.io/docs/postgres/) support this extension. Some of the managed Postgres offerings from larger cloud providers also support `pgvector` as well, including [Amazon's RDS](https://aws.amazon.com/about-aws/whats-new/2023/05/amazon-rds-postgresql-pgvector-ml-model-integration/).
- **Redis**: You can store an index vectors in Redis using the [RediSearch](https://redis.io/docs/stack/search/reference/vectors/) module.
- **SQLite**: You can store and index vectors in SQLite using the [sqlite-vss](https://github.com/asg017/sqlite-vss) extension, which leverages Meta's [Faiss](https://faiss.ai/) library under the hood.

Dedicated vector databases:

- **Chroma**: The open-source vector database called [Chroma](https://github.com/chroma-core/chroma) is designed for AI use-cases and has an official JavaScript client.
- **Milvus**: The dedicated open-source vector database [Milvus](https://milvus.io/) comes with a managed cloud offering and has an official JavaScript client.
- **Weaviate**: The open-source vector database [Weaviate](https://weaviate.io/) has an official TypeScript client.

### Proprietary vector databases

- **Pinecone**: The proprietary database [Pinecone](https://www.pinecone.io/) is a managed vector database that supports text embeddings out of the box, and has official JavaScript bindings.

## Limitations

### English-only

The model is currently English-only. Please chime in on [the GitHub issue](https://github.com/realworldprivacy/energetic-ai/issues/1) if you'd like to see support for one of the pre-trained multilingual models.

### Handling longer text

This embedding model performs best on sentences and short paragraphs. If you have longer text, consider:

- **Splitting the text**: If you have a long document, you can split it into sentences or paragraphs and embed each one separately.
- **Truncating the text**: If you have a long document, you can truncate it to a specific section that represents the meaning well (e.g. an abstract section).
- **Averaging the embeddings**: If you have a long document, you can embed each sentence or paragraph separately, then [average the embeddings together](https://www.reddit.com/r/LanguageTechnology/comments/st1si5/averaging_sentence_embeddings_to_create/) to find the collective meaning.
