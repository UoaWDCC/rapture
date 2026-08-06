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
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Payment Completed", value: "payment_completed" },
        { label: "Waiting on Details", value: "waiting_on_details" },
        { label: "Processing", value: "processing" },
        { label: "Delivery", value: "delivery" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
      label: "Products",
    },
    {
      name: "dateTime",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
      defaultValue: () => new Date(),
    },
    {
      name: "totalPrice",
      type: "number",
      label: "Total Price ($)",
      required: true,
      admin: { step: 0.01 },
    },
    {
      name: "shippingAddress",
      type: "group",
      admin: { description: "Snapshot of shipping address at time of order" },
      fields: [
        { name: "address", type: "text" },
        { name: "state", type: "text" },
        { name: "country", type: "text" },
        { name: "pincode", type: "text" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Internal admin notes about this order" },
    },
  ],
};
