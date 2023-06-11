/**
 * @license
 * Copyright 2023 Real World Privacy LLC. All Rights Reserved.
 * Copyright 2019 Google LLC. All Rights Reserved.
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
import { Tensor2D } from "@energetic-ai/core";
export declare function concatWithNulls(ndarray1: Tensor2D, ndarray2: Tensor2D): Tensor2D;
export declare function topK(values: Float32Array, k: number): {
    values: Float32Array;
    indices: Int32Array;
};
