import { Product } from "@/payload-types";

export default async function ProductsDisplay({
  product,
}: {
  product: Product;
}) {
  const formattedPrice = product.price / 100

  return (
    <div className="m-20">
      {product.image && typeof product.image !== "string" ? (
        <img src={product.image.url ?? ""} alt={product.image.alt ?? product.name} className="w-80 h-80 object-cover mb-3" />
      ) : (
      <div className="w-80 h-80 bg-gray-100 mb-3"></div>
      )}
      <p className="font-bold text-xl">{product.name}</p>
      <p className="text-lg">{formattedPrice} {product.currency}</p>
      <p>{product.description}</p>
    </div>
  );
}
