import { colorToRgba } from "@/lib/colour";
import Image from "next/image";
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
        fontSize: "4.5rem",
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
      className="flex items-center justify-between px-4 py-5 border -mt-px"
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
        style={{ color: "#e35b5b", letterSpacing: "-0.03em" }}
      >
        {entry.score}
      </span>
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
    <div className="relative h-full bg-[#FF000030]  border-[#8A0000] border-3">
      <div className="absolute inset-0 m-auto h-[60%] w-[80%] bg-black border-t-15 border-b-15 border-l-5 border-r-5 border-[#8A0000] ">
        {/* Title block — anchored to the top-right of this box */}
        <div className="absolute top-10 right-0 z-10 flex flex-col items-end -mt-20 mr-10">
          <Image
            src="/VITROL-RANK.png"
            width={350}
            height={10}
            alt="Vitriol Rank Text"
          />
          <ItalicTitle className="text-5xl leading-[0.85] block mt-1 text-right mr-30">
            #{String(userRank).padStart(3, "0")}
          </ItalicTitle>
        </div>

        {/* Content column: RANK badge + stacked boxes, sits mid-left */}
        <div className="absolute left-6 top-[38%] flex flex-col w-[42%]">
          {/* RANK badge */}
          <div className="relative self-start mb-3">
            <svg
              viewBox="0 0 220 70"
              className="h-16 w-[220px]"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 208,0 208,35 180,66 0,66"
                fill="#080101"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-start pl-6 italic font-bold tracking-[0.2em] text-white text-base">
              RANK
            </span>
          </div>

          {/* Three boxes flowing downward beneath the RANK label */}
          <div className="flex flex-col">
            {leaderboardTest.map((entry, i) => (
              <LeaderboardBox key={entry.id} rank={i + 1} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
