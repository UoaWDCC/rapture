import type { CollectionConfig } from "payload";

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
      name: "description",
      type: "richText",
      required: true,
    },
  ],
};
