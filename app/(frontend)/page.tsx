import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import OrderCollectionDisplay from "./order/orderCollectionDisplay"
import Link from "next/link";

import { NewsSection } from "./components/NewsSection";
import Navbar from "@/app/(frontend)/components/navbar.tsx"; // navbar testing
import Carousel from "@/app/(frontend)/components/Carousel.tsx"; // carousel testing

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const order = await payload.find({
    collection: "order",
    where: user ? {
      user: {
        equals: user.id
      }
    } : { id: { equals: "nobody" } } //placeholder for no user id found
  });

  return (
    <div className="h-screen w-full flex flex-col items-center">

      <div className="w-full h-full flex flex-col flex-wrap items-center justify-center gap-5">
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
      </div>

      <div className="flex flex-row gap-1 m-2 text-lg">
        <p>Update this page by editing</p>
        <Link href={fileURL}>
          <code className="bg-black p-1 transition duration-200 hover:underline">
            app/(frontend)/page.tsx
          </code>
        </Link>
      </div>

      <NewsSection />

      <div>
        <Carousel items={itemsC} />
      </div>
    </div>
  );
}