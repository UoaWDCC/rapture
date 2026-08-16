//Steam linking widget, simple and dumb
"use client";

import { useState } from "react";

const MESSAGES: Record<string, string> = {
  linked: "Steam account linked.",
  already_linked: "Your account is already linked to a Steam account.",
  duplicate: "That Steam account is already linked to another user.",
  invalid: "Steam returned an invalid ID. Please try again.",
  error: "Steam sign-in failed. Please try again.",
};

export default function SteamLink({
  initialSteamId,
  status,
}: {
  initialSteamId: string | null;
  status?: string;
}) {
  const [steamId, setSteamId] = useState<string | null>(initialSteamId);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function unlink() {
    setError("");
    setBusy(true);
    const res = await fetch("/api/steam", { method: "DELETE" });
    setBusy(false);
    if (res.ok) setSteamId(null);
    else setError("Failed to unlink.");
  }

  return (
    <div className="flex flex-col items-center gap-3 mb-4 w-full max-w-sm">
      {steamId ? (
        <>
          <p>
            Linked Steam ID:{" "}
            <strong className="text-blue-500">{steamId}</strong>
          </p>
          <button
            onClick={unlink}
            disabled={busy}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Unlink
          </button>
        </>
      ) : (
        <a
          href="/api/steam/login"
          className="px-4 py-2 border rounded bg-black text-white hover:opacity-90"
        >
          Sign in through Steam
        </a>
      )}
      {status && MESSAGES[status] && (
        <p className="text-gray-600">{MESSAGES[status]}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
