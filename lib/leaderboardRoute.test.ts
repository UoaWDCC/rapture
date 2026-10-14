import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPayload } from "payload";

vi.mock("payload", () => ({
  getPayload: vi.fn(),
}));

vi.mock("@/payload.config", () => ({
  default: {},
}));

import { POST } from "../app/(payload)/api/leaderboard/route";

describe("leaderboard score submission", () => {
  const mockPayload = {
    auth: vi.fn(),
    find: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  } as {
    auth: ReturnType<typeof vi.fn>;
    find: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.mocked(getPayload).mockResolvedValue(mockPayload as never);
    mockPayload.auth.mockReset();
    mockPayload.find.mockReset();
    mockPayload.create.mockReset();
    mockPayload.update.mockReset();
  });

  it("rejects anonymous submissions", async () => {
    mockPayload.auth.mockResolvedValue({ user: null });

    const response = await POST(new Request("http://localhost/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ score: 100 }),
    }));

    expect(response.status).toBe(401);
    expect(mockPayload.create).not.toHaveBeenCalled();
    expect(mockPayload.update).not.toHaveBeenCalled();
  });

  it("allows a logged in user to create their own leaderboard entry", async () => {
    mockPayload.auth.mockResolvedValue({ user: { id: "user-42" } });
    mockPayload.find.mockResolvedValue({ docs: [] });
    mockPayload.create.mockResolvedValue({ id: "entry-123", userId: "user-42", score: 250 });

    const response = await POST(new Request("http://localhost/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ score: 250 }),
    }));

    expect(response.status).toBe(201);
    expect(mockPayload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "Players",
        data: { userId: "user-42", score: 250 },
      }),
    );
  });

  it("prevents a logged in user from submitting a score for another user", async () => {
    mockPayload.auth.mockResolvedValue({ user: { id: "user-42" } });

    const response = await POST(new Request("http://localhost/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ userId: "user-99", score: 999 }),
    }));

    expect(response.status).toBe(403);
    expect(mockPayload.create).not.toHaveBeenCalled();
    expect(mockPayload.update).not.toHaveBeenCalled();
  });

  it("updates the existing leaderboard entry instead of creating a duplicate", async () => {
    mockPayload.auth.mockResolvedValue({ user: { id: "user-42" } });
    mockPayload.find.mockResolvedValue({
      docs: [{ id: "entry-123", userId: "user-42", score: 150 }],
    });
    mockPayload.update.mockResolvedValue({ id: "entry-123", userId: "user-42", score: 425 });

    const response = await POST(new Request("http://localhost/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ score: 425 }),
    }));

    expect(response.status).toBe(200);
    expect(mockPayload.update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "Players",
        id: "entry-123",
        data: { userId: "user-42", score: 425 },
      }),
    );
    expect(mockPayload.create).not.toHaveBeenCalled();
  });
});
