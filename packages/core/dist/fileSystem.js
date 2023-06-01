"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSystem = exports.nodeFileSystemRouter = exports.NodeFileSystem = void 0;
var tf = require("@tensorflow/tfjs-core");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var toArrayBuffer_1 = require("./toArrayBuffer");
function doesNotExistHandler(name) {
    return function (e) {
        switch (e.code) {
            case "ENOENT":
                throw new Error("".concat(name, " ").concat(e.path, " does not exist: loading failed"));
            default:
                throw e;
        }
    };
}
var NodeFileSystem = exports.NodeFileSystem = /** @class */ (function () {
    /**
     * Constructor of the NodeFileSystem IOHandler.
     * @param path A single path or an Array of paths.
     *   For saving: expects a single path pointing to an existing or nonexistent
     *     directory. If the directory does not exist, it will be
     *     created.
     *   For loading:
     *     - If the model has JSON topology (e.g., `tf.Model`), a single path
     *       pointing to the JSON file (usually named `model.json`) is expected.
     *       The JSON file is expected to contain `modelTopology` and/or
     *       `weightsManifest`. If `weightManifest` exists, the values of the
     *       weights will be loaded from relative paths (relative to the directory
     *       of `model.json`) as contained in `weightManifest`.
     *     - If the model has binary (protocol buffer GraphDef) topology,
     *       an Array of two paths is expected: the first path should point to the
     *       .pb file and the second path should point to the weight manifest
     *       JSON file.
     */
    function NodeFileSystem(path) {
        this.MODEL_JSON_FILENAME = "model.json";
        this.WEIGHTS_BINARY_FILENAME = "weights.bin";
        if (Array.isArray(path)) {
            tf.util.assert(path.length === 2, function () {
                return "file paths must have a length of 2, " +
                    "(actual length is ".concat(path.length, ").");
            });
            this.path = path.map(function (p) { return (0, path_1.resolve)(p); });
        }
        else {
            this.path = (0, path_1.resolve)(path);
        }
    }
    NodeFileSystem.prototype.save = function (modelArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var weightsBinPath, weightsManifest, modelJSON, modelJSONPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(this.path)) {
                            throw new Error("Cannot perform saving to multiple paths.");
                        }
                        return [4 /*yield*/, this.createOrVerifyDirectory()];
                    case 1:
                        _a.sent();
                        if (!(modelArtifacts.modelTopology instanceof ArrayBuffer)) return [3 /*break*/, 2];
                        throw new Error("NodeFileSystem.save() does not support saving model topology " +
                            "in binary format yet.");
                    case 2:
                        weightsBinPath = (0, path_1.join)(this.path, this.WEIGHTS_BINARY_FILENAME);
                        weightsManifest = [
                            {
                                paths: [this.WEIGHTS_BINARY_FILENAME],
                                weights: modelArtifacts.weightSpecs,
                            },
                        ];
                        modelJSON = {
                            modelTopology: modelArtifacts.modelTopology,
                            weightsManifest: weightsManifest,
                            format: modelArtifacts.format,
                            generatedBy: modelArtifacts.generatedBy,
                            convertedBy: modelArtifacts.convertedBy,
                        };
                        if (modelArtifacts.trainingConfig != null) {
                            modelJSON.trainingConfig = modelArtifacts.trainingConfig;
                        }
                        if (modelArtifacts.signature != null) {
                            modelJSON.signature = modelArtifacts.signature;
                        }
                        if (modelArtifacts.userDefinedMetadata != null) {
                            modelJSON.userDefinedMetadata = modelArtifacts.userDefinedMetadata;
                        }
                        modelJSONPath = (0, path_1.join)(this.path, this.MODEL_JSON_FILENAME);
                        return [4 /*yield*/, (0, promises_1.writeFile)(modelJSONPath, JSON.stringify(modelJSON), "utf8")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, promises_1.writeFile)(weightsBinPath, Buffer.from(modelArtifacts.weightData), "binary")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                // TODO(cais): Use explicit tf.io.ModelArtifactsInfo type below once it
                                // is available.
                                // tslint:disable-next-line:no-any
                                modelArtifactsInfo: tf.io.getModelArtifactsInfoForJSON(modelArtifacts),
                            }];
                }
            });
        });
    };
    NodeFileSystem.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.isArray(this.path)
                        ? this.loadBinaryModel()
                        : this.loadJSONModel()];
            });
        });
    };
    NodeFileSystem.prototype.loadBinaryModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topologyPath, weightManifestPath, topology, weightManifest, modelTopology, weightsManifest, _a, _b, modelArtifacts, weightSpecs, weightData;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        topologyPath = this.path[0];
                        weightManifestPath = this.path[1];
                        return [4 /*yield*/, (0, promises_1.stat)(topologyPath).catch(doesNotExistHandler("Topology Path"))];
                    case 1:
                        topology = _d.sent();
                        return [4 /*yield*/, (0, promises_1.stat)(weightManifestPath).catch(doesNotExistHandler("Weight Manifest Path"))];
                    case 2:
                        weightManifest = _d.sent();
                        // `this.path` can be either a directory or a file. If it is a file, assume
                        // it is model.json file.
                        if (!topology.isFile()) {
                            throw new Error("File specified for topology is not a file!");
                        }
                        if (!weightManifest.isFile()) {
                            throw new Error("File specified for the weight manifest is not a file!");
                        }
                        return [4 /*yield*/, (0, promises_1.readFile)(this.path[0])];
                    case 3:
                        modelTopology = _d.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, (0, promises_1.readFile)(this.path[1], "utf8")];
                    case 4:
                        weightsManifest = _b.apply(_a, [_d.sent()]);
                        modelArtifacts = {
                            modelTopology: modelTopology,
                        };
                        return [4 /*yield*/, this.loadWeights(weightsManifest, this.path[1])];
                    case 5:
                        weightSpecs = (_c = _d.sent(), _c[0]), weightData = _c[1];
                        modelArtifacts.weightSpecs = weightSpecs;
                        modelArtifacts.weightData = weightData;
                        return [2 /*return*/, modelArtifacts];
                }
            });
        });
    };
    NodeFileSystem.prototype.loadJSONModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, info, modelJSON, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        path = this.path;
                        return [4 /*yield*/, (0, promises_1.stat)(path).catch(doesNotExistHandler("Path"))];
                    case 1:
                        info = _c.sent();
                        if (!info.isFile()) return [3 /*break*/, 3];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, (0, promises_1.readFile)(path, "utf8")];
                    case 2:
                        modelJSON = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, tf.io.getModelArtifactsForJSON(modelJSON, function (weightsManifest) {
                                return _this.loadWeights(weightsManifest, path);
                            })];
                    case 3: throw new Error("The path to load from must be a file. Loading from a directory " +
                        "is not supported.");
                }
            });
        });
    };
    NodeFileSystem.prototype.loadWeights = function (weightsManifest, path) {
        return __awaiter(this, void 0, void 0, function () {
            var dirName, buffers, weightSpecs, _i, weightsManifest_1, group, _a, _b, path_2, weightFilePath, buffer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dirName = (0, path_1.dirname)(path);
                        buffers = [];
                        weightSpecs = [];
                        _i = 0, weightsManifest_1 = weightsManifest;
                        _c.label = 1;
                    case 1:
                        if (!(_i < weightsManifest_1.length)) return [3 /*break*/, 7];
                        group = weightsManifest_1[_i];
                        _a = 0, _b = group.paths;
                        _c.label = 2;
                    case 2:
                        if (!(_a < _b.length)) return [3 /*break*/, 5];
                        path_2 = _b[_a];
                        weightFilePath = (0, path_1.join)(dirName, path_2);
                        return [4 /*yield*/, (0, promises_1.readFile)(weightFilePath).catch(doesNotExistHandler("Weight file"))];
                    case 3:
                        buffer = _c.sent();
                        buffers.push(buffer);
                        _c.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        weightSpecs.push.apply(weightSpecs, group.weights);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, [weightSpecs, (0, toArrayBuffer_1.toArrayBuffer)(buffers)]];
                }
            });
        });
    };
    /**
     * For each item in `this.path`, creates a directory at the path or verify
     * that the path exists as a directory.
     */
    NodeFileSystem.prototype.createOrVerifyDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paths, _i, paths_1, path, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paths = Array.isArray(this.path) ? this.path : [this.path];
                        _i = 0, paths_1 = paths;
                        _a.label = 1;
                    case 1:
                        if (!(_i < paths_1.length)) return [3 /*break*/, 9];
                        path = paths_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 8]);
                        return [4 /*yield*/, (0, promises_1.mkdir)(path)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        e_1 = _a.sent();
                        if (!(e_1.code === "EEXIST")) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, promises_1.stat)(path)];
                    case 5:
                        if ((_a.sent()).isFile()) {
                            throw new Error("Path ".concat(path, " exists as a file. The path must be ") +
                                "nonexistent or point to a directory.");
                        }
                        return [3 /*break*/, 7];
                    case 6: throw e_1;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    NodeFileSystem.URL_SCHEME = "file://";
    return NodeFileSystem;
}());
var nodeFileSystemRouter = function (url) {
    if (Array.isArray(url)) {
        if (url.every(function (urlElement) {
            return urlElement.startsWith(NodeFileSystem.URL_SCHEME);
        })) {
            return new NodeFileSystem(url.map(function (urlElement) {
                return urlElement.slice(NodeFileSystem.URL_SCHEME.length);
            }));
        }
        else {
            return null;
        }
    }
    else {
        if (url.startsWith(NodeFileSystem.URL_SCHEME)) {
            return new NodeFileSystem(url.slice(NodeFileSystem.URL_SCHEME.length));
        }
        else {
            return null;
        }
    }
};
exports.nodeFileSystemRouter = nodeFileSystemRouter;
// Registration of `nodeFileSystemRouter` is done in index.ts.
/**
 * Factory function for Node.js native file system IO Handler.
 *
 * @param path A single path or an Array of paths.
 *   For saving: expects a single path pointing to an existing or nonexistent
 *     directory. If the directory does not exist, it will be
 *     created.
 *   For loading:
 *     - If the model has JSON topology (e.g., `tf.Model`), a single path
 *       pointing to the JSON file (usually named `model.json`) is expected.
 *       The JSON file is expected to contain `modelTopology` and/or
 *       `weightsManifest`. If `weightManifest` exists, the values of the
 *       weights will be loaded from relative paths (relative to the directory
 *       of `model.json`) as contained in `weightManifest`.
 *     - If the model has binary (protocol buffer GraphDef) topology,
 *       an Array of two paths is expected: the first path should point to the
 *        .pb file and the second path should point to the weight manifest
 *       JSON file.
 */
function fileSystem(path) {
    return new NodeFileSystem(path);
}
exports.fileSystem = fileSystem;
