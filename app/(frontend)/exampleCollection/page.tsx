import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";
import ExampleCollectionDisplay from "./components/exampleCollectionDisplay";
import GameCard from "@/app/(frontend)/components/gameCard";

import NewsSubmission from "../components/newsSubmission";
import { NewsList } from "../components/NewsList";
import type { NewsItem } from "../components/NewsList";

// Sample news data for testing — should be replaced with real Payload CMS data later
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
  },
  {
    id: "3",
    title: "Example Post",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididid",
    date: "2026-04-28",
    username: "Username",
    commentCount: 0,
  },
  {
    id: "4",
    title: "Example Post",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididid",
    date: "2026-04-28",
    username: "Username",
    commentCount: 0,
  },
  {
    id: "5",
    title: "Example Post",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididid",
    date: "2026-04-28",
    username: "Username",
    commentCount: 0,
  },
];

// Extended list for testing scrolling with > 5 items
const sampleNewsItemsLong: NewsItem[] = [
  ...sampleNewsItems,
  { id: "6", title: "Scrollable Post 6", description: "This is the 6th post.", date: "2026-04-29", username: "User2", commentCount: 1 },
  { id: "7", title: "Scrollable Post 7", description: "This is the 7th post.", date: "2026-04-30", username: "User3", commentCount: 5 },
  { id: "8", title: "Scrollable Post 8", description: "This is the 8th post.", date: "2026-05-01", username: "User4", commentCount: 2 },
];

export default async function ExampleCollectionPage() {
  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const isAdmin = user?.role === "admin";

  const examples = await payload.find({
    collection: "example",
  });

  // Test data for GameCard
  const testGames = [
    {
      title: "Untitled Project 1",
      image: "/Rapture_Large_2500-1000.png",
      description: "Descriptionnnnnnnnnnn",
      link: "/games/1",
      // title, image, description + link
    }, 
    {
      title: "Untitled Project 2",
      description: "More description",
      link: "/games/2",
      // no image 
    },
    {
      title: "Untitled Project 333333333333333333333333333333333333333333333333333333",
      image: "/Rapture_Large_2500-1000.png",
      description:
        "Description for project 3 testing very long text. Türhüter sagt, versteht, doch ließt in Mann, um Eintreten, ob er, aber als derstehn seinem Gesetz steht er sagt der Türhüter Türhüter. Zu dich den das Tor zu warten, um Gesetz. Als dich so lockt sich, schwart, versetzt er als der jetz. Als der dere zum Eintritten, sagt das Gesetz mein Türhüter als er also lockt, lacht eintreten Anblich das Gesem Gesetz mehr er nich, tritt, bückt einmal ste Türhüter. Zu dicht. Da das meinzugänglick der unter kommt eines doch jetz mer Mann über: Ich jetz. Aber Tür s",
      link: "/games/3",
      // long description + long title
    },
    {
      title: "Untitled Project 4",
      link: "/games/4",
      // no image, no description
    },
    {
      title: "Untitled Project 5",
      image: "/Rapture_Large_2500-1000.png",
      description: "Moreeee randommmmm descriptionnnnnn.",
      link: "/games/5",
      // title, image, description + link again
    }, 
    {
      title: "Untitled Project 6",
      description: "yup another description yayyyyyy.",
      link: "/games/6",
      // no image
    },
    {
      image: "/Rapture_Large_2500-1000.png",
      link: "/games/7",
      // no description + no title
    },
    {
      title: "Untitled Project 8",
      image: "/Rapture_Large_2500-1000.png",
      description: "for coming soon games that are possibly still in development yay",
      // no link — coming soon games
    },
  ];

  return (
    <div>
      <h1>Example Collection Display</h1>
      {examples.docs.map((example) => (
        <ExampleCollectionDisplay key={example.title} example={example} />
      ))}

      {/* GameCard Test Section — Grid */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-2">GameCard Test — Grid Layout</h2>
        <p className="text-gray-400 mb-6">Testing GameCard in a grid layout</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testGames.map((game) => (
            <GameCard
              key={game.link}
              title={game.title}
              image={game.image}
              description={game.description}
              link={game.link}
            />
          ))}
        </div>
      </div>

      {/* GameCard Test Section — List */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-2">GameCard Test — List Layout</h2>
        <p className="text-gray-400 mb-6">Testing GameCard in a list layout</p>

        <div className="flex flex-col gap-3">
          {testGames.map((game) => (
            <GameCard
              key={game.link}
              title={game.title}
              description={game.description}
              link={game.link}
              variant="list"
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Test News Submission Component</h2>
        <NewsSubmission isAdmin={isAdmin} />
      </div>

      {/* Demo Container: Flex row to show them side-by-side */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem', padding: '1rem', alignItems: 'flex-start' }}>
        
        {/* 1. Exactly 5 cards, little bit of scroll (figma design still shows scroll bar with 5 cards) */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>1. Full Height (5 Cards, No Scroll)</h3>
          <NewsList
            heading="Rapture Player Updates"
            items={sampleNewsItems}
          />
        </div>

        {/* 2. 8 cards, scrolls, shows exactly 5 cards at a time */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>2. Scrollable (8 Cards, Shows 5)</h3>
          <NewsList
            heading="Rapture Player Updates"
            items={sampleNewsItemsLong}
          />
        </div>

        {/* 3. Short List (2 Items, fixed background height) */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>4. Short List (2 Items, fixed height)</h3>
          <NewsList
            heading="Rapture Player Updates"
            items={sampleNewsItems.slice(0, 2)}
            height="595px"
          />
        </div>

      </div>


    </div>
  );
}