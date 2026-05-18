import { getPayload } from "payload";
import config from "@/payload.config";
import NewsFeed from "./components/newsfeed";

export default async function ExampleCollectionPage() {
  const payload = await getPayload({ config: await config });

  const newsItems = await payload.find({
    collection: "News",
  });

  return (
    <div className="ml-10">
      {/*<h1>News Collection Display</h1>*/}
      {newsItems.docs.map((news) => (
        <NewsFeed key={news.id} news={news} />
      ))}
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
}*/
