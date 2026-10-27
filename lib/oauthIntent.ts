/**
 * Google sign-in is one flow for both buttons, so the signup page leaves a short-lived cookie
 * before going to Google. When Google sends the visitor back, the server reads it to know
 * whether a brand-new account should be created (signup) or refused (login).
 */
export const OAUTH_INTENT_COOKIE = "rapture_oauth_intent";

/** Call right before starting Google sign-in from the signup page. */
export function rememberGoogleSignup() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // Lax still sends it when Google redirects back; 10 minutes is plenty to finish signing in
  document.cookie = `${OAUTH_INTENT_COOKIE}=signup; Max-Age=600; Path=/; SameSite=Lax${secure}`;
}

/** Call right before starting Google sign-in from the login page, so a leftover signup cookie is ignored. */
export function forgetGoogleSignup() {
  document.cookie = `${OAUTH_INTENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
}
