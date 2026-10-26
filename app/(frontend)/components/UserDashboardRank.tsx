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
        fontSize: "clamp(3rem, 14vw, 6rem)",
      }}
    >
      {children}
    </h1>
  );
}

export function LeaderboardBox({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div
      className="relative flex min-h-14 items-center justify-between border border-red-600 px-10 py-3 sm:min-h-20 sm:px-12 sm:py-6"
      style={{
        borderColor: colorToRgba("#a82a2a", 0.8),
        backgroundColor: "#000000",
      }}
    >
      <div className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-red-600" />
      <div className="pointer-events-none absolute bottom-0 right-6 top-0 w-px bg-red-600" />
      <span
        className="relative z-10 min-w-0 truncate text-[9px] uppercase tracking-[0.12em] sm:text-xs"
        style={{ color: colorToRgba("#ffffff", 0.5) }}
      >
        {entry.name}
      </span>
      <span
        className="relative z-10 shrink-0 text-xs font-black italic sm:text-sm"
        style={{ color: "#e35b5b", letterSpacing: "-0.03em" }}
      >
        {entry.score}
      </span>
    </div>
  );
}

export function RankTabContent({ userRank = 1 }: { userRank?: number }) {
  return (
    <div className="relative flex h-[430px] flex-none overflow-visible border-2 border-[#8A0000] bg-[#FF000030] p-3 sm:h-[500px] sm:p-8">
      <div className="absolute inset-x-4 bottom-8 top-8 flex flex-col border-x-2 border-y-[10px] border-[#8A0000] bg-black p-3 sm:inset-x-10 sm:bottom-14 sm:top-14 sm:border-x-4 sm:border-y-[15px] sm:p-8">
        <div className="absolute left-1/2 top-[-1rem] z-10 flex w-[92%] -translate-x-1/2 flex-col items-end sm:top-[-3rem] sm:w-[82%]">
          <Image
            src="/VITROL-RANK.png"
            width={350}
            height={10}
            alt="Vitriol Rank Text"
            className="h-auto w-[86%] sm:w-full"
            style={{ height: "auto" }}
          />
          <ItalicTitle className="mr-[8%] mt-5 block text-right leading-[0.85] sm:mr-[6%] sm:mt-8">
            #{String(userRank).padStart(3, "0")}
          </ItalicTitle>
        </div>

        <div className="absolute left-3 top-[12%] z-20 flex w-[72%] flex-col sm:left-4 sm:top-[18%] sm:w-[55%]">
          <div className="relative mb-2 self-start sm:mb-3">
            <svg
              viewBox="0 0 250 70"
              className="h-10 w-[180px] sm:h-20 sm:w-[290px]"
              preserveAspectRatio="none"
            >
              <polygon
                points="10,0 250,0 240,35 190,66 0,66"
                fill="#080101"
                fillOpacity="1"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-start pl-7 text-lg font-bold italic tracking-[0.2em] text-white sm:pl-12 sm:text-3xl">
              RANK
            </span>
          </div>

          {/* Three boxes flowing downward beneath the RANK label */}
          <div className="mt-2 flex flex-col gap-2 sm:mt-0">
            {leaderboardTest.map((entry) => (
              <LeaderboardBox key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
