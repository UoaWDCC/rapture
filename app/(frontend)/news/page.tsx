import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import NewsTab from "./components/newsTabs";
import NewsHeader from "./components/NewsHeader";

import type { NewsItem } from "../components/NewsList";

export default async function ExampleCollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ article?: string }>;
}) {
  const payload = await getPayload({ config: await config });

  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isAdmin = user?.role === "admin";

  const newsItems = await payload.find({
    collection: "News",
  });

  const params = await searchParams;
  const expandedArticleId = params.article ?? null;

  return (
    <div className="max-w-full max-h-full bg-[url('/PROP%20%232%201.png')] bg-fixed">
      {" "}
      {/*bg image is 'PROP #2 1.png' that I downloaded from Figma*/}
      <div className="m-[5%] w-[90%] self-center">
        {/*TITLE + ADMIN BUTTON*/}
        <NewsHeader isAdmin={isAdmin} />
        {/*NEWS ITEMS*/}
        <div className="mx-auto max-w-full md:max-w-full md:pb-[5%] pb-[25%]">
          <div className="md:flex">
            <div className="md:w-full max-w-full">
              <NewsTab
                allNews={newsItems.docs}
                expandedArticleId={expandedArticleId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*import { MOCK_POSTS } from "./mockData";
import { NewsCard } from "./components/NewsCard";

export default async function NewsPage() {
  const posts = MOCK_POSTS;

  return (
    <div className="container mx-auto my-6 px-4 space-y-4">
      <h1 className="text-xl font-bold">Latest News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} */
