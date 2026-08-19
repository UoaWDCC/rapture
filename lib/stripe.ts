import Stripe from "stripe";

if (typeof window !== "undefined") {
  throw new Error("Stripe can only be used on the server.");
}

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);
export { Stripe };
