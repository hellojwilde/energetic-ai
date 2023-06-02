import type { ProductShort } from "~/utils/products.server";

export function ProductCard(props: { product: ProductShort }) {
  const { product } = props;
  return (
    <div className="col p-2">
      <a href={`/products/${product.id}`} className="text-decoration-none">
        <div className="card h-100 d-flex">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top"
            />
          </div>
          <div className="card-body flex-shrink-1">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-subtitle text-body-secondary">
              {product.category} &middot; $
              {parseFloat(product.price).toFixed(2)}
            </h6>
          </div>
        </div>
      </a>
    </div>
  );
}
