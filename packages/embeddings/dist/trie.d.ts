/**
 * @license
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
type OutputNode = [string[], number, number];
declare class TrieNode {
    parent: TrieNode | null;
    end: boolean;
    children: {
        [firstSymbol: string]: TrieNode;
    };
    word: OutputNode;
    constructor();
}
export declare class Trie {
    root: TrieNode;
    constructor();
    /**
     * Inserts a token into the trie.
     */
    insert(word: string, score: number, index: number): void;
    /**
     * Returns an array of all tokens starting with ss.
     *
     * @param ss The prefix to match on.
     */
    commonPrefixSearch(ss: string[]): OutputNode[];
}
export {};
