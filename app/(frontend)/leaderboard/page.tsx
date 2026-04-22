import { getPayload } from 'payload'
import config from '@payload-config'
import PlayerRowDisplay from './playerRowDisplay' 

export default async function LeaderboardPage() {
  const payload = await getPayload({ config })
  const topPlayers = await payload.find({
    collection: 'Players', 
    sort: '-score',        
    limit: 10,             
  })

  return (
    <div className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Top 10 Leaderboard</h1>
      
      <div className="flex flex-col w-full items-center">
        {topPlayers.docs.map((player, index) => (
          <PlayerRowDisplay 
            key={player.id} 
            player={player} 
            rank={index + 1} 
          />
        ))}
      </div>
    </div>
  )
}