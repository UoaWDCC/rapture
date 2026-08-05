import { colorToRgba } from "@/lib/colour";

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};

export const leaderboardTest: LeaderboardEntry[] = [
  { id: "1", name: "Player One", score: 9840 },
  { id: "2", name: "Player Two", score: 8210 },
  { id: "3", name: "Player Three", score: 7655 },
];

export function LeaderboardRow({
  rank,
  entry,
}: {
  rank: number;
  entry: LeaderboardEntry;
}) {
  return (
    <div
      className="flex items-center border-b py-3"
      style={{ borderColor: colorToRgba("#a82a2a", 0.35) }}
    >
      <div
        className="w-20 flex-none border-r pr-3 mr-3 font-bold text-lg"
        style={{ borderColor: colorToRgba("#a82a2a", 0.35), color: "#e35b5b" }}
      >
        #{String(rank).padStart(3, "0")}
      </div>
      <div className="flex-1 text-emerald-50 text-sm">{entry.name}</div>
      <div className="text-sm font-semibold" style={{ color: "#e35b5b" }}>
        {entry.score.toLocaleString()}
      </div>
    </div>
  );
}

export function GlitchTitle({
  text,
  size,
  className = "",
}: {
  text: string;
  size: string;
  className?: string;
}) {
  return (
    <div
      className={`relative block italic font-black leading-none w-fit ${className}`}
      style={{ fontSize: size, fontFamily: "var(--font-nova-cut, inherit)" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          transform: "translate(4px, -3px)",
          color: "transparent",
          WebkitTextStroke: "2px rgba(255,43,43,0.55)",
        }}
      >
        {text}
      </span>
      <span
        className="relative"
        style={{ color: "#000000", WebkitTextStroke: "2px #ff2b2b" }}
      >
        {text}
      </span>
    </div>
  );
}
