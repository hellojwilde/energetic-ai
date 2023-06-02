# 📦 core

The core EnergeticAI library, installed as a peer dependency of other EnergeticAI libraries.

## Install

```bash
npm install --save @energetic-ai/core
```

## Exports

| Export                                                | Description                                                                                                                          |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `io`                                                  | An object containing various I/O functions and utilities, from a combination of `@tensorflow/tfjs-core` and `@tensorflow/tfjs-node`. |
| `io.fileSystem`                                       | The `fileSystem` function from the `@tensorflow/tfjs-node` module.                                                                   |
| `io.copyModel`                                        | The `copyModel` function from the `@tensorflow/tfjs-core` module.                                                                    |
| `io.listModels`                                       | The `listModels` function from the `@tensorflow/tfjs-core` module.                                                                   |
| `io.moveModel`                                        | The `moveModel` function from the `@tensorflow/tfjs-core` module.                                                                    |
| `io.removeModel`                                      | The `removeModel` function from the `@tensorflow/tfjs-core` module.                                                                  |
| `io.browserFiles`                                     | The `browserFiles` function from the `@tensorflow/tfjs-core` module.                                                                 |
| `io.browserHTTPRequest`                               | The `browserHTTPRequest` function from the `@tensorflow/tfjs-core` module.                                                           |
| `io.concatenateArrayBuffers`                          | The `concatenateArrayBuffers` function from the `@tensorflow/tfjs-core` module.                                                      |
| `io.decodeWeights`                                    | The `decodeWeights` function from the `@tensorflow/tfjs-core` module.                                                                |
| `io.encodeWeights`                                    | The `encodeWeights` function from the `@tensorflow/tfjs-core` module.                                                                |
| `io.fromMemory`                                       | The `fromMemory` function from the `@tensorflow/tfjs-core` module.                                                                   |
| `io.fromMemorySync`                                   | The `fromMemorySync` function from the `@tensorflow/tfjs-core` module.                                                               |
| `io.getLoadHandlers`                                  | The `getLoadHandlers` function from the `@tensorflow/tfjs-core` module.                                                              |
| `io.getModelArtifactsForJSON`                         | The `getModelArtifactsForJSON` function from the `@tensorflow/tfjs-core` module.                                                     |
| `io.getModelArtifactsForJSONSync`                     | The `getModelArtifactsForJSONSync` function from the `@tensorflow/tfjs-core` module.                                                 |
| `io.getModelArtifactsInfoForJSON`                     | The `getModelArtifactsInfoForJSON` function from the `@tensorflow/tfjs-core` module.                                                 |
| `io.getSaveHandlers`                                  | The `getSaveHandlers` function from the `@tensorflow/tfjs-core` module.                                                              |
| `io.getWeightSpecs`                                   | The `getWeightSpecs` function from the `@tensorflow/tfjs-core` module.                                                               |
| `io.http`                                             | The `http` function from the `@tensorflow/tfjs-core` module.                                                                         |
| `io.isHTTPScheme`                                     | The `isHTTPScheme` function from the `@tensorflow/tfjs-core` module.                                                                 |
| `io.loadWeights`                                      | The `loadWeights` function from the `@tensorflow/tfjs-core` module.                                                                  |
| `io.registerLoadRouter`                               | The `registerLoadRouter` function from the `@tensorflow/tfjs-core` module.                                                           |
| `io.registerSaveRouter`                               | The `registerSaveRouter` function from the `@tensorflow/tfjs-core` module.                                                           |
| `io.weightsLoaderFactory`                             | The `weightsLoaderFactory` function from the `@tensorflow/tfjs-core` module.                                                         |
| `io.withSaveHandler`                                  | The`withSaveHandler`function from the`@tensorflow/tfjs-core`module.                                                                  |
| `io.withSaveHandlerSync`                              | The`withSaveHandlerSync`function from the`@tensorflow/tfjs-core`module.                                                              |
| `version`                                             | An object containing version information for different TensorFlow.js modules.                                                        |
| `version["tfjs-core"]`                                | The version of the`tfjs-core`module.                                                                                                 |
| `version["tfjs-backend-wasm"]`                        | The version of the`tfjs-backend-wasm`module.                                                                                         |
| `version["tfjs-converter"]`                           | The version of the`tfjs-converter`module.                                                                                            |
| All exports from`@tensorflow/tfjs-core`module         | All exports from the`@tensorflow/tfjs-core`module.                                                                                   |
| All exports from`@tensorflow/tfjs-converter`module    | All exports from the`@tensorflow/tfjs-converter`module.                                                                              |
| All exports from`@tensorflow/tfjs-backend-wasm`module | All exports from the`@tensorflow/tfjs-backend-wasm` module.                                                                          |
