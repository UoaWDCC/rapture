"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Product } from "@/payload-types";
import Image from "next/image";
import AddToCartButton from "./addToCartButton";
import IncrementorButton from "./incrementorButton";

type productProps = {
  product: Product;
  className?: string;
}

export default function ProductsDisplay(props: productProps) {
  const formattedPrice = props.product.price / 100

  console.log("product image:", props.product.image)

  return (
    <div className={`group flex flex-col md:grid md:grid-cols-2 md:max-w-full mx-auto w-full items-center justify-center ${props.className}`}>
      {/*TOP PART*/}
        {/*picture BOX*/}
      <div className="max-w-full h-screen m-[5%] md:h-screen md:ml-[10%] md:mr-[1.5%] md:my-[5%] items-center justify-center overflow-y-auto snap-y snap-mandatory scrollbar-none">
        {props.product.additionalImage?.map((image, index) => typeof image !== "string" ? (
          <div className="snap-start mb-[5%]"> <Image src={image.url ?? ""} alt={image.alt ?? `${props.product.name} ${index+ 1}`} width={1560} height={1560} className="w-full h-full md:my-auto object-cover rounded-md" /> </div>
        ) : (
          <div className="flex w-full h-full py-[40%] bg-[#1F1F1F] rounded-md items-center justify-center">
            <p className="m-[5%]">No Image.</p>
          </div>
        ))}
      </div>
        {/*writing BOX*/}
      <div className="w-[90%] h-full m-[5%] md:w-[88%] md:h-[90%] md:mr-[10%] md:ml-[1.5%] md:my-[5%] md:p-[3%] bg-black border-white border overflow-y-auto">
        <p className="font-mono text-3xl md:text-5xl text-center mt-[10%]">{props.product.name}</p>
        <p className="font-mono text-2xl md:text-4xl text-center mt-[3%] mb-[7.5%]">{formattedPrice} {props.product.currency}</p>
        <div className="flex flex-col mt-[7%] items-center justify-center">
          <IncrementorButton className="m-[1.5%]"></IncrementorButton>
          <AddToCartButton productId={props.product.id} className="w-full mt-[10%] hover:scale-105 hover:shadow-md hover:shadow-white"/>
        </div>
      </div>
    
      {/*DESCRIPTION PART*/}
      <div className="relative h-65 w-screen mx-auto my-[5%] py-[5%] bg-[#F2B423]/15 overflow-y-auto">
        <p className="font-mono text-3xl md:text-5xl text-center my-[3%]">DESCRIPTION</p>
        <p className="font-mono mx-[5%]">{props.product.description}</p>
      </div>
    </div>
  );
}
