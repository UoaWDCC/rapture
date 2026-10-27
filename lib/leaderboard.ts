import type { Payload } from "payload";
import type { Player } from "@/payload-types";

/** A leaderboard row with the name to show instead of the raw account ID. */
export type LeaderboardEntry = Player & { displayName: string };

// Players.userId holds the account ID of whoever submitted the score (or a name an admin typed in by hand).
// Account IDs are MongoDB ObjectIds (24 hex characters), or numbers on SQL databases.
export const looksLikeAccountId = (value: string) =>
  /^[0-9a-f]{24}$/i.test(value) || /^\d+$/.test(value);

/**
 * Adds each player's public username, so the leaderboard never shows account IDs or emails.
 * Entries an admin typed in by hand (not an account ID) keep the name that was typed.
 */
export async function withDisplayNames(
  payload: Payload,
  players: Player[],
): Promise<LeaderboardEntry[]> {
  const ids = [
    ...new Set(
      players.map((p) => String(p.userId ?? "").trim()).filter(looksLikeAccountId),
    ),
  ];

  const usernames = new Map<string, string>();
  if (ids.length > 0) {
    const { docs } = await payload.find({
      collection: "users",
      where: { id: { in: ids } },
      limit: ids.length,
      depth: 0,
      overrideAccess: true,
      select: { username: true },
    });
    for (const user of docs) {
      usernames.set(String(user.id), user.username?.trim() ?? "");
    }
  }

  return players.map((player) => {
    const raw = String(player.userId ?? "").trim();
    let displayName: string;
    if (usernames.has(raw)) {
      displayName = usernames.get(raw) || "Unnamed player";
    } else if (!raw || looksLikeAccountId(raw)) {
      displayName = "Unknown Player"; // account was deleted
    } else {
      displayName = raw;
    }
    return { ...player, displayName };
  });
}
