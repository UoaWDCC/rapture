"use client";
import { useState } from "react";
import Link from "next/link";
import AuthInput from "../components/auth/authInput";
import AuthButton from "../components/auth/authButton";
import AuthFormCard from "../components/auth/authFormCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      // Payload emails a link to /change-password?token=... (see auth.forgotPassword in collections/users.tsx).
      // It answers the same way whether or not the email has an account, so we don't reveal who is registered.
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        setError("We couldn't send the reset email. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Unable to reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="relative w-full max-w-[450px]">
        <AuthFormCard title="FORGOT PASSWORD" theme="green" titleSize="2.5rem" cardHeight="480px" titleAlign="center">
          {sent ? (
            <div className="flex flex-col gap-4 text-center font-mono text-white">
              <p>
                If an account exists for <span className="break-all">{email.trim()}</span>, we&apos;ve sent a link to
                reset your password. Check your inbox (and spam folder).
              </p>
              <Link href="/login" className="underline">
                Back to login
              </Link>
            </div>
          ) : (
            <>
              {error && <p className="text-red-400 text-center font-mono">{error}</p>}
              <form onSubmit={handleContinue} className="flex flex-col gap-4">
                <label className="text-white font-mono text-xs">EMAIL</label>
                <AuthInput
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  theme="green"
                />
                <div className="mt-4">
                  <AuthButton
                    type="submit"
                    label={loading ? "SENDING..." : "SEND RESET LINK"}
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
