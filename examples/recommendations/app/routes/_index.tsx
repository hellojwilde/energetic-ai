import type { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllProducts } from "../utils/products.server";
import { ProductCard } from "~/components/productCard";

export const loader: LoaderFunction = async () => {
  return json({ products: getAllProducts() });
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "My Store" }];
};

export default function Index() {
  const { products } = useLoaderData();

  return (
    <main className="container py-5">
      <h2>Top Products</h2>
      <div className="row row-cols-4">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
