import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend"; /*email integration*/
import { ExampleCollection } from "./collections/exampleCollection.ts";
import { Users } from "./collections/users.tsx";
import { OrderCollection } from "./collections/orderCollection.ts";
import { Players } from "./collections/players.ts";
import { Products } from "./collections/products.ts";
import { CartCollection } from "./collections/Cart.ts";
import { Media } from "./collections/media.ts";
import { News } from "./collections/News.ts";
import { Category } from "./collections/category.ts"
import { authPlugin } from "payload-auth-plugin";
import { GoogleAuthProvider } from "payload-auth-plugin/providers";
import { Accounts } from "./collections/accounts.ts";
import { Donors } from "./collections/Donors.ts"

import { EmailSettings } from "./collections/EmailSettings.ts";

export default buildConfig({
  editor: lexicalEditor(),

  serverURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  admin: {
    routes: {
      // A logged-in site user (Google or email login) who isn't an admin would otherwise be stuck on
      // "Unauthorized" with no login form. Send them through logout so the admin login page shows.
      unauthorized: '/logout',
    },
  },

  plugins: [authPlugin({
    allowOAuthAutoSignUp: true,
    name: 'app',
    usersCollectionSlug: Users.slug,
    accountsCollectionSlug: Accounts.slug,
    successRedirectPath: '/',
    errorRedirectPath: '/login',
    // Issue a normal Payload session (payload-token) so Google users are logged in across the site
    useAdmin: true,
    providers: [
      GoogleAuthProvider({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
  })],

  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Rapture",

    apiKey: process.env.RESEND_API_KEY || "",
  }),

  globals: [EmailSettings],
  // Ensure created collections are added here
  collections: [Users, ExampleCollection, Players, CartCollection, Products, OrderCollection, Media, News, Category, Donors, Accounts],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || false,
  }),
  sharp,
});
