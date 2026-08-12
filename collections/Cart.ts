import type { CollectionConfig } from "payload";

export const CartCollection: CollectionConfig = {
  slug: "Cart",
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "stripePriceId",
          type: "text",
          required: true,
          admin: { description: "Stripe price ID used to checkout this item." },
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ],
    },
  ],
};
