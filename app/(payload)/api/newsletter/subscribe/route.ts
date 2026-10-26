// Subscribes the logged-in user to news update emails.
// Responses: 200 subscribed | 409 already_subscribed | 401 unauthenticated | 500 error

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { sendSubscribeConfirmation } from "@/lib/email/newsSubscription";

export type SubscribeStatus = "subscribed" | "already_subscribed" | "unauthenticated" | "error";

const respond = (status: SubscribeStatus, message: string, code: number) =>
  NextResponse.json({ status, message }, { status: code });

export async function POST() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    return respond("unauthenticated", "You need to log in to subscribe.", 401);
  }

  if (user.newsSubscribed) {
    return respond("already_subscribed", "Email already subscribed.", 409);
  }

  try {
    await payload.update({
      collection: "users",
      id: user.id,
      data: { newsSubscribed: true },
    });
  } catch (err) {
    payload.logger.error({ err }, "News subscription failed");
    return respond("error", "Could not subscribe. Please try again.", 500);
  }

  // The subscription is saved even if the confirmation email fails.
  try {
    await sendSubscribeConfirmation(payload, user.email);
  } catch (err) {
    payload.logger.error({ err }, "Subscription confirmation email failed");
  }

  return respond("subscribed", "Subscribed successfully.", 200);
}
