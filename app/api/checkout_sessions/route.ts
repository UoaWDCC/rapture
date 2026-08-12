import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripeClient, Stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const body = await request.json();
    const { price_id, line_items, userId } = body;

    const preparedLineItems = Array.isArray(line_items)
      ? line_items.map((item: { price?: string; quantity?: number }) => ({
          price: item.price,
          quantity: item.quantity ?? 1,
        }))
      : price_id
        ? [{ price: price_id, quantity: 1 }]
        : [];

    if (
      !preparedLineItems.length ||
      preparedLineItems.some((item) => !item.price)
    ) {
      return NextResponse.json(
        { error: "Missing valid Stripe price(s)" },
        { status: 400 },
      );
    }

    const session = await stripeClient.checkout.sessions.create({
      line_items: preparedLineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
      metadata: {
        userId: userId || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const stripeError = err as Stripe.errors.StripeError;
      return NextResponse.json(
        { error: stripeError.message },
        { status: stripeError.statusCode || 500 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
