import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { ExampleCollection } from "./collections/exampleCollection.ts";
import { Users } from "./collections/users.ts";
import { Players } from "./collections/players.ts";
import { CartCollection } from "./collections/Cart.ts";

export default buildConfig({
  editor: lexicalEditor(),

  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});
