import type { CollectionConfig } from "payload";

export const Players: CollectionConfig = {
  slug: "Players",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user?.role === "admin"),
  },
  // What is stored in this collection
  fields: [
    {
      name: "userId",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "score",
      type: "number",
      required: true,
      min: 0,
    },
  ],
};
