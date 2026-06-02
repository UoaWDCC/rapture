"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed"
import type { News, Category } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from 'next/image'

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
        <div className="my-7.5">
            {/*Category tabs navigation*/}
            <div>
                {/*Created a special 'All News' category (not in Figma (?))*/}
                <button 
                    onClick={() => setActiveTab("All")}
                    className={`p-[2%] text-[#E2E2E2] rounded-t-2xl mr-[0.5%] ${
                        activeTab === "All" /*hover is only available if it's not the active tab*/
                            ? "bg-[#DDA520]/80"
                            : "bg-[#DDA520]/60 hover:opacity-60 hover:cursor-pointer"
                    }`}>All
                </button>

                {/*All the other categories*/}
                {categories.map((cat) => (
                    <button key={cat.id}
                        onClick={() => setActiveTab(cat.name)}
                        className={`p-[2%] text-[#E2E2E2] rounded-t-2xl mr-[0.5%] ${
                            activeTab === cat.name /*hover is only available if it's not the active tab*/
                                ? "bg-[#DDA520]/80"
                                : "bg-[#DDA520]/60 hover:opacity-60 hover:cursor-pointer"
                        }`}>{cat.name}
                    </button>
                ))}
            </div>

            {/*News of that category displayed*/}
            <div>
                {filteredNews.map((item) => (
                    <NewsFeed key={item.id} news={item} onReadMore={() => setSelectedNews(item)} />
                ))}
            </div>

            {/*Read More Expanded*/}
            {selectedNews && (
                <div className="fixed inset-0 z-50 bg-black bg-[url('/PROP%20%232%201.png')] bg-fixed"> {/*Added fancy background (same as the newsfeed page. can be changed later. originally was a boring black bg)*/}
                    <div className="w-full max-h-full p-[5%] overflow-y-auto">
                        {/*Close button*/}
                        <button
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-10 right-10 hover:cursor-pointer hover:opacity-60">
                            ✘
                        </button>

                        {/*Title and Seperator Line*/}
                        <h1 className="ml-[14%]">{selectedNews.title}</h1>
                        <br/>
                        <hr className="w-[80%] mx-auto"/>
                        <br/>
                        
                        {/*Below the Seperator - Image and Content*/}
                        <div className="px-[5%] pb-[5%] mx-[5%] mb-[5%] flex">
                            {/*Image*/}
                            <div className="mb-[5%] w-[50%] flex flex-col">
                                <div className="max-w-full max-h-full mr-[5%]">
                                    {typeof selectedNews.image !== "string" &&
                                        selectedNews.image?.url && (
                                            <Image
                                                src={selectedNews.image.url}
                                                width={500}
                                                height={300}
                                                alt={selectedNews.image.alt || ""}
                                            />
                                        )}
                                </div>
                                
                                {/*Extra Information After - Timestamps and Categories*/}
                                <div>
                                    <br/>
                                    <h5>Created At: {formatDate(selectedNews.createdAt)}</h5>
                                    <h5>Updated At: {formatDate(selectedNews.updatedAt)}</h5>
                                    <br/>

                                    <h5 className="italic">{selectedNews.subtitle}</h5>
                                    <p>Included in: {selectedNews.category.filter((cat) => typeof cat !== "string").map((cat) => cat.name).join(", ")}</p>
                                </div>
                            </div>
                            
                            <br/>
                            <hr/>
                            <br/>
                            
                            {/*News Story/Content*/}
                            <div className="flex justify-center w-[50%]">
                                <RichText data={selectedNews.description} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}