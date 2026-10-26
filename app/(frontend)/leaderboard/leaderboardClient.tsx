"use client";

import { useState } from "react";
import { Player } from "@/payload-types";
import LeaderboardSearch from "./leaderboardSearch";
import { LeaderboardTable } from "./LeaderboardTable";
import { Pagination } from "./Pagination";
import Image from "next/image";
import GlitchReveal from "../components/GlitchReveal"

export default function LeaderboardClient({ 
  topPlayers,
  page,
  limit,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: { 
  topPlayers: Player[];
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  const [searchResults, setSearchResults] = useState<Player[] | null>(null);
  const results = searchResults ?? topPlayers;

  async function handleSearch(username: string) {
    const response = await fetch(`/api/leaderboard/search?username=${username}`);
    const data = await response.json();
    if (data.success) {
      setSearchResults(data.data);
    }
  }

  return (
    <div className="flex w-full flex-col px-2 pb-6 font-nova sm:px-3 md:px-0">
      <GlitchReveal delay={0.5}>
        <div className="w-full border-2 border-brand-blue p-3.5 text-center text-xl [text-shadow:0_0_10px_#6060ff,0_0_20px_#ffffff] md:p-4">
          <h5 className="text-[clamp(1.1rem,2.3vw,2rem)] leading-tight tracking-[0.06em] uppercase">
            WELCOME TO STUDIO RAPTURE LEADERBOARD
          </h5>
        </div>
      </GlitchReveal>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <GlitchReveal delay={1.2}>
          <div className="mt-4 flex h-15 w-full flex-row items-center justify-between gap-3">
            <div className="w-10/20 bg-brand-blue p-2 text-xl text-white">
              <p className="hidden md:block">VITROL LEADERBOARD</p>
              <p className="block md:hidden">VITROL</p>
            </div>
            <Pagination page={page} totalPages={totalPages} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
            <div className="h-11 w-25 rounded-xs border-2 border-dashed border-brand-blue"></div>
            <div><p className="text-xl text-brand-blue">VERS: ACT V</p></div>
          </div>
        </GlitchReveal>

        <div className="mb-3 mt-3 h-6 bg-brand-blue"></div>

        <div className="flex h-159 flex-row justify-between">
          <LeaderboardTable players={results} startIndex={(page - 1) * limit + 1} />
          <div className="ml-auto flex w-90 flex-col justify-center gap-2">
            <LeaderboardSearch onSearch={handleSearch} />
            <div className="relative ml-auto h-full max-h-15/20 w-full max-w-[250px] overflow-hidden rounded-xs border-2 border-dashed border-brand-blue">
              <Image src={"/images/ad.png"} alt={"leaderboard ad"} fill className="object-cover"/>
              <div className="absolute inset-x-20 bottom-70 left-25 bg-black/40 py-1 text-4xl text-white">GET YOURS TODAY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="mt-4 flex w-full flex-col gap-3 md:hidden">
        <GlitchReveal delay={1.2}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1 bg-brand-blue px-3 py-2 text-white">
              <p className="hidden truncate text-[clamp(1.1rem,5vw,1.8rem)] leading-none uppercase md:block">VITROL LEADERBOARD</p>
              <p className="block truncate text-[clamp(1.1rem,5vw,1.8rem)] leading-none uppercase md:hidden">VITROL</p>
            </div>
            <div className="shrink-0">
              <Pagination page={page} totalPages={totalPages} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
            </div>
          </div>
        </GlitchReveal>

        <div className="w-full">
          <LeaderboardSearch onSearch={handleSearch} />
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <LeaderboardTable players={results} startIndex={(page - 1) * limit + 1} />
        </div>
      </div>
    </div>
  );
}
