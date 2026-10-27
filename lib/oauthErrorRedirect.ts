import type { Endpoint, PayloadRequest, Plugin } from "payload";
import { OAUTH_INTENT_COOKIE } from "./oauthIntent";
import type { OAuthLoginErrorCode } from "./oauthLoginErrors";

// The route payload-auth-plugin registers for both legs of Google sign-in (start + callback)
const OAUTH_ENDPOINT_PATH = "/app/oauth/:resource/:provider";
const CLEAR_INTENT_COOKIE = `${OAUTH_INTENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;

function readCookie(req: PayloadRequest, name: string): string | null {
  for (const part of (req.headers.get("cookie") ?? "").split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return null;
}

/** The id of the user the plugin just logged in, read from the session cookie it set (a JWT). */
function loggedInUserId(res: Response, cookiePrefix: string): string | null {
  for (const cookie of res.headers.getSetCookie()) {
    const match = new RegExp(`^${cookiePrefix}-token=([^;]+)`).exec(cookie);
    if (!match) continue;
    try {
      const claims = JSON.parse(Buffer.from(match[1].split(".")[1], "base64url").toString());
      return claims.id != null ? String(claims.id) : null;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * The plugin signs up any unknown Google account automatically. From the login page that isn't
 * wanted, so if this sign-in just created the account, delete it again (and its Google link).
 */
async function undoNewAccount(req: PayloadRequest, res: Response, startedAt: number): Promise<boolean> {
  const id = loggedInUserId(res, req.payload.config.cookiePrefix);
  if (!id) return false;

  const user = await req.payload.findByID({
    collection: "users",
    id,
    depth: 0,
    overrideAccess: true,
    disableErrors: true,
  });
  // Allow a little clock slack; an existing account was created long before this request
  if (!user?.createdAt || Date.parse(user.createdAt) < startedAt - 5000) return false;

  await req.payload.delete({ collection: "accounts", where: { user: { equals: id } }, overrideAccess: true });
  await req.payload.delete({ collection: "users", id, overrideAccess: true });
  return true;
}

/**
 * Wraps payload-auth-plugin's Google endpoint so that:
 * - from the signup page (intent cookie set), a new Google account is created as normal;
 * - from the login page, an unknown Google account is refused with "User not found";
 * - any failure sends the visitor back to /login or /signup with an ?error= code,
 *   instead of the plugin's raw JSON error.
 * Must be listed after authPlugin in the config's plugins.
 */
export function redirectOAuthErrorsToLogin(serverURL: string): Plugin {
  const redirect = (path: "/login" | "/signup", code: OAuthLoginErrorCode) =>
    new Response(null, {
      status: 302,
      headers: {
        Location: new URL(`${path}?error=${code}`, serverURL).toString(),
        "Set-Cookie": CLEAR_INTENT_COOKIE,
      },
    });

  return (config) => ({
    ...config,
    endpoints: (config.endpoints ?? []).map((endpoint): Endpoint => {
      if (endpoint.path !== OAUTH_ENDPOINT_PATH) return endpoint;

      return {
        ...endpoint,
        handler: async (req) => {
          const isCallback = req.routeParams?.resource === "callback";
          const signingUp = isCallback && readCookie(req, OAUTH_INTENT_COOKIE) === "signup";
          const backTo = signingUp ? "/signup" : "/login";
          const startedAt = Date.now();

          try {
            const res = await endpoint.handler(req);

            if (res.status >= 400) {
              const body = (await res.clone().json().catch(() => null)) as { kind?: string } | null;
              if (body?.kind === "NotFound") {
                // Login: no account. Signup: the plugin won't link an existing email/password account.
                return redirect(backTo, signingUp ? "google_account_exists" : "google_no_account");
              }
              return redirect(backTo, "google_failed");
            }

            if (isCallback && !signingUp && (await undoNewAccount(req, res, startedAt))) {
              return redirect("/login", "google_no_account");
            }

            if (isCallback) res.headers.append("Set-Cookie", CLEAR_INTENT_COOKIE);
            return res;
          } catch (err) {
            req.payload.logger.error({ err }, "Google sign-in failed");
            return redirect(backTo, "google_failed");
          }
        },
      };
    }),
  });
}
