import type { CollectionConfig } from "payload";

/* 
Example Payload Collection

When creating a new payload collection, you must ensure to add it to the payload.config.ts file.

for more information look at the online docs
https://payloadcms.com/docs/configuration/collections
*/

export const CartCollection: CollectionConfig = {
  slug: "Cart", // Collection Name
  // What is stored in this collection
  fields: [
    {
      name: "user", // Name of field can be anything
      type: "relationship", // Type of field has to be one of the defined types from https://payloadcms.com/docs/fields/overview
      relationTo: "users",
      required: true,
      unique: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "productTitle",
          type: "text",
          required: true,
        },
        {
          name: "productPrice",
          type: "number",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ]
    },    
  ],
};
