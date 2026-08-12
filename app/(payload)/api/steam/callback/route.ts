// Steam redirects here after user authenticates, we validate then link SteamID64 to logged-in user

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import SteamSignIn from "steam-signin";
import {
  linkSteamAccount,
  InvalidSteamIdError,
  UserAlreadyLinkedError,
  SteamAlreadyLinkedError,
} from "@/lib/steam";

//localhost:3000 needs to be changed to actual website domain when deployed
function realmFrom(h: Headers): string {
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function GET(request: Request) {
  const h = await headers();
  const realm = realmFrom(h);
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: h });

  if (!user) return NextResponse.redirect(`${realm}/login`);

  try {
    const signIn = new SteamSignIn(realm);
    const steamId = await signIn.verifyLogin(request.url);
    await linkSteamAccount(user.id, steamId.getSteamID64(), payload);
    return NextResponse.redirect(`${realm}/userDashboard?steam=linked`);
  } catch (err) {
    const status =
      err instanceof UserAlreadyLinkedError ? "already_linked"
      : err instanceof SteamAlreadyLinkedError ? "duplicate"
      : err instanceof InvalidSteamIdError ? "invalid"
      : "error"; // includes a failed/forged Steam verification
    return NextResponse.redirect(`${realm}/userDashboard?steam=${status}`);
  }
}