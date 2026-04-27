import { User } from "@/payload-types";
import { CollectionConfig } from "payload";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Products: CollectionConfig = {
  slug: "products",
  versions: {
    drafts: true, // enables _status field
  },
  access: {
    read: () => true, // anyone can read
    // restricting create, update and delete for admin
    create: ({ req: { user } }) => adminCheck(user),
    update: ({ req: { user } }) => adminCheck(user),
    delete: ({ req: { user } }) => adminCheck(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in cents (e.g., 1000 = $10.00)",
      },
    },
    {
      name: "currency",
      type: "select",
      required: true,
      defaultValue: "NZD",
      options: ["NZD", "AUD", "USD", "EUR", "GBP"],
    },
    {
      name: "description",
      type: "text",
    },
  ],
};
