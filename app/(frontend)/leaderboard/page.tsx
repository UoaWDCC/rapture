import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import LeaderboardClient from "./leaderboardClient";

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

      <div className="flex flex-col w-full max-w-2xl gap-6">
        <LeaderboardClient topPlayers={topPlayers.docs} />
      </div>
      
    </div>
  )
}