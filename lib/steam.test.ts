// Service-layer tests for Steam linking.  Proposed location: lib/steam.test.ts
// Run:  pnpm test

import { describe, it, expect, vi, beforeEach } from "vitest";

// The service imports these at module load; stub them so we don't pull in the
// real Payload runtime. Every service fn takes an injected client, so the real
// getPayload is never actually called.
vi.mock("payload", () => ({ getPayload: vi.fn() }));
vi.mock("@/payload.config", () => ({ default: {} }));

import {
  linkSteamAccount,
  getLinkedSteam,
  unlinkSteamAccount,
  isValidSteamId64,
  InvalidSteamIdError,
  UserAlreadyLinkedError,
  SteamAlreadyLinkedError,
  UserNotFoundError,
} from "@/lib/steam";

const VALID_ID = "76561197960265729";
const OTHER_ID = "76561198000000000";

type FakeUser = { id: string; email: string; steamId?: string | null };

/** Minimal stand-in for the Payload local API over a users collection. */
function fakePayload(seed: FakeUser[]) {
  const users = seed.map((u) => ({ ...u }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client: any = {
    async findByID({ id }: { id: string }) {
      const u = users.find((x) => x.id === id);
      if (!u) throw new Error("NotFound");
      return u;
    },
    async find({ where }: { where: { steamId: { equals: unknown } } }) {
      const wanted = where?.steamId?.equals;
      return { docs: users.filter((u) => u.steamId === wanted) };
    },
    async update({ id, data }: { id: string; data: Partial<FakeUser> }) {
      const u = users.find((x) => x.id === id);
      if (!u) throw new Error("NotFound");
      Object.assign(u, data);
      return u;
    },
  };
  return { client, users };
}

describe("isValidSteamId64", () => {
  it("accepts a well-formed SteamID64", () => {
    expect(isValidSteamId64(VALID_ID)).toBe(true);
  });

  it.each([
    ["empty string", ""],
    ["too short", "7656119796026572"],
    ["too long", "765611979602657299"],
    ["non-numeric", "7656119abcdefghij"],
    ["wrong prefix", "10000000000000000"],
    ["not a string", 76561197960265729],
    ["null", null],
    ["undefined", undefined],
  ])("rejects %s", (_label, input) => {
    expect(isValidSteamId64(input as unknown)).toBe(false);
  });
});

describe("linkSteamAccount", () => {
  it("links a valid Steam ID to a user with none", async () => {
    const { client, users } = fakePayload([{ id: "u1", email: "a@x.io" }]);
    const updated = await linkSteamAccount("u1", VALID_ID, client);
    expect(updated.steamId).toBe(VALID_ID);
    expect(users[0].steamId).toBe(VALID_ID); // persisted in the fake store
  });

  it("rejects an invalid Steam ID", async () => {
    const { client } = fakePayload([{ id: "u1", email: "a@x.io" }]);
    await expect(linkSteamAccount("u1", "nope", client)).rejects.toBeInstanceOf(
      InvalidSteamIdError,
    );
  });

  it("rejects a missing Steam ID", async () => {
    const { client } = fakePayload([{ id: "u1", email: "a@x.io" }]);
    await expect(
      linkSteamAccount("u1", undefined, client),
    ).rejects.toBeInstanceOf(InvalidSteamIdError);
  });

  it("rejects when this user is already linked (one Steam per account)", async () => {
    const { client } = fakePayload([
      { id: "u1", email: "a@x.io", steamId: OTHER_ID },
    ]);
    await expect(
      linkSteamAccount("u1", VALID_ID, client),
    ).rejects.toBeInstanceOf(UserAlreadyLinkedError);
  });

  it("rejects when another user already holds that Steam ID (no duplicates)", async () => {
    const { client } = fakePayload([
      { id: "u1", email: "a@x.io" },
      { id: "u2", email: "b@x.io", steamId: VALID_ID },
    ]);
    await expect(
      linkSteamAccount("u1", VALID_ID, client),
    ).rejects.toBeInstanceOf(SteamAlreadyLinkedError);
  });

  it("rejects when the user does not exist", async () => {
    const { client } = fakePayload([]);
    await expect(
      linkSteamAccount("ghost", VALID_ID, client),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});

describe("getLinkedSteam", () => {
  it("returns null when nothing is linked", async () => {
    const { client } = fakePayload([{ id: "u1", email: "a@x.io" }]);
    expect(await getLinkedSteam("u1", client)).toBeNull();
  });

  it("returns the linked Steam ID", async () => {
    const { client } = fakePayload([
      { id: "u1", email: "a@x.io", steamId: VALID_ID },
    ]);
    expect(await getLinkedSteam("u1", client)).toBe(VALID_ID);
  });

  it("throws for an unknown user", async () => {
    const { client } = fakePayload([]);
    await expect(getLinkedSteam("ghost", client)).rejects.toBeInstanceOf(
      UserNotFoundError,
    );
  });
});

describe("unlinkSteamAccount", () => {
  it("clears a linked Steam ID", async () => {
    const { client, users } = fakePayload([
      { id: "u1", email: "a@x.io", steamId: VALID_ID },
    ]);
    await unlinkSteamAccount("u1", client);
    expect(users[0].steamId).toBeNull();
  });

  it("is idempotent when nothing is linked", async () => {
    const { client, users } = fakePayload([{ id: "u1", email: "a@x.io" }]);
    await unlinkSteamAccount("u1", client);
    expect(users[0].steamId).toBeNull();
  });
});
