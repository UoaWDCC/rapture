import { getPayload } from 'payload'
import config from '@payload-config'
import { LeaderboardTable } from '../components/ui/LeaderboardTable' 
import Link from 'next/link'
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

      <div className="flex flex-col w-full items-center">
        <LeaderboardTable 
          players={topPlayers.docs.length > 0 ? topPlayers.docs : [
            { id: '1', userId: 'wolfeyvgc', score: 9999, updatedAt: '', createdAt: '' },
            { id: '2', userId: 'Player 2', score: 8500, updatedAt: '', createdAt: '' },
            { id: '3', userId: 'Player 3', score: 7200, updatedAt: '', createdAt: '' },
            { id: '4', userId: 'Player 4', score: 6800, updatedAt: '', createdAt: '' },
            { id: '5', userId: 'Player 5', score: 6500, updatedAt: '', createdAt: '' },
          ]} 
        />
      </div>
    </div>
  )
}