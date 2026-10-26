import type { ReactElement, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getPayload, find } = vi.hoisted(() => ({
  getPayload: vi.fn(),
  find: vi.fn(),
}));

vi.mock("payload", () => ({ getPayload }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("./leaderboardClient", () => ({ default: vi.fn(() => null) }));
vi.mock("../components/GlitchReveal", () => ({
  default: vi.fn(({ children }: { children: ReactNode }) => children),
}));

import LeaderboardPage from "./page";
import LeaderboardClient from "./leaderboardClient";

type TestElement = ReactElement<Record<string, unknown>>;

function findElement(
  node: unknown,
  predicate: (element: TestElement) => boolean,
): TestElement | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const match = findElement(child, predicate);
      if (match) return match;
    }
    return undefined;
  }

  if (typeof node !== "object" || node === null || !("props" in node)) {
    return undefined;
  }

  const element = node as TestElement;
  if (predicate(element)) return element;
  return findElement(element.props.children, predicate);
}

beforeEach(() => {
  find.mockReset().mockResolvedValue({
    docs: [{ id: "player-1", userId: "Rapture", score: 1200 }],
    totalPages: 4,
    hasNextPage: true,
    hasPrevPage: false,
  });
  getPayload.mockReset().mockResolvedValue({ find });
});

describe("LeaderboardPage", () => {
  it("loads the first page with default pagination and passes the results to the client", async () => {
    const tree = await LeaderboardPage({ searchParams: Promise.resolve({}) });

    expect(find).toHaveBeenCalledWith({
      collection: "Players",
      sort: "-score",
      limit: 10,
      page: 1,
    });

    const client = findElement(tree, (element) => element.type === LeaderboardClient);
    expect(client?.props).toEqual({
      topPlayers: [{ id: "player-1", userId: "Rapture", score: 1200 }],
      page: 1,
      limit: 10,
      totalPages: 4,
      hasNextPage: true,
      hasPrevPage: false,
    });
  });

  it("uses requested pagination and caps the requested limit at 100", async () => {
    await LeaderboardPage({
      searchParams: Promise.resolve({ page: "3", limit: "150" }),
    });

    expect(find).toHaveBeenCalledWith({
      collection: "Players",
      sort: "-score",
      limit: 100,
      page: 3,
    });
  });

  it("propagates a failure to retrieve leaderboard players", async () => {
    find.mockRejectedValueOnce(new Error("database unavailable"));

    await expect(
      LeaderboardPage({ searchParams: Promise.resolve({}) }),
    ).rejects.toThrow("database unavailable");
  });
});
