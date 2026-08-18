import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import React from "react";
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import OrderConfirmation from "@/lib/email/email_templates/orderConfirmation";

import { stripeClient, Stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const headersList = await headers();
    const origin = headersList.get("origin");

    const { price_id } = await request.json();

    const { user } = await payload.auth({headers: headersList,});

    if (!user) {
        return NextResponse.json({
            success: false,
            error: "Not logged in.",
        },
        { status: 401 });
    }

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

    // Emails user about order
    try {
      const template = await payload.findGlobal({
          slug: "email-templates",
      });
      if (!template) {
          throw new Error("Email template not found.")
      }
      const html = await render(
          React.createElement(OrderConfirmation, { 
              name: user.email, 
              heading: template.orderConfirmation.heading,
              body: template.orderConfirmation.body,
          })
      );
      await sendEmail({
        to: user.email,
        subject: "Order Confirmed",
        html,
      });
    } catch (err) {
      console.error("Order Confirmation email failed.", err);
    }

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
