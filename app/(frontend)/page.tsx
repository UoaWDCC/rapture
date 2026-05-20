import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import OrderCollectionDisplay from "./order/orderCollectionDisplay";
import Link from "next/link";

import { NewsSection } from "./components/NewsSection";
import { PromotedGameSection } from "./components/PromotedGameSection";
import Navbar from "@/app/(frontend)/components/navbar.tsx"; // navbar testing
import Carousel from "@/app/(frontend)/components/Carousel.tsx"; // carousel testing
import Disc from "./components/Disc";

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const itemsC = [
    {
      id: 1,
      image: "/images/ivlnaud5zro61.png",
      heading: "Aw Heck",
      text: "Just Some Text",
    },
    {
      id: 2,
      image: "/images/ivlnaud5zro61.png",
      heading: "Page 2",
      text: "Just Some Text2",
    },
  ]; //carousel testing

  const order = await payload.find({
    collection: "order",
    where: user
      ? {
          user: {
            equals: user.id,
          },
        }
      : { id: { equals: "nobody" } }, //placeholder for no user id found
  });

  return (
    <div className="w-full flex-col items-center -mt-50">
      <div className="w-full min-h-screen flex flex-col flex-wrap items-center justify-center gap-5 relative overflow-hidden">
       
        <div className="absolute top-0 left-0 w-full">
        <Image
          src="/images/FRONT_PAGE.png"
          alt=""
          width={1437}
          height={500}
          className="w-full object-cover opacity-60"
        />
      </div>
       
       <picture>
          <source srcSet="/Rapture_Large_2500-1000.png" />
          <Image
            className="mt-20"
            alt="Payload Logo"
            height={2500}
            src="/Rapture_Large_2500-1000.png"
            width={1000}
          />
        </picture>

        {!user && (
          <h1 className="text-3xl font-bold">Welcome to Studio Rapture.</h1>
        )}
        {user && (
          <h1 className="text-3xl font-bold">Welcome back, {user.email}</h1>
        )}
        </div>

        <PromotedGameSection />

        <NewsSection />
       
      <div className="relative w-full overflow-hidden">

</div>
      
    </div>
  );
}
