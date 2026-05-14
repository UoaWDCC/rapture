import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";
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

  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const isAdmin = user?.role === "admin";

  return <NewsContent post={post} isAdmin={isAdmin} />
}