"use client";

import { useState } from "react";

export default function SteamLink({ initialSteamId }: { initialSteamId: string | null }) {
  const [steamId, setSteamId] = useState<string | null>(initialSteamId);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function link(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/steam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ steamId: input }),
    });
    const json = await res.json();
    setBusy(false);
    if (res.ok) {
      setSteamId(json.data.steamId);
      setInput("");
    } else {
      setError(json.error ?? "Failed to link.");
    }
  }

  async function unlink() {
    setError("");
    setBusy(true);
    const res = await fetch("/api/steam", { method: "DELETE" });
    const json = await res.json();
    setBusy(false);
    if (res.ok) setSteamId(null);
    else setError(json.error ?? "Failed to unlink.");
  }

  return (
    <div className="flex flex-col items-center gap-3 mb-4 w-full max-w-sm">
      {steamId ? (
        <>
          <p>
            Linked Steam ID: <strong className="text-blue-500">{steamId}</strong>
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
        <form onSubmit={link} className="flex flex-col gap-2 w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SteamID64 (17 digits)"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Link Steam account
          </button>
        </form>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}