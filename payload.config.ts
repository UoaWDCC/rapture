import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend"; /*email integration*/
import { s3Storage } from '@payloadcms/storage-s3';
import { ExampleCollection } from "./collections/exampleCollection.ts";
import { Users } from "./collections/users.tsx";
import { OrderCollection } from "./collections/orderCollection.ts";
import { Players } from "./collections/players.ts";
import { Products } from "./collections/products.ts";
import { CartCollection } from "./collections/Cart.ts";
import { Media } from "./collections/media.ts";
import { News } from "./collections/News.ts";
import { Category } from "./collections/category.ts"
import { Donors } from "./collections/Donors.ts"

import { EmailSettings } from "./collections/EmailSettings.ts";

//if required env values are missing/empty, it will throw an error.
const requiredENV = (name: string) : string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

export default buildConfig({
  editor: lexicalEditor(),

  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Rapture",

    apiKey: requiredENV("RESEND_API_KEY"),
  }),

  globals: [EmailSettings],
  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection, Products, OrderCollection, Media, News, Category, Donors],


  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",
      clientUploads: true,
      config: {
        endpoint: requiredENV("S3_ENDPOINT"),
        credentials: {
          accessKeyId: requiredENV("S3_ACCESS_KEY_ID"),
          secretAccessKey: requiredENV("S3_SECRET_ACCESS_KEY"),
        },
        region: requiredENV("S3_REGION"),
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});