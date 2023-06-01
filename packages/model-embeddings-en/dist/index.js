var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  modelSource: () => modelSource
});
module.exports = __toCommonJS(lib_exports);
var import_core = require("@energetic-ai/core");
var import_promises = require("fs/promises");
var modelSource = async () => {
  const [model, vocabulary] = await Promise.all([
    (0, import_core.loadGraphModel)(`file://${__dirname}/model.json`),
    (0, import_promises.readFile)(`${__dirname}/vocab.json`, "utf-8").then((d) => JSON.parse(d))
  ]);
  return { model, vocabulary };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  modelSource
});
