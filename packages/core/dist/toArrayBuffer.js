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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArrayBuffer = void 0;
/**
 * Convert a Buffer or an Array of Buffers to an ArrayBuffer.
 *
 * If the input is an Array of Buffers, they will be concatenated in the
 * specified order to form the output ArrayBuffer.
 */
function toArrayBuffer(buf) {
    if (Array.isArray(buf)) {
        // An Array of Buffers.
        var totalLength = 0;
        for (var _i = 0, buf_1 = buf; _i < buf_1.length; _i++) {
            var buffer = buf_1[_i];
            totalLength += buffer.length;
        }
        var ab = new ArrayBuffer(totalLength);
        var view = new Uint8Array(ab);
        var pos = 0;
        for (var _a = 0, buf_2 = buf; _a < buf_2.length; _a++) {
            var buffer = buf_2[_a];
            pos += buffer.copy(view, pos);
        }
        return ab;
    }
    else {
        // A single Buffer. Return a copy of the underlying ArrayBuffer slice.
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
}
exports.toArrayBuffer = toArrayBuffer;
