  import type { News, Category, Media } from "@/payload-types";
  import { RichText } from "@payloadcms/richtext-lexical/react";
  import Link from 'next/link'
  import Image from 'next/image'

  export default function NewsFeed({
    news,
    onReadMore,
    isExpanded,
  }: {
    news: News;
    onReadMore: () => void;
    isExpanded?: boolean;
  }) {
    const image = typeof news.image === "string" ? null : news.image
    const categories = news.category.filter(
      (cat): cat is Category => typeof cat !== "string"
    )

    return (
      <div className="max-w-full mb-2 bg-[#DDA520]/80 text-xl px-2 pt-2"> {/*ori color: AF8219*/}
        {/*Beige card - Image and Texts*/}
        <div className={`${isExpanded ? "" : "max-h-70"} bg-[#E6E6E6]/60 text-[#302F2F] flex`}> {/*ori color: DCCDAA*/}
          {/*News Image*/}
            <div className="w-[54.5%] m-[1.5%] h-50 flex justify-center">
              {image?.url && (
                <Image
                  src={image.url}
                  width={300}
                  height={100}
                  alt={image.alt || ""}
                />
              )
              }
            </div>
            
            {/*Text - Title, Subtitle, limited Description + Categories*/}
            <div className="w-[42.5%] m-[1.5%] flex flex-col justify-center">
              <p className="font-dm font-medium text-xs"> ▶ {news.subtitle}</p> {/*font is not font-ing :(((*/}
              <p className="font-[23] text-2xl"> {news.title}</p>
              <div className={isExpanded ? "" : "max-h-25 overflow-hidden"}>
                <RichText data={news.description} className={`font-[Fira_Mono] text-sm ${isExpanded ? "" : "line-clamp-3"}`} /> {/*font is not font-ing :(((*/}
              </div>
              {/*Categories*/}
              <div className="flex flex-wrap justify-left mt-2">
                {categories.map((cat) => ((
                  <div key={cat.id} className="bg-black text-[#E2E2E2] m-2 py-1 px-[7.5%] text-sm text-center font-[Fira_Mono]">{cat.name}</div> /*font is not font-ing :(((*/
                )))}
              </div>
            </div>
        </div>

        {/*outside of Beige card - Read more button*/}
        <button onClick={onReadMore} className="hover:cursor-pointer hover:opacity-60">
            <div className="max-w-full flex items-center">
                <div className="bg-[#DDA520] border-2 border-[#FEFEFE] rounded-full w-7 h-7 m-2 flex justify-center-safe items-center-safe"> {/* check margin and press tab in the rendering its kinda bad ngl*/}
                  <div className="text-xs text-[#FEFEFE]">▶</div>
                </div>
                <div className="text-[75%]">Read more</div>
            </div>
        </button>

      </div>
    );
  }