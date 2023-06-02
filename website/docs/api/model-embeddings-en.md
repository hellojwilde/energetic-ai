# 📦 model-embeddings-en

Contains English language model weights for the `@energetic-ai/embeddings` package.

Installing these locally will speed up cold start time from ~2s to ~20ms at the cost of module size. If you don't, the model weights will be downloaded when `initModel()` is called in `@energetic-ai/embeddings`.

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

## Exports

| Export        | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `modelSource` | An `EmbeddingsModelSource` that loads the packaged embeddings weights from disk. |
