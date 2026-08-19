// Sign in through steam, requires user to be logged into Payload first then redirects to steam for authentication


import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import SteamSignIn from "steam-signin";

/** protocol + host of this deployment, e.g. http://localhost:3000 */
function realmFrom(h: Headers): string {
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function GET() {
  const h = await headers();
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: h });

  const realm = realmFrom(h);
  if (!user) return NextResponse.redirect(`${realm}/login`);

  const signIn = new SteamSignIn(realm);
  const url = signIn.getUrl(`${realm}/api/steam/callback`);
  return NextResponse.redirect(url);
}