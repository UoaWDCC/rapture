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
    <div className={`flex flex-row w-full group ${props.className}`}>
        <div className="w-full h-full">
          {props.product.image && typeof props.product.image !== "string" ? (
            <Image src={props.product.image.url ?? ""} alt={props.product.image.alt ?? props.product.name} width={1560} height={1560} className="w-full h-full object-cover mb-3 rounded-md" />
          ) : (
            <div className="w-full h-full bg-[#1F1F1F] mb-3 rounded-md"></div>
          )}
        </div>
        <div className="inline-block max-w-full ml-[-100%] pr-[10%] p-3 bg-black rounded-l-md transition ease-in-out duration-500 opacity-0 group-hover:opacity-70">
          <div className=" hover:underline hover:cursor-pointer hover:text-bold">
            <a href="/">
              <p className="font-bold text-[150%] p-[5%]">{props.product.name}</p>
              <p className="text-[80%] px-[5%]">{formattedPrice} {props.product.currency}</p>
              <p className="hidden md:text-[70%] md:px-[5%] md:block">{props.product.description}</p>
              <p className="block text-[70%] px-[5%] hover:text-shadow-white hover:text-shadow-xs md:hidden">READ MORE ▶</p>
            </a>
          </div>
        </div>
    </div>
  );
}
