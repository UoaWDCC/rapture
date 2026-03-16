import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";

import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";
import ExampleCollectionDisplay from "./components/exampleCollectionDisplay";

export default async function HomePage() {
  // All pages that need any payload access need these two lines
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  // If the current logged in user is required
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const examples = await payload.find({
    collection: "example",
  });

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center align-middle   ">
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <picture className="">
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
          {examples.docs.map((example) => {
            return (
              <ExampleCollectionDisplay
                key={example.title}
                example={example}
              ></ExampleCollectionDisplay>
            );
          })}
        </div>
        <div className="flex flex-row gap-1 text-2xl">
          <a
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Admin panel
          </a>
          <a
            className="bg-black transition duration-200 hover:bg-sky-700 rounded-lg p-3"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>

      <div className="flex flex-row gap-1 m-2 text-lg ">
        <p>Update this page by editing</p>
        <a className="" href={fileURL}>
          <code className="bg-black p-1 transition duration-200 hover:underline">
            app/(frontend)/page.tsx
          </code>
        </a>
      </div>
    </div>
  );
}
