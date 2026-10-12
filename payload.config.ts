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

export default buildConfig({
  editor: lexicalEditor(),

  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Rapture",

    apiKey: process.env.RESEND_API_KEY || "",
  }),

  globals: [EmailSettings],
  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection, Products, OrderCollection, Media, News, Category, Donors],

  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl:true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${process.env.R2_PUBLIC_URL}/${key}`
          },
        },
      },
      bucket: process.env.R2_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});
