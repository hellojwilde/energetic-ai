import { setBackend, io as coreIo } from "@tensorflow/tfjs-core";
import { nodeFileSystemRouter, fileSystem } from "./fileSystem";

import { version_core } from "@tensorflow/tfjs-core";
import { version_converter } from "@tensorflow/tfjs-converter";
import { version_wasm } from "@tensorflow/tfjs-backend-wasm";

setBackend("wasm");
coreIo.registerLoadRouter(nodeFileSystemRouter);
coreIo.registerSaveRouter(nodeFileSystemRouter);

export const io = {
  ...coreIo,
  fileSystem,
};

export const version = {
  "tfjs-core": version_core,
  "tfjs-backend-wasm": version_wasm,
  "tfjs-converter": version_converter,
};

export * from "@tensorflow/tfjs-core";
export * from "@tensorflow/tfjs-converter";
export * from "@tensorflow/tfjs-backend-wasm";
