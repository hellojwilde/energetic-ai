import { initModel } from "@energetic-ai/embeddings";
import { modelSource } from "@energetic-ai/model-embeddings-en";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function main() {
  const response = await fetch("https://fakestoreapi.com/products");
  const rawProducts = await response.json();

  const model = await initModel(modelSource);
  const embeddings = await model.embed(
    rawProducts.map(
      ({ title, category, description }) => `${category} \n ${title}`
    )
  );

  const products = {};
  for (let i = 0; i < rawProducts.length; i++) {
    const { id } = rawProducts[i];
    products[id] = {
      ...rawProducts[i],
      id: String(id),
      embedding: embeddings[i],
    };
  }

  await fs.writeFile(
    path.join(__dirname, "..", "data", "products.json"),
    JSON.stringify(products)
  );
})();
