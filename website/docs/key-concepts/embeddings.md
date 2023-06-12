# Embeddings

Embeddings are a key tool used to implement recommendations, classification, search, and more.

## What are embeddings?

Text embeddings are a way to represent the meaning of text as a vector (i.e. an array of floating point numbers).

Text with similar meaning will have similar vectors, which allows you to compare the similarity of text by determining the distance between vectors.

```js
import { initModel, distance } from "@energetic-ai/embeddings";

(async () => {
  const model = await initModel();
  const [healthy, delicious, embeddings] = await model.embed([
    // Three sentences and one is unlike the rest
    "Fruit is healthy",
    "Fruit is delicious",
    "Embeddings are a powerful machine learning tool",
  ]);

  console.log(distance(healthy, delicious)); // 0.89 (high similarity)
  console.log(distance(healthy, embeddings)); // 0.24 (low similarity)
})();
```

## What can I do with embeddings?

Text embeddings are a powerful tool that can be used for a variety of tasks, including:

- **Recommendations**: Find similar products, movies, or music, by fetching the embeddings for each item and comparing them to embeddings of other products. Check out our tutorial on [building a product recommender](/docs/tutorial) for an example.
- **Semantic Search**: Find similar documents, images, or videos, by fetching the embeddings for each item and comparing them to the embeddings of the user's query.
- **Classification**: Classify text as spam, hate speech, or other categories, by fetching the embeddings for examples in each category and comparing them to the embeddings of the text. This is also known as "few-shot classification".
- **Clustering**: Group similar documents, images, or videos, by fetching the embeddings for each item and clustering them based on their similarity.
- **...and more!** Text embeddings are a powerful tool that can be used for many other tasks.
