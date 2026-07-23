import { getPayload } from 'payload'
import config from '@payload-config'
import LeaderboardClient from "./leaderboardClient";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const { page: pageParam, limit: limitParam } = await searchParams;
  
  const page = Number(pageParam ?? 1);
  const limit = Math.min(Number(limitParam ?? 10), 100);

  const payload = await getPayload({ config })
  const topPlayers = await payload.find({
    collection: 'Players', 
    sort: '-score',        
    limit,
    page,
  })

  return (
    <div className="p-6 bg font-sans flex flex-col items-center">
      <div className="flex flex-col w-full max-w-5xl h-200 gap-6 mb-25">
        <LeaderboardClient 
          topPlayers={topPlayers.docs}
          page={page}
          limit={limit}
          totalPages={topPlayers.totalPages}
          hasNextPage={topPlayers.hasNextPage}
          hasPrevPage={topPlayers.hasPrevPage}
        />
      </div>
    </div>
  )
}