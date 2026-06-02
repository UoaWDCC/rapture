import { getPayload } from "payload";
import config from "@/payload.config";
import NewsTab from "./components/newsTabs";
import NewsList from "@/app/(frontend)/components/NewsList/NewsList";
import { NewsListProps } from "../components/NewsList";
import GameCard from "@/app/(frontend)/components/gameCard";
import NewsSubmission from "../components/newsSubmission";
import type { NewsItem } from "../components/NewsList";

export default async function ExampleCollectionPage() {
  const payload = await getPayload({ config: await config });

  const newsItems = await payload.find({
    collection: "News",
  });

  const categories = await payload.find({
    collection: "category",
  })

  const sampleNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "Example Post",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "2026-04-28",
    username: "Username",
    commentCount: 0,
  },
  {
    id: "2",
    title: "Example Post",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididid",
    date: "2026-04-28",
    username: "Username",
    commentCount: 0,
  }
];

// Extended list for testing scrolling with > 5 items
const sampleNewsItemsLong: NewsItem[] = [
  ...sampleNewsItems,
  { id: "6", title: "Scrollable Post 6", description: "This is the 6th post.", date: "2026-04-29", username: "User2", commentCount: 1 },
  { id: "7", title: "Scrollable Post 7", description: "This is the 7th post.", date: "2026-04-30", username: "User3", commentCount: 5 },
  { id: "8", title: "Scrollable Post 8", description: "This is the 8th post.", date: "2026-05-01", username: "User4", commentCount: 2 },
];

  return (
    <div className="max-w-full max-h-full bg-[url('/PROP%20%232%201.png')] bg-fixed"> {/*bg image is 'PROP #2 1.png' that I downloaded from Figma*/}
      <div className="m-[5%] w-[90%] self-center">
        {/*TITLE*/}
        <div className="max-w-full bg-[url('/images/news-list-heading-bg.png')] no-repeat;"> {/*ml-15 */}

          <p className="px-5 py-2.5 text-2xl text-[#302F2F]">RAPTURE NEWSFEED</p>

        </div>
        {/*ITEMS IN HERE*/}
        <div className="flex">
          <div className="w-[85%]"> {/*ml-15  mt-[2.5%]*/}

            <NewsTab allNews={newsItems.docs} categories={categories.docs} />

          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '1rem', paddingTop: '0.6rem', alignItems: 'flex-start' , width: '35%'}}> {/*gap: '2rem',  margin: '2rem',*/}
            
            {/* 2. 8 cards, scrolls, shows exactly 5 cards at a time */}
            <div>
              <NewsList
                heading="Rapture Player Updates"
                items={sampleNewsItemsLong}
                className="w-5000"
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
}*/
