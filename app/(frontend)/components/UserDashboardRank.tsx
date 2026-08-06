import { colorToRgba } from "@/lib/colour";
import { ReactNode } from "react";

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

export function ItalicTitle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode[] | ReactNode;
}) {
  return (
    <h1
      className={`block italic font-black leading-none font-nova ${className} `}
      style={{
        letterSpacing: "-0.06em",
        color: "black",
        WebkitTextStroke: "0.5px #ff2b2b",
      }}
    >
      {children}
    </h1>
  );
}

export function LeaderboardBox({
  rank,
  entry,
}: {
  rank: number;
  entry: LeaderboardEntry;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border"
      style={{
        borderColor: colorToRgba("#a82a2a", 0.5),
        backgroundColor: "#080101",
      }}
    >
      <span
        className="text-xs tracking-[0.12em] uppercase"
        style={{ color: colorToRgba("#ffffff", 0.5) }}
      >
        {entry.name}
      </span>
      <span
        className="text-sm italic font-black"
        style={{
          color: "#e35b5b",

          letterSpacing: "-0.03em",
        }}
      ></span>
    </div>
  );
}

export function RankTabContent({
  userRank = 1,
  userName = "VITRIOL",
}: {
  userRank?: number;
  userName?: string;
}) {
  return (
    <div
      className="border h-full"
      style={{
        borderColor: "#a82a2a",
        backgroundColor: "#1a0505",
      }}
    >
      {/* Left: RANK badge + leaderboard boxes */}
      <div className="flex flex-col justify-end p-6 gap-2 w-[42%] flex-none">
        {/* RANK badge */}
        <div
          className="self-start border px-5 py-1.5 mb-2"
          style={{
            borderColor: "#ffffff",
            transform: "skewX(-12deg)",
            clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
          }}
        >
          <span
            className="italic font-bold tracking-wide text-white text-sm block"
            style={{ transform: "skewX(12deg)" }}
          >
            RANK
          </span>
        </div>

        {leaderboardTest.map((entry, i) => (
          <LeaderboardBox key={entry.id} rank={i + 1} entry={entry} />
        ))}
      </div>

      {/* Right: title centered */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1 pr-6">
        <ItalicTitle className="text-2xl">Vitriol</ItalicTitle>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: "#a82a2a" }}
      />
    </div>
  );
}
