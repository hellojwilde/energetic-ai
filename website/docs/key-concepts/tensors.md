# Tensors

Tensors are the main data structure of TensorFlow.js, which EnergeticAI is based on.

## What are tensors?

They're a generalization of scalars, vectors and matrices to potentially higher dimensions. They have different **ranks** representing the number of dimensions that they have, and different **shapes** representing the size of each dimension.

TensorFlow.js provides a number of different tensor types:

- **Scalar**: A tensor with rank 0, representing a single value.
- **Tensor1D**: A tensor with rank 1, representing a vector of values.
- **Tensor2D**: A tensor with rank 2, representing a matrix of values.
- **Tensor3D**: A tensor with rank 3, representing a cube of values.
- **and so on...**

Tensorflow also provides a handy guide about tensors [here](https://www.tensorflow.org/guide/tensor).

## How do I create tensors?

You can create tensors using the appropriate typed function, which takes values as input and returns a tensor as output:

```js
import { scalar, tensor1d, tensor2d, tensor3d } from "@energetic-ai/core";

const scalarTensor = scalar(1);
const tensor1DTensor = tensor1d([1, 2, 3]);
const tensor2DTensor = tensor2d([
  [1, 2],
  [3, 4],
]);
const tensor3DTensor = tensor3d([
  [[1], [2]],
  [[3], [4]],
]);
```

## What operations can you perform on them?

You can perform a wide variety of operations on tensors, including:

- **Arithmetic operations**: Addition, subtraction, multiplication, division, and more.
- **Matrix operations**: Matrix multiplication, dot product, and more.
- **Reduction operations**: Sum, mean, min, max, and more.
- **Convolution operations**: Convolution, pooling, and more.

See the [TensorFlow.js API docs](https://js.tensorflow.org/api/latest/) for a full list of operations.

## What if I just want an array or a number?

If you've performed a set of operations on a Tensor and you want to get the result as a number or an array, you can use the `array()` or `arraySync()` methods:

```js
import { tensor1d, dot, norm, div, mul } from "@energetic-ai/core";

function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  const tensor1 = tensor1d(embedding1);
  const tensor2 = tensor1d(embedding2);
  return div(
    dot(tensor1, tensor2),
    mul(norm(tensor1), norm(tensor2))
  ).arraySync() as number;
}
```

If a Tensor is rank 0, you can use `arraySync()` to get the value as a number. If a Tensor is rank 1 or above, you can use `arraySync()` to get the value as an array, potentially nested.
