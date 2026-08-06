// Steam linking API
//   GET    /api/steam           -> the caller's linked steamId (or null)
//   POST   /api/steam { steamId } -> links a Steam account to the caller
//   DELETE /api/steam           -> unlinks the caller's Steam accoun
// The user id comes from the authenticated session

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  linkSteamAccount,
  getLinkedSteam,
  unlinkSteamAccount,
  InvalidSteamIdError,
  UserAlreadyLinkedError,
  SteamAlreadyLinkedError,
  UserNotFoundError,
} from "@/lib/steam";

function fail(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}

function mapError(err: unknown) {
  if (err instanceof InvalidSteamIdError) return fail(400, err.message);
  if (err instanceof UserAlreadyLinkedError) return fail(409, err.message);
  if (err instanceof SteamAlreadyLinkedError) return fail(409, err.message);
  if (err instanceof UserNotFoundError) return fail(404, err.message);
  return fail(500, "Failed to link Steam account.");
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

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) return fail(401, "Not authenticated.");

    const body = await request.json().catch(() => null);
    const updated = await linkSteamAccount(user.id, body?.steamId, payload);

    return NextResponse.json(
      { success: true, data: { steamId: updated.steamId } },
      { status: 201 },
    );
  } catch (err) {
    return mapError(err);
  }
}

export async function DELETE() {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) return fail(401, "Not authenticated.");

    await unlinkSteamAccount(user.id, payload);
    return NextResponse.json({ success: true, data: { steamId: null } });
  } catch (err) {
    return mapError(err);
  }
}