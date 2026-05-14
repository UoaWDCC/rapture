import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripeClient, Stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const { price_id } = await request.json();

    if (!price_id) {
      return NextResponse.json({ error: "Missing price_id" }, { status: 400 });
    }

    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
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
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
