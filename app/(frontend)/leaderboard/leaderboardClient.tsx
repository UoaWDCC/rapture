"use client";

import { useState } from "react";
import { Player } from "@/payload-types";
import LeaderboardSearch from "./leaderboardSearch";
import { LeaderboardTable } from "./LeaderboardTable";
import { Pagination } from "./Pagination";

export default function LeaderboardClient({ topPlayers }: { topPlayers: Player[] }) {
    const [results, setResults] = useState<Player[]>(topPlayers);

    async function handleSearch(username: string) {
        const response = await fetch(`api/leaderboard/search?username=${username}`);
        const data = await response.json();

        if (data.success) {
            setResults(data.data);
        }
    }

    return (
        <div>
            <div>
                <h2 className="font-nova border-2 border-blue-900">Welcome to Studio Rapture Leaderboard</h2>
            </div>

            <LeaderboardSearch onSearch={handleSearch}/>
            <LeaderboardTable players={results}/>
        </div>
    )
}