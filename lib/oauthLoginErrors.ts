/**
 * Error codes the Google sign-in flow can send back to /login or /signup as ?error=<code>.
 * Only these fixed codes go in the URL, never free text, so a crafted link
 * can't put arbitrary messages on the page.
 */
export const OAUTH_LOGIN_ERRORS = {
  google_no_account: "User not found",
  google_account_exists:
    "An account with this email already exists. Log in with your email and password instead.",
  google_failed: "Google sign-in failed. Please try again.",
} as const;

export type OAuthLoginErrorCode = keyof typeof OAUTH_LOGIN_ERRORS;

/** The message for an ?error= code, or "" if the code isn't one of ours. */
export function getOAuthLoginError(code: string | null): string {
  if (!code || !(code in OAUTH_LOGIN_ERRORS)) return "";
  return OAUTH_LOGIN_ERRORS[code as OAuthLoginErrorCode];
}
