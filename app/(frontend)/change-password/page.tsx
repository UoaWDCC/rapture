"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthInput from "../components/auth/authInput";
import AuthButton from "../components/auth/authButton";
import AuthFormCard from "../components/auth/authFormCard";

/** Same rules as the signup/reset forms. Returns an error message, or "" if the password is OK. */
function checkPassword(password: string, confirmPassword: string): string {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\d/.test(password)) return "Password must contain a number.";
  if (!(/[a-z]/.test(password) && /[A-Z]/.test(password)))
    return "Password must contain both upper and lowercase characters.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}

// useSearchParams needs a Suspense boundary in the app router
export default function ChangePasswordPage() {
  return (
    <Suspense fallback={null}>
      <ChangePasswordContent />
    </Suspense>
  );
}

function ChangePasswordContent() {
  // The reset email links here as /change-password?token=...
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !token) return;
    setError("");

    const problem = checkPassword(password, confirmPassword);
    if (problem) {
      setError(problem);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        setError("This reset link is invalid or has expired. Please request a new one.");
        return;
      }
      // Payload logs the user in on a successful reset; refresh so the navbar picks that up
      router.refresh();
      router.push("/account");
    } catch {
      setError("Unable to reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="relative w-full max-w-[450px]">
        <AuthFormCard title="CHANGE PASSWORD" theme="green" titleSize="2.5rem" cardHeight="480px" titleAlign="center">
          {!token ? (
            <div className="flex flex-col gap-4 text-center font-mono text-white">
              <p>This page needs the link from your password reset email.</p>
              <Link href="/forgot-password" className="underline">
                Send me a reset link
              </Link>
            </div>
          ) : (
            <>
              {error && <p className="text-red-400 text-center font-mono">{error}</p>}
              <form onSubmit={handleContinue} className="flex flex-col gap-4">
                <label className="text-white font-mono text-xs">create new password</label>
                <AuthInput
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  theme="green"
                />
                <label className="text-white font-mono text-xs">confirm new password</label>
                <AuthInput
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  theme="green"
                />
                <div className="mt-4">
                  <AuthButton
                    type="submit"
                    label={loading ? "SAVING..." : "CONTINUE"}
                    onClick={() => {}}
                    theme="green"
                    font="display"
                  />
                </div>
              </form>
            </>
          )}
        </AuthFormCard>
      </div>
    </div>
  );
}
