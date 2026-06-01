"use client";

import { useState } from "react";
import { Player } from "@/payload-types";
import LeaderboardSearch from "./leaderboardSearch";
import PlayerRowDisplay from "./playerRowDisplay";

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
            <LeaderboardSearch onSearch={handleSearch}/>
            {results.map((player, index) => (
                <PlayerRowDisplay key={player.userId} player={player} rank={index + 1} />
            ))}
        </div>
    )
}