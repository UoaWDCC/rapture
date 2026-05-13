import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend"; /*email integration*/
import { ExampleCollection } from "./collections/exampleCollection.ts";
import { Users } from "./collections/users.ts";
import { OrderCollection } from "./collections/orderCollection.ts";
import { Players } from "./collections/players.ts";
import { Products } from "./collections/products.ts";
import { CartCollection } from "./collections/Cart.ts";

export default buildConfig({
  editor: lexicalEditor(),

  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Rapture",

    apiKey: process.env.RESEND_API_KEY || "",
  }),

  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection, Products, OrderCollection],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});
