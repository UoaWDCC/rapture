import type { CollectionConfig } from "payload";

export const Donors: CollectionConfig = {
  slug: "donors",

  timestamps: true,

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "tier",
      type: "select",
      required: true,
      defaultValue: "standard",
      options: [
        { label: "Featured", value: "featured" },
        { label: "Standard", value: "standard" },
      ],
    },
    {
      name: "text",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tabColor",
      type: "text",
      admin: {
        description: "Hex color for the tab (e.g. #c69825). Defaults to gold if empty.",
      },
    },
  ],
};
