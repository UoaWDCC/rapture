// Unsubscribes the logged-in user from news update emails.

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    return NextResponse.json({ message: "Not logged in." }, { status: 401 });
  }

  await payload.update({
    collection: "users",
    id: user.id,
    data: { newsSubscribed: false },
  });

  return NextResponse.json({ message: "Unsubscribed." });
}
