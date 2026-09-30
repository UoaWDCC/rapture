import { describe, expect, it, vi } from "vitest";
import { loginUser, signupUser } from "@/lib/auth";

describe("loginUser", () => {
  it("posts the credentials to the login endpoint", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue({ ok: true } as Response);

    expect(await loginUser("player@example.com", "secret", request)).toBe(true);
    expect(request).toHaveBeenCalledWith("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "player@example.com", password: "secret" }),
    });
  });

  it("returns false when the login endpoint rejects the credentials", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response);

    expect(await loginUser("player@example.com", "wrong", request)).toBe(false);
  });

  it("returns false when the login request fails", async () => {
    const request = vi.fn<typeof fetch>().mockRejectedValue(new Error("Network error"));

    expect(await loginUser("player@example.com", "secret", request)).toBe(false);
  });
});

describe("signupUser", () => {
  it("creates an account with the submitted credentials", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue({ ok: true } as Response);

    expect(
      await signupUser("player@example.com", "secret", "secret", request),
    ).toBe("success");
    expect(request).toHaveBeenCalledWith("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "player@example.com", password: "secret" }),
    });
  });

  it("does not create an account when the passwords differ", async () => {
    const request = vi.fn<typeof fetch>();

    expect(
      await signupUser("player@example.com", "secret", "different", request),
    ).toBe("password-mismatch");
    expect(request).not.toHaveBeenCalled();
  });

  it("reports a rejected account creation", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response);

    expect(
      await signupUser("player@example.com", "secret", "secret", request),
    ).toBe("request-failed");
  });

  it("reports a failed account creation request", async () => {
    const request = vi.fn<typeof fetch>().mockRejectedValue(new Error("Network error"));

    expect(
      await signupUser("player@example.com", "secret", "secret", request),
    ).toBe("request-failed");
  });
});
