import { Player } from "@/payload-types";

export default function playerRowDisplay({
  player,
  rank,
}: {
  player: Player;
  rank: number;
}) {
  return (
    <div className="flex flex-row gap-5 bg-black text-white rounded-lg text-xl p-3 mb-2 justify-between items-center w-full max-w-md">
      <div className="flex gap-4">
        <span className="text-slate-400 font-bold">#{rank}</span>
        <h1>{player.userId || "Unknown Player"}</h1>
      </div>
      <h2 className="text-emerald-400 font-bold">{player.score}</h2>
    </div>
  );
}