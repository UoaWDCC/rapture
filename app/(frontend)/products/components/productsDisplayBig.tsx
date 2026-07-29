import { Product } from "@/payload-types";
import Image from "next/image";

type productProps = {
  product: Product;
  className?: string;
}

export default async function ProductsDisplay(props: productProps) {
  const formattedPrice = props.product.price / 100

  console.log("product image:", props.product.image)

  return (
    <div className={`group flex flex-row mx-auto w-full ${props.className}`}>
      <div className="w-[40%] ml-[10%] mr-[2.5%] my-[5%] items-center justify-center">
        {props.product.image && typeof props.product.image !== "string" ? (
          <Image src={props.product.image.url ?? ""} alt={props.product.image.alt ?? props.product.name} width={1560} height={1560} className="w-full h-fit object-cover rounded-md" />
        ) : (
          <div className="flex w-full h-full bg-[#1F1F1F] rounded-md items-center justify-center">
            <p className="m-[5%]">No Image.</p>
          </div>
        )}
      </div>
      <div className="w-[40%] mr-[10%] ml-[2.5%] my-[5%] p-[3%] bg-black border-white border">
        <p className="font-bold text-xl">{props.product.name}</p>
        <p className="text-lg">{formattedPrice} {props.product.currency}</p>
        <p>{props.product.description}</p>
      </div>
    </div>
  );
}
