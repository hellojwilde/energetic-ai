import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

// Boilerplate so we can use these in our script, which is an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function main() {
  // Fetch the list of products from the Fake Store API
  const response = await fetch("https://fakestoreapi.com/products");
  const rawProducts = await response.json();

  // Initialize our model and embed each product. We're using the fields
  // category, title, and description which represent the type of product well,
  // and excluding fields like price which are irrelevant.
  const model = await initModel(modelSource);
  const embeddings = await model.embed(
    rawProducts.map(
      ({ title, category, description }) =>
        `${category} \n ${title} \n ${description}`
    )
  );

  // Add the embeddings into the product data
  const products = {};
  for (let i = 0; i < rawProducts.length; i++) {
    const { id } = rawProducts[i];
    products[id] = {
      ...rawProducts[i],
      id: String(id),
      embedding: embeddings[i],
    };
  }

  // Write all to file
  await fs.writeFile(
    path.join(__dirname, "..", "data", "products.json"),
    JSON.stringify(products)
  );
})();
