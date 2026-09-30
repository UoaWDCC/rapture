import { getPayload } from "payload";
import config from "@/payload.config";
import "./styles.css";

import { HomeHeroSection } from "./components/homeHeroSection";
import { JoinNowSection } from "./components/joinNowSection";
import { NewsSection } from "./components/newsSection";
import { PromotedGameSection } from "./components/promotedGameSection";

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const latestNews = await payload.find({
    collection: "News",
    sort: "-createdAt",
    limit: 1,
  });

  return (
    <div
      className="w-full flex-col items-center -mt-50 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/images/home-background.png')" }}
    >
      <div className="pt-40">
        <HomeHeroSection />
      </div>

      <JoinNowSection />

      <PromotedGameSection />

      <NewsSection latestNews={latestNews.docs[0] ?? null} />

      <div className="relative w-full overflow-hidden"></div>
    </div>
  );
}
