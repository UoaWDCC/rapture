// Steam account linking service layer
// validate a unique SteamID64 with typed error handling
// perms to read/update/clear steamId field

import { getPayload } from "payload";
import config from "@/payload.config";
import type { User } from "@/payload-types";

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

export class InvalidSteamIdError extends Error {
  constructor(message = "Invalid SteamID64.") {
    super(message);
    this.name = "InvalidSteamIdError";
  }
}

export class SteamAlreadyLinkedError extends Error {
  constructor(message = "This Steam account is already linked to another user.") {
    super(message);
    this.name = "SteamAlreadyLinkedError";
  }
}

export class UserAlreadyLinkedError extends Error {
  constructor(message = "This account already has a linked Steam account.") {
    super(message);
    this.name = "UserAlreadyLinkedError";
  }
}
export class UserNotFoundError extends Error {
  constructor(message = "User not found.") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

// Individual SteamID64s are 17-digit numbers beginning 7656119
const STEAMID64_RE = /^7656119[0-9]{10}$/;

export function isValidSteamId64(raw: unknown): raw is string {
  return typeof raw === "string" && STEAMID64_RE.test(raw.trim());
}

export function normalizeSteamId(raw: unknown): string {
  if (!isValidSteamId64(raw)) {
    throw new InvalidSteamIdError();
  }
  return (raw as string).trim();
}

async function getClient(payload?: PayloadClient): Promise<PayloadClient> {
  return payload ?? (await getPayload({ config }));
}

async function findUserById(p: PayloadClient, userId: string): Promise<User> {
  try {
    const user = await p.findByID({
      collection: "users",
      id: userId,
      overrideAccess: true,
    });
    return user as User;
  } catch {
    throw new UserNotFoundError();
  }
}

export async function getLinkedSteam(
  userId: string,
  payload?: PayloadClient,
): Promise<string | null> {
  const p = await getClient(payload);
  const user = await findUserById(p, userId);
  return user.steamId ?? null;
}

// Error handling in order:
// steamId is a valid SteamID64      -> InvalidSteamIdError
// this user has no steamId yet      -> UserAlreadyLinkedError
// no other user holds this steamId  -> SteamAlreadyLinkedError

export async function linkSteamAccount(
  userId: string,
  rawSteamId: unknown,
  payload?: PayloadClient,
): Promise<User> {
  const steamId = normalizeSteamId(rawSteamId); // (1)
  const p = await getClient(payload);

  const user = await findUserById(p, userId);
  if (user.steamId) {
    throw new UserAlreadyLinkedError(); // (2)
  }

  const existing = await p.find({
    collection: "users",
    where: { steamId: { equals: steamId } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length > 0) {
    throw new SteamAlreadyLinkedError();
  }

  const updated = await p.update({
    collection: "users",
    id: userId,
    data: { steamId },
    overrideAccess: true,
  });
  return updated as User;
}

export async function unlinkSteamAccount(
  userId: string,
  payload?: PayloadClient,
): Promise<User> {
  const p = await getClient(payload);
  await findUserById(p, userId); // 404 if the user doesn't exist
  const updated = await p.update({
    collection: "users",
    id: userId,
    data: { steamId: null },
    overrideAccess: true,
  });
  return updated as User;
}