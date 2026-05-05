import { notFound } from 'next/navigation'
import { NewsContent } from './components/NewsContent'
import { MOCK_POSTS } from '../mockData'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NewsContentPage({ params }: Props) {
  // TODO: Fetch Payload news post from id
  const { id } = await params
  const post = MOCK_POSTS.find(p => p.id === Number(id))

  if (!post) notFound()

  // TODO: Check if is admin

  const isAdmin = true // hardcoded for demo

  return <NewsContent post={post} isAdmin={isAdmin} />
}