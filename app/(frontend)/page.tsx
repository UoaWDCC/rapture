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
    <div className="w-full flex-col items-center">
      <div className="w-full min-h-screen flex flex-col flex-wrap items-center justify-center gap-5 relative overflow-hidden">
       
        <div className="absolute top-0 left-0 w-full">
        <Image
          src="/images/IMG_3161 1.png"
          alt=""
          width={1437}
          height={500}
          className="w-full object-cover opacity-60"
        />
      </div>

        <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/images/FRONT PAGE.png"
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

        {/* PROMOTED GAME SECTION - to be added when component is ready */}

        <NewsSection />
       
      <div className="relative w-full overflow-hidden">
  
  <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
    <Image
      src="/images/FOOTER.png"
      alt=""
      width={1437}
      height={400}
      className="w-full object-cover opacity-60"
    />
  </div>

  <div className="relative z-10">
    <div className="flex items-center gap-4 w-full px-8 mb-4">
      <div className="flex-1 border-t border-white"></div>
      <p className="text-white text-lg" style={{ fontFamily: "'Nova Cut', cursive" }}>SOCIAL MEDIA</p>
      <div className="flex-1 border-t border-white"></div>
    </div>

    <div className="flex gap-8 justify-center w-full flex-wrap">
      <Disc name="Discord" url="https://discord.com" image="/dvd_player_2.png" icon="/DISCORD.png" 
        iconWidth={45} iconHeight={45} iconTop="top-10" iconRight="right-7.5" color="bg-[#171947]" />
      <Disc name="Youtube" url="https://www.youtube.com/@STUDIO_RAPTURE" image="/dvd_player_2.png" icon="/YT.png" 
        iconWidth={80} iconHeight={80} iconTop="top-6.5" iconRight="right-3" color="bg-[#4C1010]" />
      <Disc name="Steam" url="https://store.steampowered.com/search/?developer=Lee%20Wilson" image="/dvd_player_2.png" icon="/steam.png" 
        iconWidth={45} iconHeight={45} iconTop="top-10" iconRight="right-7" color="bg-[#171720]" />
    </div>

    <div className="w-full px-8 mt-8">
      <div className="border-t border-white"></div>
    </div>

    <div className="w-full px-115 mt-8 mb-8">
      <div className="border border-yellow p-6 rounded-lg">
        <p className="text-white text-lg">TEXT WILL GO HERE</p>
      </div>
    </div>
  </div>
</div>
      
    </div>
  );
}
