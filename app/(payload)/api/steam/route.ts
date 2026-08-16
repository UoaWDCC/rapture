// Remove or read steam link API

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getLinkedSteam, unlinkSteamAccount } from "@/lib/steam";

function fail(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) return fail(401, "Not authenticated.");

    const steamId = await getLinkedSteam(user.id, payload);
    return NextResponse.json({ success: true, data: { steamId } });
  } catch {
    return fail(500, "Failed to retrieve linked Steam account.");
  }
}

export async function DELETE() {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) return fail(401, "Not authenticated.");

    await unlinkSteamAccount(user.id, payload);
    return NextResponse.json({ success: true, data: { steamId: null } });
  } catch {
    return fail(500, "Failed to unlink Steam account.");
  }
}
