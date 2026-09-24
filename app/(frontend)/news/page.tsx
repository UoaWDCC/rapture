import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import NewsTab from "./components/newsTabs";
import NewsHeader from "./components/NewsHeader";
import GlitchReveal from "../components/GlitchReveal";

export default async function NewsPage({
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
    <main className="min-h-screen w-full bg-[url('/PROP%20%232%201.png')] bg-fixed bg-cover bg-center">
      {/* Container: 14px left, 16px right on mobile per Figma */}
      <div className="w-full max-w-[1440px] mx-auto pl-[14px] pr-[16px] md:px-[5%] py-6 md:py-10">
        {/* TITLE + ADMIN BUTTON */}
        <GlitchReveal>
          <NewsHeader isAdmin={isAdmin} />
        </GlitchReveal>

        {/* NEWS ITEMS: 9px from heading box per Figma */}
        <div className="w-full mt-[9px] md:mt-4 pb-[10%] md:pb-[5%]">
          <NewsTab
            allNews={newsItems.docs}
            expandedArticleId={expandedArticleId}
          />
        </div>
      </div>
    </main>
  );
}
