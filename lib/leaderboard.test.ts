import { describe, expect, it, vi } from "vitest";
import type { Payload } from "payload";
import type { Player } from "@/payload-types";
import { withDisplayNames } from "./leaderboard";

const accountId = "66f1c0ffee0000000000abcd";
const deletedId = "66f1c0ffee0000000000dead";

function fakePayload(users: { id: string; username?: string | null }[]) {
  const find = vi.fn().mockResolvedValue({ docs: users });
  return { payload: { find } as unknown as Payload, find };
}

const player = (userId: string, score = 100) => ({ id: `p-${userId}`, userId, score }) as unknown as Player;

describe("withDisplayNames", () => {
  it("shows the account's username instead of its ID", async () => {
    const { payload, find } = fakePayload([{ id: accountId, username: "NEONKAI" }]);

    const [entry] = await withDisplayNames(payload, [player(accountId)]);

    expect(entry.displayName).toBe("NEONKAI");
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "users", where: { id: { in: [accountId] } } }),
    );
  });

  it("never shows a raw account ID, even when the account has no username or was deleted", async () => {
    const { payload } = fakePayload([{ id: accountId, username: null }]);

    const entries = await withDisplayNames(payload, [player(accountId), player(deletedId)]);

    expect(entries.map((e) => e.displayName)).toEqual(["Unnamed player", "Unknown Player"]);
  });

  it("keeps names an admin typed in by hand without looking up accounts", async () => {
    const { payload, find } = fakePayload([]);

    const [entry] = await withDisplayNames(payload, [player("GHOST_LINE")]);

    expect(entry.displayName).toBe("GHOST_LINE");
    expect(find).not.toHaveBeenCalled();
  });
});
