import type { CollectionConfig } from "payload";
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import React from "react";
import Purchase from "@/lib/email/email_templates/purchase";

export const OrderCollection: CollectionConfig = {
  slug: "order",
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      index: true,
      label: "User (Email)",
      required: true,
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
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      index: true,
      admin: {
        description: "Canonical Stripe checkout session ID for the order.",
      },
    },
    {
      name: "stripePaymentIntentId",
      type: "text",
      index: true,
      admin: {
        description: "Canonical Stripe payment intent ID for the order.",
      },
    },
    {
      name: "customerEmail",
      type: "email",
      admin: { description: "Email captured from the checkout session." },
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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === "create") {
          try {
            let userEmail = "";
            if (typeof doc.user === "string") {
              const user = await req.payload.findByID({
                collection: "users",
                id: doc.user,
              });
              userEmail = user.email;
            } else if (doc.user && doc.user.email) {
              userEmail = doc.user.email;
            }

            const settings = (await req.payload.findGlobal({
              slug: "emailSettings",
            })) as {
              purchaseEmailText?: string;
              adminPurchaseEmailText?: string;
            };
            const userText =
              settings?.purchaseEmailText ||
              "Thank you for purchasing! Here are your items:";
            const adminText =
              settings?.adminPurchaseEmailText ||
              "A new purchase has been made. Details below:";

            const items = (doc.products || []).map(
              (p: {
                productName: string;
                price: number;
                quantity?: number;
                image?: { url?: string } | string;
              }) => ({
                productName: p.productName,
                price: p.price,
                quantity: p.quantity || 1,
                imageUrl:
                  p.image && typeof p.image === "object" && p.image.url
                    ? p.image.url
                    : undefined,
              }),
            );

            const userHtml = await render(React.createElement(Purchase, { text: userText, items: items, totalPrice: doc.totalPrice, orderId: doc.id, orderDate: doc.dateTime }));
            const adminHtml = await render(React.createElement(Purchase, { text: adminText, items: items, totalPrice: doc.totalPrice, purchaserEmail: userEmail, orderId: doc.id, orderDate: doc.dateTime }));

            const admins = await req.payload.find({
              collection: "users",
              where: { role: { equals: "admin" } },
            });
            const adminEmails = admins.docs.map((a) => a.email);

            const emailPromises = [];
            if (userEmail) {
              emailPromises.push(
                sendEmail({
                  to: userEmail,
                  subject: "Order Confirmation",
                  html: userHtml,
                }),
              );
            }
            if (adminEmails.length > 0) {
              emailPromises.push(
                sendEmail({
                  to: adminEmails,
                  subject: "New Order Received",
                  html: adminHtml,
                }),
              );
            }

            await Promise.allSettled(emailPromises);
          } catch (err) {
            console.error("Failed to send purchase emails", err);
          }
        }
      },
    ],
  },
};
