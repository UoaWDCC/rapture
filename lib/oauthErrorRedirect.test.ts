import { describe, expect, it, vi } from "vitest";
import type { Config, Endpoint, PayloadRequest } from "payload";
import { redirectOAuthErrorsToLogin } from "./oauthErrorRedirect";
import { getOAuthLoginError } from "./oauthLoginErrors";

const SERVER = "http://localhost:3000";
const NOW = Date.now();

/** A fake session cookie like the one the plugin sets: a JWT whose claims hold the user id. */
const sessionFor = (id: string) =>
  `payload-token=x.${Buffer.from(JSON.stringify({ id })).toString("base64url")}.sig; Path=/; HttpOnly`;

function signedIn(id: string) {
  const headers = new Headers({ Location: `${SERVER}/` });
  headers.append("Set-Cookie", sessionFor(id));
  return new Response(null, { status: 302, headers });
}

function setup(handler: Endpoint["handler"], opts: { signup?: boolean; createdAt?: string } = {}) {
  const payload = {
    config: { cookiePrefix: "payload" },
    logger: { error: vi.fn() },
    findByID: vi.fn().mockResolvedValue(opts.createdAt ? { id: "u1", createdAt: opts.createdAt } : null),
    delete: vi.fn().mockResolvedValue({}),
  };
  const req = {
    payload,
    routeParams: { resource: "callback", provider: "google" },
    headers: new Headers(opts.signup ? { cookie: "other=1; rapture_oauth_intent=signup" } : {}),
  } as unknown as PayloadRequest;
  const config = redirectOAuthErrorsToLogin(SERVER)({
    endpoints: [{ path: "/app/oauth/:resource/:provider", method: "get", handler }],
  } as Config) as Config;
  return { run: () => config.endpoints![0].handler(req), payload };
}

const notFound = async () =>
  Response.json({ message: "User not found", kind: "NotFound", data: null, isSuccess: false, isError: true }, { status: 404 });

describe("Google sign-in wrapper", () => {
  it("login with an unknown Google account goes back to /login with google_no_account", async () => {
    const res = await setup(notFound).run();
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(`${SERVER}/login?error=google_no_account`);
  });

  it("signup that hits an existing email account goes back to /signup with google_account_exists", async () => {
    const res = await setup(notFound, { signup: true }).run();
    expect(res.headers.get("location")).toBe(`${SERVER}/signup?error=google_account_exists`);
  });

  it("login that the plugin auto-signed-up is undone and refused", async () => {
    const { run, payload } = setup(async () => signedIn("u1"), { createdAt: new Date(NOW).toISOString() });
    const res = await run();
    expect(res.headers.get("location")).toBe(`${SERVER}/login?error=google_no_account`);
    expect(payload.delete).toHaveBeenCalledWith(expect.objectContaining({ collection: "users", id: "u1" }));
    expect(payload.delete).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "accounts", where: { user: { equals: "u1" } } }),
    );
  });

  it("login with an existing account goes through untouched", async () => {
    const ok = signedIn("u1");
    const { run, payload } = setup(async () => ok, { createdAt: "2026-01-01T00:00:00.000Z" });
    expect(await run()).toBe(ok);
    expect(payload.delete).not.toHaveBeenCalled();
  });

  it("signup creates the account and clears the signup cookie", async () => {
    const ok = signedIn("u1");
    const { run, payload } = setup(async () => ok, { signup: true, createdAt: new Date(NOW).toISOString() });
    const res = await run();
    expect(res).toBe(ok);
    expect(payload.delete).not.toHaveBeenCalled();
    expect(res.headers.getSetCookie().some((c) => c.startsWith("rapture_oauth_intent=;"))).toBe(true);
  });

  it("any other failure, returned or thrown, becomes google_failed", async () => {
    const returned = await setup(async () => Response.json({ kind: "InternalServerError" }, { status: 500 })).run();
    const thrown = await setup(async () => {
      throw new Error("Missing or invalid session");
    }).run();
    expect(returned.headers.get("location")).toBe(`${SERVER}/login?error=google_failed`);
    expect(thrown.headers.get("location")).toBe(`${SERVER}/login?error=google_failed`);
  });
});

describe("getOAuthLoginError", () => {
  it("maps known codes and ignores anything else", () => {
    expect(getOAuthLoginError("google_no_account")).toBe("User not found");
    expect(getOAuthLoginError("google_account_exists")).toMatch(/already exists/);
    expect(getOAuthLoginError("Your account is locked, call us")).toBe("");
    expect(getOAuthLoginError(null)).toBe("");
  });
});
