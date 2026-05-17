'use client'

import Link from 'next/link'
import { NewsPost } from '../mockData'

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link href={`/news/${post.id}`} className="no-underline block h-full">
      <div className="overflow-hidden h-full cursor-pointer transition-all hover:opacity-60">

        {/* Image placeholder */}
        <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center">
        </div>

        <div className="py-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] text-gray-400">{post.date}</span>
          </div>
          <p className="text-sm font-medium text-[#1a1a1a] leading-snug mb-1.5">
            {post.title}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-2.5 line-clamp-2">
            {post.description}
          </p>
          <span className="text-xs font-medium">Read More</span>
        </div>
      </div>
    </Link>
  )
}