import type { CollectionConfig } from "payload";

export const Category: CollectionConfig = {
  slug: "category",

  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ]
};
