import { getPayload } from "payload";
import config from "@/payload.config";
import NewsFeed from "./components/newsfeed";
import NewsTab from "./components/newsTabs";

export default async function ExampleCollectionPage() {
  const payload = await getPayload({ config: await config });

  const newsItems = await payload.find({
    collection: "News",
  });

  const categories = await payload.find({
    collection: "category",
  })

  return (
    <div className="max-w-full max-h-full bg-[url('/PROP%20%232%201.png')] bg-fixed"> {/*bg image is 'PROP #2 1.png' that I downloaded from Figma*/}
      <div className="ml-15 mt-[2.5%] w-[55%]">
        <NewsTab allNews={newsItems.docs} categories={categories.docs} />
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
}*/
