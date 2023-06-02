# Embeddings

Embeddings are a key AI tool used to implement recommendations, classification, search, and more.

## What are embeddings?

Text embeddings are a way to represent text as a vector of numbers. Text with similar meaning will have similar vectors, which allows you to compare text using formulas such as [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).

```js
const [healthy, delicious, embeddings] = await model.embed([
  // Three sentences and one is unlike the rest
  "Fruit is healthy",
  "Fruit is delicious",
  "Embeddings are a powerful machine learning tool",
]);

console.log(cosineSimilarity(healthy, delicious)); // 0.89 (high similarity)
console.log(cosineSimilarity(healthy, embeddings)); // 0.24 (low similarity)
```

## How are embeddings used?

Text embeddings are a powerful tool that can be used for a variety of tasks, including:

- **Recommendations**: Find similar products, movies, or music, by fetching the embeddings for each item and comparing them to the embeddings of the user's preferences.
- **Search**: Find similar documents, images, or videos, by fetching the embeddings for each item and comparing them to the embeddings of the user's query.
- **Classification**: Classify text as spam, hate speech, or other categories, by fetching the embeddings for examples in each category and comparing them to the embeddings of the text. This is also known as "zero-shot classification".
- **Clustering**: Group similar documents, images, or videos, by fetching the embeddings for each item and clustering them based on their similarity.
- **...and more!** Text embeddings are a powerful tool that can be used for many other tasks.

## How do you create embeddings?

You can create text embeddings using EnergeticAI's bundled model, which is based on the [Universal Sentence Encoder](https://arxiv.org/abs/1803.11175) from Google.

You can embed one sentence at a time, or a collection of sentences:

```js
import { initModel } from "@energetic-ai/embeddings";

(async () => {
  const model = await initModel();
  const [healthy, delicious, embeddings] = await model.embed([
    // Three sentences and one is unlike the rest
    "Fruit is healthy",
    "Fruit is delicious",
    "Embeddings are a powerful machine learning tool",
  ]);
})();
```

It performs best on sentences and short paragraphs. If you have longer text, you can consider:

- **Splitting the text**: If you have a long document, you can split it into sentences or paragraphs and embed each one separately.
- **Truncating the text**: If you have a long document, you can truncate it to a specific section that represents the meaning well (e.g. an abstract section).
- **Averaging the embeddings**: If you have a long document, you can embed each sentence or paragraph separately, then [average the embeddings together](https://www.reddit.com/r/LanguageTechnology/comments/st1si5/averaging_sentence_embeddings_to_create/) to find the collective meaning.

The right approach will depend on your application.

## How do you compare embeddings?

It's easy to implement cosine similarity with the TensorFlow primitives bundled with EnergeticAI. This will perform well for small numbers of comparisons (e.g. <10k), but will be slow for large numbers of comparisons.

```js
import { tensor1d, dot, norm, div, mul } from "@energetic-ai/core";

function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  const tensor1 = tensor1d(embedding1);
  const tensor2 = tensor1d(embedding2);
  return div(
    dot(tensor1, tensor2),
    mul(norm(tensor1), norm(tensor2))
  ).arraySync() as number;
}
```

## How do you store embeddings?

If you're trying to make comparisons with millions of items or more, it's worth considering a vector database such as Postgres, Redis, or Milvus, which can perform these comparisons efficiently:

- **Postgres**: You can store and index vectors in Postgres using the [pgvector](https://github.com/pgvector/pgvector) extension. A number of managed Postgres providers including [Supabase](https://supabase.com/), [Neon](https://neon.tech/), and [Fly.io](https://fly.io/docs/postgres/) support this extension. Some of the managed Postgres offerings from larger cloud providers also support `pgvector` as well, including [Amazon's RDS](https://aws.amazon.com/about-aws/whats-new/2023/05/amazon-rds-postgresql-pgvector-ml-model-integration/).
- **Redis**: You can store an index vectors in Redis using the [RediSearch](https://redis.io/docs/stack/search/reference/vectors/) module.
- **SQLite**: You can store and index vectors in SQLite using the [sqlite-vss](https://github.com/asg017/sqlite-vss) extension.
- **Milvus**: If you need something more powerful, the dedicated open-source vector database [Milvus](https://milvus.io/) supports text embeddings out of the box, and comes with a managed cloud offering.
- **Pinecone**: The proprietary database [Pinecone](https://www.pinecone.io/) is a managed vector database that supports text embeddings out of the box.
