import { getPayload } from 'payload'
import config from '@payload-config'
import PlayerRowDisplay from './playerRowDisplay'
import Link from 'next/link'
import { Pagination } from '@/app/(frontend)/components/ui/Pagination';

export const dynamic = 'force-dynamic';
interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function LeaderboardPage({ searchParams }: PageProps) { //api part
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

  return ( //no styles.css file, can delete and change this whenever, just a placeholder
    <div className="p-8 font-sans flex flex-col items-center">

      <Pagination
        page={page}
        totalPages={topPlayers.totalPages}
        hasNextPage={topPlayers.hasNextPage}
        hasPrevPage={topPlayers.hasPrevPage}
      />

      <h1 className="text-3xl font-bold mb-6">Top 10 Leaderboard</h1>
      <Link href="/" className="mb-4 text-blue-500 hover:underline">Go back to Main Page</Link>

      <div className="flex flex-col w-full items-center">
        {topPlayers.docs.map((player, index) => (
          <PlayerRowDisplay //separate element used for ui design
            key={player.id}
            player={player}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  )
}