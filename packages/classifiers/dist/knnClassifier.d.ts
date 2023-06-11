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
import { Tensor, Tensor2D } from "@energetic-ai/core";
/**
 * A K-nearest neighbors (KNN) classifier that allows fast
 * custom model training on top of any tensor input. Useful for transfer
 * learning with an embedding from another pretrained model.
 */
export declare class KNNClassifier {
    private trainDatasetMatrix;
    private classDatasetMatrices;
    private classExampleCount;
    private exampleShape;
    private labelToClassId;
    private nextClassId;
    /**
     * Adds the provided example to the specified class.
     */
    addExample(example: Tensor, label: number | string): void;
    /**
     * This method return distances between the input and all examples in the
     * dataset.
     *
     * @param input The input example.
     * @returns cosine similarities for each entry in the database.
     */
    private similarities;
    /**
     * Predicts the class of the provided input using KNN from the previously-
     * added inputs and their classes.
     *
     * @param input The input to predict the class for.
     * @returns A dict of the top class for the input and an array of confidence
     * values for all possible classes.
     */
    predictClass(input: Tensor, k?: number): Promise<{
        label: string;
        classIndex: number;
        confidences: {
            [label: string]: number;
        };
    }>;
    /**
     * Clears the saved examples from the specified class.
     */
    clearClass(label: number | string): void;
    clearAllClasses(): void;
    getClassExampleCount(): {
        [label: string]: number;
    };
    getClassifierDataset(): {
        [label: string]: Tensor2D;
    };
    getNumClasses(): number;
    setClassifierDataset(classDatasetMatrices: {
        [label: string]: Tensor2D;
    }): void;
    /**
     * Calculates the top class in knn prediction
     * @param topKIndices The indices of closest K values.
     * @param kVal The value of k for the k-nearest neighbors algorithm.
     */
    private calculateTopClass;
    /**
     * Clear the lazily-loaded train logits matrix due to a change in
     * training data.
     */
    private clearTrainDatasetMatrix;
    /**
     * Normalize the provided vector to unit length.
     */
    private normalizeVectorToUnitLength;
    private getNumExamples;
    dispose(): void;
}
