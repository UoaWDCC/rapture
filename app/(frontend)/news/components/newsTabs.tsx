"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed"
import type { News, Category } from "@/payload-types"

export default function NewsTabs({
    allNews,
    categories,
}: {
    allNews: News[];
    categories: Category[];
}) {
    const [activeTab, setActiveTab] = useState("All");
    const filteredNews = 
        activeTab === "All"
            ? allNews
            : allNews.filter((news) =>
                news.category.some(
                    (cat) =>
                        typeof cat !== "string" &&
                        cat.name === activeTab
                )
            );
    
    return (
        <div className="my-10">
            <div>
                <button 
                    onClick={() => setActiveTab("All")}
                    className={`p-4 border ${
                        activeTab === "All"
                            ? "text-red-500"
                            : "text-white"
                    }`}>All
                </button>
                {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setActiveTab(cat.name)}
                        className={`p-4 border ${
                            activeTab === cat.name
                                ? "text-red-500"
                                : "text-white"
                        }`}>{cat.name}
                    </button>
                ))}
            </div>

            <div>
                {filteredNews.map((item) => (
                    <NewsFeed key={item.id} news={item} />
                ))}
            </div>
        </div>
    )
}