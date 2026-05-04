import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "News", // Collection Name
  // What is stored in this collection
  fields: [
    {
      name: "title", // Name of field can be anything
      type: "text", // Type of field has to be one of the defined types from https://payloadcms.com/docs/fields/overview
    },
    {
      name: "description",
      type: "text",
    },
    {
        name: "createdAt",
        type: "text",
    },
    {
        name: "editedAt",
        type: "text",
    },
  ],
};
