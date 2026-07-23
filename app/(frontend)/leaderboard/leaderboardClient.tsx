"use client";

import { useEffect, useState } from "react";
import { Player } from "@/payload-types";
import LeaderboardSearch from "./leaderboardSearch";
import { LeaderboardTable } from "./LeaderboardTable";
import { Pagination } from "./Pagination";
import Image from "next/image";

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
  const [results, setResults] = useState<Player[]>(topPlayers);

  useEffect(() => {
    setResults(topPlayers);
  }, [topPlayers]);

  async function handleSearch(username: string) {
    const response = await fetch(`/api/leaderboard/search?username=${username}`);
    const data = await response.json();
    if (data.success) {
      setResults(data.data);
    }
  }

  return (
    <div className="flex flex-col w-full font-nova">
        <div className="w-full p-3.5 flex justify-center items-center text-center border-2 border-brand-blue [text-shadow:0_0_10px_#6060ff,0_0_20px_#ffffff]">
            <h5>WELCOME TO STUDIO RAPTURE LEADERBOARD</h5>
        </div>

        <div className="h-15 w-full flex flex-row   gap-3 justify-between items-center">

            <div className="w-10/20 p-2 text-white bg-brand-blue [text-shadow:0_0_10px_#6060ff,0_0_20px_#ffffff]">
                <p>VITROL LEADERBOARD</p>
            </div>

            <Pagination 
                page={page}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
            />

            <div className="h-12/20 w-25 border-2 border-dotted border-brand-blue"></div>

            <div>
                <p className="text-xl text-brand-blue">VERS: ACT V</p>
            </div>
        </div>

        <div className="h-6 bg-brand-blue mb-3"></div>

        <div className="h-160 flex flex-row justify-between">
            <LeaderboardTable players={results} startIndex={(page - 1) * limit + 1}/>

            <div className="w-90 flex flex-col gap-2 justify-center ml-auto">
                <LeaderboardSearch onSearch={handleSearch} />

                <div className="h-full max-h-15/20 w-19/20 ml-auto border-2 border-dotted border-brand-blue">
                    <Image src={"/images/ad.png"} alt={"leaderboard ad"} width={220} height={134}/>
                </div>
            </div>
        </div>
    </div>
  );
}
