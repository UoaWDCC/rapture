import type { CollectionConfig } from "payload";

/* 
Example Payload Collection

When creating a new payload collection, you must ensure to add it to the payload.config.ts file.

for more information look at the online docs
https://payloadcms.com/docs/configuration/collections
*/

export const ExampleCollection: CollectionConfig = {
  slug: "example", // Collection Name
  // What is stored in this collection
  fields: [
    {
      name: "title", // Name of field can be anything
      type: "text", // Type of field has to be one of the defined types from https://payloadcms.com/docs/fields/overview
    },
    {
      name: "subTitle",
      type: "text",
    },
  ],
};
