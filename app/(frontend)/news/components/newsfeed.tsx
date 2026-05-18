import type { News } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default async function NewsFeed({
  news,
}: {
  news: News;
}) {
  return (
    <div className="flex flex-row gap-5 w-[60%] mb-2 bg-[#AF8219] text-xl p-2">
        <div className="bg-[#DCCDAA] text-[#302F2F]">
            <h1>{news.title}</h1>
            <h5>Created At: {formatDate(news.createdAt)}</h5>
            <h5>Updated At: {formatDate(news.updatedAt)}</h5>
            <hr />
            <RichText data={news.description} />
            <div className="bg-black text-[#E2E2E2]">button example</div>
            <div className="bg-[#DDA520] text-[#FEFEFE]">button2 example (readmore)</div>
        </div>
    </div>
  );
}