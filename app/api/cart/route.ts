import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { Cart, Product } from "@/payload-types";

type CartItem = {
  product: string | Product;
  quantity: number;
  stripePriceId?: string | null;
  id?: string | null;
};

type CartRecord = Omit<Cart, "items"> & { items?: CartItem[] | null };

async function getCurrentCart() {
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    return { payload, user: null, cart: null as CartRecord | null };
  }

  const result = await payload.find({
    collection: "Cart",
    where: { user: { equals: user.id } },
    depth: 2,
    limit: 1,
  });

  return {
    payload,
    user,
    cart: (result.docs[0] ?? null) as unknown as CartRecord | null,
  };
}

function normalizeCartItem(item: CartItem) {
  const product = typeof item.product === "object" ? item.product : null;
  const productId =
    typeof item?.product === "string" ? item.product : (product?.id ?? null);

  return {
    productId,
    quantity: Number(item?.quantity ?? 1),
    stripePriceId: item?.stripePriceId ?? product?.stripePriceId ?? null,
    product: product
      ? {
          id: product.id,
          name: product.name,
          description: product.description ?? "",
          price: Number(product.price ?? 0),
          currency: product.currency ?? "NZD",
          stripePriceId: product.stripePriceId ?? null,
        }
      : null,
  };
}

export async function GET() {
  try {
    const { user, cart } = await getCurrentCart();

    if (!user) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json({
      items: (cart?.items ?? []).map(normalizeCartItem),
    });
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { payload, user, cart } = await getCurrentCart();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const productId = String(body.productId ?? "").trim();
    const quantity = Math.max(1, Number(body.quantity ?? 1));

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const product = await payload.findByID({
      collection: "products",
      id: productId,
      depth: 1,
    });

    const nextItems: CartItem[] = Array.isArray(cart?.items)
      ? [...cart.items]
      : [];
    const existingIndex = nextItems.findIndex((item) => {
      const itemProductId =
        typeof item.product === "string" ? item.product : item.product?.id;
      return itemProductId === productId;
    });

    const itemData = {
      product: product.id,
      stripePriceId: product.stripePriceId ?? "",
      quantity,
    };

    if (existingIndex >= 0) {
      nextItems[existingIndex] = {
        ...nextItems[existingIndex],
        quantity: Number(nextItems[existingIndex].quantity ?? 0) + quantity,
        stripePriceId:
          nextItems[existingIndex].stripePriceId || product.stripePriceId || "",
      };
    } else {
      nextItems.push(itemData);
    }

    const updatedCart = cart
      ? await payload.update({
          collection: "Cart",
          id: cart.id,
          data: { items: nextItems },
        })
      : await payload.create({
          collection: "Cart",
          data: {
            user: user.id,
            items: nextItems,
          },
        });

    return NextResponse.json({
      success: true,
      items: (updatedCart?.items ?? []).map(normalizeCartItem),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add cart item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { payload, user, cart } = await getCurrentCart();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const body = await request.json();
    const productId = String(body.productId ?? "").trim();
    const quantity = Math.max(0, Number(body.quantity ?? 0));

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const nextItems: CartItem[] = (cart.items ?? []).filter((item) => {
      const itemProductId =
        typeof item.product === "string" ? item.product : item.product?.id;
      return itemProductId !== productId;
    });

    if (quantity > 0) {
      const target = (cart.items ?? []).find((item) => {
        const itemProductId =
          typeof item.product === "string" ? item.product : item.product?.id;
        return itemProductId === productId;
      });

      nextItems.push({
        product: productId,
        stripePriceId: target?.stripePriceId ?? "",
        quantity,
      });
    }

    const updatedCart = await payload.update({
      collection: "Cart",
      id: cart.id,
      data: { items: nextItems },
    });

    return NextResponse.json({
      success: true,
      items: (updatedCart?.items ?? []).map(normalizeCartItem),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update cart item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { payload, user, cart } = await getCurrentCart();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const body = await request.json().catch(() => ({}));
    const productId = String(body.productId ?? "").trim();

    const nextItems: CartItem[] = productId
      ? (cart.items ?? []).filter((item) => {
          const itemProductId =
            typeof item.product === "string" ? item.product : item.product?.id;
          return itemProductId !== productId;
        })
      : [];

    const updatedCart = await payload.update({
      collection: "Cart",
      id: cart.id,
      data: { items: nextItems },
    });

    return NextResponse.json({
      success: true,
      items: (updatedCart?.items ?? []).map(normalizeCartItem),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove cart item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
