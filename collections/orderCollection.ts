import type { CollectionConfig } from "payload";

export const OrderCollection: CollectionConfig = {
  slug: "order",
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
      label: "User (Email)",
    },
    {
      name: "products",
      type: "array",
      required: true,
      fields: [
        {
          name: "productName",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
          label: "Price ($)",
          required: true,
          admin: {
            step: 0.01,
          },
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "dateTime",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: "totalPrice",
      type: "number",
      label: "Total Price ($)",
      required: true,
      admin: {
        step: 0.01,
      },
    },
  ],
};
