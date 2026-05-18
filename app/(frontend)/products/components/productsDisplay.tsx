import { Product } from "@/payload-types";
import Image from "next/image";

export default async function ProductsDisplay({
  product,
}: {
  product: Product;
}) {
  const formattedPrice = product.price / 100

  console.log("product image:", product.image)

  return (
    <div className="m-20">
      {product.image && typeof product.image !== "string" ? (
        <Image src={product.image.url ?? ""} alt={product.image.alt ?? product.name} width ={56} height = {56} className="w-80 h-80 object-cover mb-3" />
      ) : (
      <div className="w-80 h-80 bg-gray-100 mb-3"></div>
      )}
      <p className="font-bold text-xl">{product.name}</p>
      <p className="text-lg">{formattedPrice} {product.currency}</p>
      <p>{product.description}</p>
    </div>
  );
}
