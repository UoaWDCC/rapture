import { News } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

function formatDate(dateString:string) {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear()

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default async function NewsDisplay({
  news,
}: {
  news: News;
}) {
  return ( //inline-block w-[45%] gap-5 items-stretch bg-red-200 text-xl p-10 max-w-sm rounded overflow-auto wrap-break-word shadow-lg ml-10 m-5
    <div className="w-[45%] m-2.5 max-w-sm rounded overflow-auto wrap-break-word bg-red-200 text-xl p-10 text-emerald-900">
      <div>
        <div className="font-bold text-xl mb-2.5">{news.title}</div>
        <div className="text-xs">
          <p>Created At: {formatDate(news.createdAt)}</p>
          <p>Updated At: {formatDate(news.updatedAt)}</p>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <RichText className="text-gray-700 text-base" data={news.description} />
      </div>
    </div>
  );
}
