"use client";
import React, { useState } from "react";
import { Product } from "@/payload-types";
import { Media } from "@/payload-types";
import Image from "next/image";
import AddToCartButton from "./addToCartButton";
import IncrementorButton from "./incrementorButton";
import Carousel from "../../components/Carousel";

type productProps = {
  product: Product;
  className?: string;
  cap?: number;
};

export default function ProductsDisplay(props: productProps) {
  const priceInDollars = Number(props.product.price ?? 0) / 100;
  const formattedPrice = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: props.product.currency ?? "NZD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInDollars);
  const quantityCap = props.cap ? props.cap : 50;
  const isMedia = (image: string | Media): image is Media =>
    typeof image === "object" && image !== null && "url" in image;
  const [amount, setAmount] = useState(1);

  const galleryImages: Array<string | Media> = [];

  if (props.product.image) {
    galleryImages.push(props.product.image);
  }

  if (props.product.additionalImage) {
    galleryImages.push(...props.product.additionalImage);
  }

  const renderImage = (
    image: string | Media,
    index: number,
    isCarousel = false,
  ) => {
    if (typeof image === "string") {
      return (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={`${props.product.name} ${index + 1}`}
          width={isCarousel ? 1600 : 1560}
          height={isCarousel ? 1600 : 1560}
          className={
            isCarousel
              ? "w-full h-auto object-cover rounded-md"
              : "w-full h-full md:my-auto object-cover rounded-md"
          }
        />
      );
    }

    return (
      <Image
        key={image.id ?? `${image.url}-${index}`}
        src={image.url ?? ""}
        alt={image.alt ?? `${props.product.name} ${index + 1}`}
        width={isCarousel ? 1600 : 1560}
        height={isCarousel ? 1600 : 1560}
        className={
          isCarousel
            ? "w-full h-auto object-cover rounded-md"
            : "w-full h-full md:my-auto object-cover rounded-md"
        }
      />
    );
  };

  return (
    <div
      className={`group flex flex-col md:grid md:grid-cols-2 md:max-w-full mx-auto w-full items-center justify-center ${props.className}`}
    >
      {/*TOP PART*/}
      {/*picture BOX*/}
      <div className="hidden md:block m-[5%] h-screen ml-[10%] mr-[1.5%] my-[5%]">
        {galleryImages.length > 0 ? (
          <div className="max-h-full rounded-md items-center justify-center overflow-y-auto snap-y snap-mandatory scrollbar-none">
            {galleryImages.map((image, index) => (
              <div
                key={`${index}-${typeof image === "string" ? image : image.url}`}
                className="snap-start mb-[5%]"
              >
                {renderImage(image, index)}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-[90%] h-full mx-auto bg-[#1F1F1F] rounded-md items-center justify-center">
            <p className="m-[5%]">No Image(s).</p>
          </div>
        )}
      </div>
      <div className="block md:hidden h-100 w-[90%] mx-auto my-[5%] rounded-md items-center justify-center">
        {galleryImages.length > 0 ? (
          <Carousel
            items={galleryImages.map((image, index) =>
              renderImage(image, index, true),
            )}
            className="max-h-screen my-auto rounded-md items-center justify-center"
          />
        ) : (
          <div className="flex w-full h-full mx-auto py-[40%] rounded-md items-center justify-center">
            <p className="m-[5%]">No Image(s).</p>
          </div>
        )}
      </div>
      {/*writing BOX - text fixed at center as there is no long descriptions/text implemented*/}
      <div className="flex flex-col w-[90%] h-full m-[5%] p-[5%] md:w-[88%] md:h-[90%] md:mr-[10%] md:ml-[1.5%] md:my-[5%] md:p-[3%] bg-black border-white border items-center justify-center overflow-y-auto">
        <p className="w-full font-mono text-3xl md:text-5xl text-center">
          {props.product.name}
        </p>
        <p className="w-full font-mono text-2xl md:text-4xl text-center mt-[3%] mb-[7.5%]">
          {formattedPrice}
        </p>
        <div className="w-full flex flex-col mt-[7%] items-center justify-center">
          <IncrementorButton
            amount={amount}
            setCounter={setAmount}
            numCap={quantityCap}
            className="m-[1.5%]"
          ></IncrementorButton>
          <AddToCartButton
            productId={props.product.id}
            amount={amount}
            className="w-[90%] mt-[10%] hover:scale-105 hover:shadow-md hover:shadow-white"
          />
        </div>
      </div>

      {/*DESCRIPTION PART*/}
      <div className="relative h-65 w-full md:w-[200%] mx-auto my-[5%] py-[5%] bg-[#F2B423]/15 overflow-y-auto">
        <p className="font-mono text-3xl md:text-5xl text-center my-[3%]">
          DESCRIPTION
        </p>
        <p className="font-mono mx-[5%]">{props.product.description}</p>
      </div>
    </div>
  );
}
