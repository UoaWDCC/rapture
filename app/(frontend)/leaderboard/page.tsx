import { getPayload } from 'payload'
import config from '@payload-config'
import PlayerRowDisplay from './playerRowDisplay' 
import Link from 'next/link'
import LeaderBoardSearch from './leaderboardSearch';
export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() { //api part
  const payload = await getPayload({ config })
  const topPlayers = await payload.find({
    collection: 'Players', 
    sort: '-score',        
    limit: 10,             
  })

  return ( //no styles.css file, can delete and change this whenever, just a placeholder
    <div className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Top 10 Leaderboard</h1>
      <Link href="/" className="mb-4 text-blue-500 hover:underline">Go back to Main Page</Link>

      <div className="flex flex-row w-full max-w-2xl gap-6">
        {topPlayers.docs.map((player, index) => (
          <PlayerRowDisplay //separate element used for ui design
            key={player.id} 
            player={player} 
            rank={index + 1} 
          />
        ))}

        <div className="w-full max-w-2xl flex justify-end">
          <LeaderBoardSearch />
        </div>

      </div>
    </div>
  )
}