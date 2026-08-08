"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed";

import type { News, Category } from "@/payload-types";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default function NewsTabs({
  allNews,
  expandedArticleId,
}: {
  allNews: News[];
  expandedArticleId?: string | null;
}) {
  const [activeTab, setActiveTab] = useState("All");

  const initialNews = expandedArticleId
    ? (allNews.find((n) => String(n.id) === expandedArticleId) ?? null)
    : null;

  const [expandedId, setExpandedId] = useState<string | null>(
    initialNews?.id ? String(initialNews.id) : null,
  );

  return (
    <div className="my-7.5">
      {/*All news displayed*/}
      <div>
        {allNews.length === 0 ? (
          /*No news; just a container display */
          <div className="w-full h-148.75 text-2xl bg-[#F2B423]/70 flex items-center justify-center p-3 text-center text-[#302F2F] font-[Nova_Cut]">
            <p>No news to display yet.</p>
          </div>
        ) : (
          allNews.map((item) => (
            <NewsFeed
              key={item.id}
              news={item}
              onReadMore={() =>
                setExpandedId(
                  expandedId === String(item.id) ? null : String(item.id),
                )
              }
              isExpanded={expandedId === String(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
