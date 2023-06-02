# Serverless

EnergeticAI is optimized for serverless functions. Here's the why and how.

## What are serverless functions?

Serverless functions are functions that are run on-demand, and are billed by the millisecond. They are often used to handle HTTP requests, but can also be used for other purposes.

They can be economical, and are one of the easiest ways to get free hosting, but come with extra constraints around code size and runtime. For example, here are code size limitations for some of the most popular serverless providers:

| Provider               | Code Size Limit                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Vercel                 | [50 MB compressed, 250 MB uncompressed](https://vercel.com/docs/concepts/limits/overview)                        |
| Netlify                | [50 MB compressed](https://docs.netlify.com/functions/overview/#deployed-function-size)                          |
| AWS Lambda             | [50 MB compressed, 250 MB uncompressed](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) |
| Google Cloud Functions | [100 MB compressed, 500 MB uncompressed](https://cloud.google.com/functions/quotas)                              |

There are ways to increase the limits, such as on AWS Lambda, which has Lambda Layers, but these come with extra complexity and are not available on all providers.

## Why can't TensorFlow run in serverless functions?

TensorFlow.js is a large library on its own (146 MB - 513 MB uncompressed) and frequently not deployable in serverless environments at all. If you can deploy it, pre-trained models are built with the assumption that you likely want to download model weights on the first invocation. This might be acceptable in a containerized environment, but is not acceptable in a serverless environment where you're billed by the millisecond.

## How does EnergeticAI make it easier?

EnergeticAI is a distribution of TensorFlow.js optimized for serverless functions:

- **small module size** (~3 MB vs. 146 MB - 513 MB for stock TensorFlow.js)
- **fast cold-start inference** (~50 ms vs. 2000+ ms for stock TensorFlow.js)
- **incredible ease-of-use** (pre-trained models for common cases)

We did this by restructuring the core TensorFlow.js is bundled to significantly reduce size while retaining functionality and TypeScript type definitions. Model libraries that are built on the core like `@energetic-ai/embeddings` don't require unnecessary dependencies. Model weights are offered as packages that can be bundled with your serverless function without an additional fetch.
