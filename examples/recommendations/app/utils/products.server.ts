import data from "../../data/products.json";
import { distance } from "@energetic-ai/embeddings";

export type ProductShort = {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
};

export type Product = ProductShort & {
  description: string;
  embedding: number[];
};

export function getAllProducts(): ProductShort[] {
  const products = [];
  for (const key of Object.keys(data)) {
    const { id, title, category, price, image } = (data as any)[key];
    products.push({ id, title, category, price, image });
  }
  return products;
}

export function getProduct(id: string): Product {
  return (data as any)[id];
}

export function getSimilarProducts(id: string): ProductShort[] {
  const { embedding } = getProduct(id);

  const distances = [];
  for (const otherId of Object.keys(data)) {
    if (otherId == id) continue;
    const { embedding: otherEmbedding } = (data as any)[otherId];
    const dist = distance(embedding, otherEmbedding);
    if (dist < 0.5) continue;
    distances.push({
      id: otherId,
      distance: dist,
    });
  }
  distances.sort((a, b) => b.distance - a.distance);

  const products = [];
  for (let { id } of distances.slice(0, 4)) {
    const { title, category, price, image } = (data as any)[id];
    products.push({ id, title, category, price, image });
  }
  return products;
}
