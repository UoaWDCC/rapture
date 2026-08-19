import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import OrderCollectionDisplay from "./order/orderCollectionDisplay";
import Link from "next/link";

import { HomeHeroSection } from "./components/homeHeroSection";
import { JoinNowSection } from "./components/joinNowSection";
import { NewsSection } from "./components/newsSection";
import { PromotedGameSection } from "./components/promotedGameSection";
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

  const latestNews = await payload.find({
    collection: "News",
    sort: "-createdAt",
    limit: 1,
  });

  return (
    <div
      className="w-full flex-col items-center -mt-50 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/images/home-background.png')" }}
    >
      <div className="pt-40">
        <HomeHeroSection />
      </div>

      <JoinNowSection />

      <PromotedGameSection />

      <NewsSection latestNews={latestNews.docs[0] ?? null} />

      <div className="relative w-full overflow-hidden"></div>
    </div>
  );
}
