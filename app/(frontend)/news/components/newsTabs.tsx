"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed"
import type { News, Category } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function NewsTabs({
    allNews,
    categories,
}: {
    allNews: News[];
    categories: Category[];
}) {
    const [activeTab, setActiveTab] = useState("All");

    const [selectedNews, setSelectedNews] = useState<News | null>(null);

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
                    className={`p-4 border hover:cursor-pointer ${
                        activeTab === "All"
                            ? "text-red-500"
                            : "text-white"
                    }`}>All
                </button>
                {categories.map((cat) => (
                    <button key={cat.id}
                        onClick={() => setActiveTab(cat.name)}
                        className={`p-4 border hover:cursor-pointer ${
                            activeTab === cat.name
                                ? "text-red-500"
                                : "text-white"
                        }`}>{cat.name}
                    </button>
                ))}
            </div>

            <div>
                {filteredNews.map((item) => (
                    <NewsFeed key={item.id} news={item} onReadMore={() => setSelectedNews(item)} />
                ))}
            </div>

            {selectedNews && (
                <div className="fixed inset-0 z-50 bg-black">
                    <div className="w-[80%] p-10 overflow-y-auto">
                        <button onClick={() => setSelectedNews(null)} className="absolute top-5 right-5 hover:cursor-pointer">✘</button>
                        <h1>{selectedNews.title}</h1>
                        <hr/>
                        <br/>
                        <RichText data={selectedNews.description} />
                    </div>
                </div>
            )
            }
        </div>
    )
}