/**
 * Helpers for carrying "where to go after login" through the auth pages
 * via URL params, e.g. /login?next=/news&intent=subscribe
 */

/** Actions that can be resumed after the user logs in. */
export const LOGIN_INTENTS = ["subscribe"] as const;
export type LoginIntent = (typeof LOGIN_INTENTS)[number];

type ParamsLike = { get(name: string): string | null };

function isLoginIntent(value: string | null): value is LoginIntent {
  return value !== null && (LOGIN_INTENTS as readonly string[]).includes(value);
}

/**
 * Only allow same-site relative paths. Blocks open redirects like
 * "https://evil.com", "//evil.com" and "/\evil.com".
 */
export function getSafeRedirectPath(next: string | null | undefined, fallback = "/"): string {
  if (!next) return fallback;
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

/** Builds the login URL that sends the user back to `returnTo` with an intent. */
export function buildLoginUrl(returnTo: string, intent?: LoginIntent): string {
  const params = new URLSearchParams({ next: getSafeRedirectPath(returnTo) });
  if (intent) params.set("intent", intent);
  return `/login?${params.toString()}`;
}

/** Keeps only the next/intent params (used to pass them between login and signup). */
export function getAuthRedirectQuery(params: ParamsLike): string {
  const out = new URLSearchParams();
  const next = params.get("next");
  const intent = params.get("intent");
  if (next) out.set("next", getSafeRedirectPath(next));
  if (isLoginIntent(intent)) out.set("intent", intent);
  const qs = out.toString();
  return qs ? `?${qs}` : "";
}

/** Where to send the user after a successful login. */
export function getPostLoginPath(params: ParamsLike, fallback = "/"): string {
  const path = getSafeRedirectPath(params.get("next"), fallback);
  const intent = params.get("intent");
  if (!isLoginIntent(intent)) return path;

  const url = new URL(path, "http://placeholder.local");
  url.searchParams.set("intent", intent);
  return `${url.pathname}${url.search}${url.hash}`;
}
