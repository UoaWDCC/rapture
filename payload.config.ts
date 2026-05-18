import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { ExampleCollection } from "./collections/exampleCollection.ts";
import { Users } from "./collections/users.ts";
import { OrderCollection } from "./collections/orderCollection.ts";
import { Players } from "./collections/players.ts";
import { Products } from "./collections/products.ts";
import { CartCollection } from "./collections/Cart.ts";
import { Media } from "./collections/media.ts";
import { News } from "./collections/News.ts";

export default buildConfig({
  editor: lexicalEditor(),

  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection, Products, OrderCollection, Media,News],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});
