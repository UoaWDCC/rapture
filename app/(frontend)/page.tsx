import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import OrderCollectionDisplay from "./order/orderCollectionDisplay"

import Link from "next/link";
import Disc from "@/app/(frontend)/components/Disc"

import { NewsSection } from "./components/NewsSection";
import Navbar from "@/app/(frontend)/components/navbar.tsx"; // navbar testing
import Carousel from "@/app/(frontend)/components/Carousel.tsx"; // carousel testing

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const itemsNav = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Random1", link: "/random1" },
    { id: 3, name: "SomethingPage - WARNING: link doesn't work!", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUjcmljayBhc3RsZXkgbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXDSBwkJAwsBhyohjO8%3D" },
    { id: 4, name: "News Page", link: "/News" }
  ]; // navbar testing

  const itemsC = [
    { id: 1, image: "/images/ivlnaud5zro61.png", heading: "Aw Heck", text: "Just Some Text" },
    { id: 2, image: "/images/ivlnaud5zro61.png", heading: "Page 2", text: "Just Some Text2" },
  ]; //carousel testing
  const order = await payload.find({
    collection: "order",
    where: user ? {
      user: {
        equals: user.id
      }
    } : { id: { equals: "nobody" } } //placeholder for no user id found
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <Navbar item={itemsNav} user={user} />
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <picture>
          <source srcSet="/Rapture_Large_2500-1000.png" />
          <Image
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
        <div>
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
        <div className="flex flex-row gap-1 text-2xl">
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
      </div>

      <div className="flex flex-row gap-1 m-2 text-lg">
        <p>Update this page by editing</p>
        <Link href={fileURL}>
          <code className="bg-black p-1 transition duration-200 hover:underline">
            app/(frontend)/page.tsx
          </code>
        </Link>
      </div>

      <div className="flex items-center gap-4 w-full px-8 mb-4">
    <div className="flex-1 border-t border-white"></div>
    <h2 className="text-white text-2xl" style={{ fontFamily: "'Nova Cut', cursive" }}>SOCIAL MEDIA</h2>
    <div className="flex-1 border-t border-white"></div>
    </div>

    <div className="flex gap-4 justify-center w-full">
    <Disc name="Discord" url="https://discord.com" image="/dvd_player_2.png" icon="/DISCORD.png" iconWidth={40} iconHeight={40} iconTop="top-6.5" iconRight="right-4" color="bg-[#171947]" />
    <Disc name="Youtube" url="https://www.youtube.com/@STUDIO_RAPTURE" image="/dvd_player_2.png" icon="/YT.png" iconWidth={70} iconHeight={70} iconTop="top-3" iconRight="right-0.25" color="bg-[#4C1010]" />
    <Disc name="Steam" url="https://store.steampowered.com/search/?developer=Lee%20Wilson" image="/dvd_player_2.png" icon="/steam.png" iconWidth={36} iconHeight={36} iconTop="top-7" iconRight="right-4.5" color="bg-[#171720]" />
    </div>
      
      <NewsSection />

      <div>
        <Carousel items={itemsC} />
      </div>
    </div>
  );
}