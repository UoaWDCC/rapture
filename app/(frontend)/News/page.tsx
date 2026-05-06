import { getPayload } from "payload";
import config from "@/payload.config";
import NewsDisplay from "./components/newsDisplay";


export default async function ExampleColectionPage() {
  const payload = await getPayload({ config: await config });

  const newsItem = await payload.find({
    collection: "News",
  });

  return (
    <div>
      <h1 className="font-extrabold text-[30px] min-h-10 m-10">News Collection Display</h1>
      {newsItem.docs.map((news) => (
        <NewsDisplay key={news.title} news={news} />
      ))}
    </div>
  );
}