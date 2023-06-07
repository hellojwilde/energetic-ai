# `@energetic-ai/example-benchmarks`

Benchmarks for EnergeticAI, comparing it to TensorFlow.js in various configurations.

# Included Benchmarks

- **Cold Start**. How long does it take to load a model and compute embeddings on 5 sentences of Lorem Ipsum?
- **Warm Start**. How long does it take to compute embeddings on 5 sentences of Lorem Ipsum after the model has already been loaded?

# Tested Frameworks

- EnergeticAI
- EnergeticAI (with `@energetic-ai/model-embeddings-en`)
- TensorFlow.js (node backend)
- TensorFlow.js (cpu backend)

# Running the Benchmarks

```bash
npm install
npm run bench
```
