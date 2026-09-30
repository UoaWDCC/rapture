type SignupResult = "success" | "password-mismatch" | "request-failed";

export async function loginUser(
  email: string,
  password: string,
  request: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const response = await request("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function signupUser(
  email: string,
  password: string,
  confirmPassword: string,
  request: typeof fetch = fetch,
): Promise<SignupResult> {
  if (password !== confirmPassword) return "password-mismatch";

  try {
    const response = await request("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return response.ok ? "success" : "request-failed";
  } catch {
    return "request-failed";
  }
}