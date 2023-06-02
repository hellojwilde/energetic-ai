import type { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductCard } from "~/components/productCard";
import { getProduct, getSimilarProducts } from "~/utils/products.server";
import type { ProductShort } from "~/utils/products.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const product = getProduct(id);
  const similarProducts = getSimilarProducts(id);

  return json({ product, similarProducts });
};

export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: `${data.product.title} | My Store` }];
};

export default function ProductDetail() {
  const { product, similarProducts } = useLoaderData();

  return (
    <main className="py-5">
      <section className="container">
        <div className="row gx-5">
          <div className="col">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col">
            <h2>{product.title}</h2>
            <h6>
              {product.category} &middot; $
              {parseFloat(product.price).toFixed(2)}
            </h6>
            <p>{product.description}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 bg-body-tertiary">
        <div className="container py-4">
          <h2>Similar Products</h2>
          <div className="row row-cols-4 gx-3 mt-3">
            {similarProducts.map((product: ProductShort) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
