import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import OrderCollectionDisplay from "./order/orderCollectionDisplay";
import Link from "next/link";
import Disc from "@/app/(frontend)/components/Disc"

import { NewsSection } from "./components/NewsSection";
import Carousel from "@/app/(frontend)/components/Carousel.tsx"; // carousel testing

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

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
      <div className="w-full min-h-screen flex flex-col flex-wrap items-center justify-center gap-5">
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

        <div className="flex items-center gap-4 w-full px-8 mb-4">
    <div className="flex-1 border-t border-white"></div>
    <p className="text-white text-lg" style={{ fontFamily: "'Nova Cut', cursive" }}>SOCIAL MEDIA</p>
    <div className="flex-1 border-t border-white"></div>
    </div>

        <div className="flex gap-8 justify-center w-full px-20">
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

        <div className="mt-10">
          <h1 className="text-2xl font-bold">
            To edit the below table go to Dashboard and add to the example
            collection
          </h1>
          {order.docs.map((order) => {
            return (
              <OrderCollectionDisplay
                key={order.id}
                order={order}
              ></OrderCollectionDisplay>
            );
          })}
        </div>

        <div className="flex flex-row flex-wrap gap-1 text-2xl">
          <Link
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href={payloadConfig.routes.admin}
            target="_blank"
          >
            Admin panel
          </Link>
          <Link
            className="bg-black transition duration-200 hover:bg-sky-700 rounded-lg p-3"
            href="https://payloadcms.com/docs"
            target="_blank"
          >
            Documentation
          </Link>
          <Link
            className="bg-black transition duration-200 hover:bg-sky-700 rounded-lg p-3"
            href="/exampleCollection"
          >
            Example Collection
          </Link>
          <Link
            className="bg-black transition duration-200 hover:bg-sky-700 rounded-lg p-3"
            href="/leaderboard"
          >
            Leaderboard
          </Link>
          <Link
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href="/news"
          >
            News
          </Link>
          <Link
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href="/cart"
          >
            Cart
          </Link>
          <Link
            className="bg-black transition duration-200 hover:bg-sky-700 rounded-lg p-3"
            href="/userDashboard"
          >
            User Dashboard
          </Link>
        </div>

      <div className="flex flex-row gap-1 m-2 text-lg">
        <p>Update this page by editing</p>
        <Link href={fileURL}>
          <code className="bg-black p-1 transition duration-200 hover:underline">
            app/(frontend)/page.tsx
          </code>
        </Link>
      </div>
      
    </div>
  );
}
