import type { CollectionConfig } from "payload";

import { sendNewsUpdateToSubscribers } from "@/lib/email/newsSubscription";

export const News: CollectionConfig = {
  slug: "News", // Collection Name
  // What is stored in this collection
  timestamps: true,

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  admin: {
    useAsTitle: "title",
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only email subscribers for new posts, not edits
        if (operation !== "create") return doc;

        // Not awaited so a slow/failed send never blocks the admin saving the post
        void sendNewsUpdateToSubscribers(req.payload, doc).catch((err) => {
          req.payload.logger.error({ err }, "News update email failed");
        });

        return doc;
      },
    ],
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value || !value.trim()) {
          return "Title cannot be empty";
        }
        return true;
      },
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value || !value.trim()) {
          return "Subtitle cannot be empty";
        }
        return true;
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "category",
      hasMany: true,
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
  ],
};