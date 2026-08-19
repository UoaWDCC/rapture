import { User } from "@/payload-types";
import { stripeClient } from "@/lib/stripe";
import { CollectionConfig } from "payload";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

async function syncProductToStripe(
  data: Record<string, any>,
  originalDoc?: Record<string, any>,
) {
  const name = String(data.name ?? originalDoc?.name ?? "").trim();
  const description = String(
    data.description ?? originalDoc?.description ?? "",
  ).trim();
  const price = Number(data.price ?? originalDoc?.price ?? 0);
  const currency = String(
    data.currency ?? originalDoc?.currency ?? "NZD",
  ).toUpperCase();

  if (!name || !Number.isFinite(price) || price <= 0) {
    return data;
  }

  const existingProductId =
    data.stripeProductId ?? originalDoc?.stripeProductId;
  const existingPriceId = data.stripePriceId ?? originalDoc?.stripePriceId;

  if (existingProductId) {
    await stripeClient.products.update(existingProductId, {
      name,
      description: description || undefined,
      metadata: {
        payloadProductId: String(originalDoc?.id ?? data.id ?? ""),
        payloadCollection: "products",
      },
    });

    if (existingPriceId) {
      await stripeClient.prices.update(existingPriceId, {
        active: false,
      });
    }

    const nextPrice = await stripeClient.prices.create({
      product: existingProductId,
      unit_amount: Math.round(price),
      currency: currency.toLowerCase(),
      active: true,
    });

    data.stripeProductId = existingProductId;
    data.stripePriceId = nextPrice.id;
    return data;
  }

  const stripeProduct = await stripeClient.products.create({
    name,
    description: description || undefined,
    metadata: {
      payloadProductId: String(originalDoc?.id ?? data.id ?? ""),
      payloadCollection: "products",
    },
  });

  const stripePrice = await stripeClient.prices.create({
    product: stripeProduct.id,
    unit_amount: Math.round(price),
    currency: currency.toLowerCase(),
    active: true,
  });

  data.stripeProductId = stripeProduct.id;
  data.stripePriceId = stripePrice.id;

  return data;
}

export const Products: CollectionConfig = {
  slug: "products",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        return syncProductToStripe(
          data as Record<string, any>,
          originalDoc as Record<string, any> | undefined,
        );
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.stripeProductId) {
          return doc;
        }

        await stripeClient.products.update(doc.stripeProductId, {
          active: false,
        });

        return doc;
      },
    ],
  },
  access: {
    read: () => true,
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
    {
      name: "stripeProductId",
      type: "text",
      admin: {
        readOnly: true,
        description: "Stripe product ID used as the canonical reference.",
      },
    },
    {
      name: "stripePriceId",
      type: "text",
      admin: {
        readOnly: true,
        description: "Stripe price ID used for checkout.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "additionalImage",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
