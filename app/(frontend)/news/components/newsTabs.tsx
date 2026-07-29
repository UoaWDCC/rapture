"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed";
import type { News, Category } from "@/payload-types";

export default function NewsTabs({
  allNews,
  categories,
  expandedArticleId,
}: {
  allNews: News[];
  categories: Category[];
  expandedArticleId?: string | null;
}) {
  const [activeTab, setActiveTab] = useState("All");

  const initialNews = expandedArticleId
  ? allNews.find((n) => String(n.id) === expandedArticleId) ?? null
  : null;

  const [expandedId, setExpandedId] = useState<string | null>(
    initialNews?.id ? String(initialNews.id) : null
  );

  const filteredNews =
    activeTab === "All"
      ? allNews
      : allNews.filter((news) =>
          news.category.some(
            (cat) => typeof cat !== "string" && cat.name === activeTab,
          ),
        );

  return (
    <div className="my-7.5">
      {/*Category tabs navigation*/}
      <div>
        {/*Created a special 'All News' category (not in Figma (?))*/}
        <button
          onClick={() => setActiveTab("All")}
          className={`p-[2%] text-[#E2E2E2] rounded-t-2xl mr-[0.5%] ${
            activeTab ===
            "All" /*hover is only available if it's not the active tab*/
              ? "bg-[#DDA520]/80"
              : "bg-[#DDA520]/60 hover:opacity-60 hover:cursor-pointer"
          }`}
        >
          All
        </button>

        {/*All the other categories*/}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.name)}
            className={`p-[2%] text-[#E2E2E2] rounded-t-2xl mr-[0.5%] ${
              activeTab ===
              cat.name /*hover is only available if it's not the active tab*/
                ? "bg-[#DDA520]/80"
                : "bg-[#DDA520]/60 hover:opacity-60 hover:cursor-pointer"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/*News of that category displayed*/}
      <div>
        {filteredNews.map((item) => (
          <NewsFeed
            key={item.id}
            news={item}
            onReadMore={() => setExpandedId(expandedId === String(item.id) ? null : String(item.id))}
            isExpanded={expandedId === String(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
