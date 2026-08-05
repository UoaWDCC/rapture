import { User } from "@/payload-types";
import { CollectionConfig } from "payload";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },

  access: {
    create: ({ req: { user } }) => adminCheck(user),
    read: ({ req: { user } }) =>
      adminCheck(user) || { id: { equals: user?.id } },
    update: ({ req: { user } }) =>
      adminCheck(user) || { id: { equals: user?.id } },
    delete: ({ req: { user } }) => adminCheck(user),
    admin: ({ req: { user } }) => adminCheck(user),
  },

  fields: [
    {
      name: "email",
      type: "email",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },

    {
      name: "username",
      type: "text",
      unique: true,
      admin: {
        description: "Public display name",
      },
    },
    {
      name: "realName",
      type: "text",
      admin: {
        description: "Full legal name",
      },
    },
    {
      name: "country",
      type: "text",
      admin: {
        description: "Country of residence",
      },
    },

    {
      name: "cardInfo",
      type: "text",
      admin: {
        description:
          "Last 4 digits or card label — do NOT store full card numbers",
      },
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "state",
      type: "text",
      admin: {
        description: "State or province",
      },
    },
    {
      name: "paymentCountry",
      type: "text",
      admin: {
        description:
          "Country on the payment/shipping address (may differ from residence)",
      },
    },
    {
      name: "pincode",
      type: "text",
      admin: {
        description: "Postal / ZIP code",
      },
    },
  ],
};
