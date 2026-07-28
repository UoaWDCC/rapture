"use client";

import { useState } from "react";
import NewsFeed from "./newsfeed";
import type { News } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default function NewsTabs({ allNews }: { allNews: News[] }) {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  return (
    <div className="my-7.5">
      {/*All news displayed*/}
      <div>
        {allNews.length === 0 ? (
          /*No news; just a container display */
          <div className="w-full h-148.75 bg-[#F2B423]/70 flex items-center justify-center p-3 text-center text-[#302F2F] font-[Nova_Cut]">
            <p>No news to display yet.</p>
          </div>
        ) : (
          allNews.map((item) => (
            <NewsFeed
              key={item.id}
              news={item}
              onReadMore={() => setSelectedNews(item)}
            />
          ))
        )}
      </div>

      {/*Read More Expanded*/}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black bg-[url('/PROP%20%232%201.png')] bg-fixed">
          {" "}
          {/*Added fancy background (same as the newsfeed page. can be changed later. originally was a boring black bg)*/}
          <div className="w-full max-h-full p-[5%] overflow-y-auto">
            {/*Close button*/}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-10 right-10 hover:cursor-pointer hover:opacity-60"
            >
              ✘
            </button>

            {/*Title and Seperator Line*/}
            <h1 className="ml-[14%]">{selectedNews.title}</h1>
            <br />
            <hr className="w-[80%] mx-auto" />
            <br />

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
                  <br />
                  <h5>Created At: {formatDate(selectedNews.createdAt)}</h5>
                  <h5>Updated At: {formatDate(selectedNews.updatedAt)}</h5>
                  <br />

                  <h5 className="italic">{selectedNews.subtitle}</h5>
                  <p>
                    Included in:{" "}
                    {selectedNews.category
                      .filter((cat) => typeof cat !== "string")
                      .map((cat) => cat.name)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <br />
              <hr />
              <br />

              {/*News Story/Content*/}
              <div className="flex justify-center w-[50%]">
                <RichText data={selectedNews.description} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
