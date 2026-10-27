import { beforeEach, describe, expect, it, vi } from "vitest";

const { getPayload, find, create } = vi.hoisted(() => ({
  getPayload: vi.fn(),
  find: vi.fn(),
  create: vi.fn(),
}));

vi.mock("payload", () => ({ getPayload }));
vi.mock("@/payload.config", () => ({ default: {} }));

import { GET, POST } from "./route";
import { GET as search } from "./search/route";

const player = { id: "player-1", userId: "Rapture", score: 1200, internal: true };

function postRequest(body: string) {
  return new Request("http://localhost/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

beforeEach(() => {
  find.mockReset();
  create.mockReset();
  getPayload.mockReset().mockResolvedValue({ find, create });
});

describe("GET /api/leaderboard", () => {
  it("returns the top ten players with only public leaderboard fields", async () => {
    find.mockResolvedValue({ docs: [player] });

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      data: [{ userId: "Rapture", displayName: "Rapture", score: 1200 }],
    });
    expect(find).toHaveBeenCalledWith({
      collection: "Players",
      sort: "-score",
      limit: 10,
      overrideAccess: true,
    });
  });

  it("returns an error when the leaderboard cannot be retrieved", async () => {
    find.mockRejectedValue(new Error("database unavailable"));

    const response = await GET();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: "Failed to retrieve leaderboard",
    });
  });
});

describe("POST /api/leaderboard", () => {
  it.each([
    ["missing userId", { score: 1200 }],
    ["missing score", { userId: "Rapture" }],
  ])("rejects a request with %s", async (_label, body) => {
    const response = await POST(postRequest(JSON.stringify(body)));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: "Missing userId or score",
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("rejects a non-numeric score", async () => {
    const response = await POST(
      postRequest(JSON.stringify({ userId: "Rapture", score: "1200" })),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: "Score must be a number",
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("creates and returns a score", async () => {
    create.mockResolvedValue(player);

    const response = await POST(
      postRequest(JSON.stringify({ userId: "Rapture", score: 1200 })),
    );

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ success: true, data: player });
    expect(create).toHaveBeenCalledWith({
      collection: "Players",
      data: { userId: "Rapture", score: 1200 },
      overrideAccess: true,
    });
  });

  it("returns an error when score submission fails", async () => {
    create.mockRejectedValue(new Error("database unavailable"));

    const response = await POST(
      postRequest(JSON.stringify({ userId: "Rapture", score: 1200 })),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: "Failed to submit score",
    });
  });

  // Current behavior: malformed request JSON is handled as an internal error.
  it("returns 500 for malformed JSON", async () => {
    const response = await POST(postRequest("{"));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: "Failed to submit score",
    });
    expect(create).not.toHaveBeenCalled();
  });
});

describe("GET /api/leaderboard/search", () => {
  it.each(["", "   "])("rejects a missing or blank username (%j)", async (username) => {
    const response = await search(
      new Request(
        `http://localhost/api/leaderboard/search?username=${encodeURIComponent(username)}`,
      ),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: "Username query is required",
    });
    expect(find).not.toHaveBeenCalled();
  });

  it("rejects a missing username query", async () => {
    const response = await search(
      new Request("http://localhost/api/leaderboard/search"),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: "Username query is required",
    });
    expect(find).not.toHaveBeenCalled();
  });

  it("returns players whose account username matches, shown by username", async () => {
    const accountId = "66f1c0ffee0000000000abcd";
    const account = { id: accountId, username: "Rapture" };
    const scored = { id: "player-1", userId: accountId, score: 1200 };
    find
      .mockResolvedValueOnce({ docs: [account] }) // users matching the username
      .mockResolvedValueOnce({ docs: [scored] }) // their scores
      .mockResolvedValueOnce({ docs: [account] }); // usernames for display

    const response = await search(
      new Request("http://localhost/api/leaderboard/search?username=Rapture"),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      data: [{ ...scored, displayName: "Rapture" }],
    });
    expect(find).toHaveBeenNthCalledWith(2, {
      collection: "Players",
      where: { or: [{ userId: { like: "Rapture" } }, { userId: { in: [accountId] } }] },
      sort: "-score",
      overrideAccess: true,
    });
  });

  it("returns an error when search results cannot be retrieved", async () => {
    find.mockRejectedValue(new Error("database unavailable"));

    const response = await search(
      new Request("http://localhost/api/leaderboard/search?username=Rapture"),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: "Failed to retrieve search results",
    });
  });
});
