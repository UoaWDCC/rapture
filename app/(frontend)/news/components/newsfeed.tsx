  import type { News, Category, Media } from "@/payload-types";
  import { RichText } from "@payloadcms/richtext-lexical/react";
  import Link from 'next/link'
  import Image from 'next/image'

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  export default function NewsFeed({
    news,
  }: {
    news: News;
  }) {
    const image = typeof news.image === "string" ? null : news.image
    const categories = news.category.filter(
      (cat): cat is Category => typeof cat !== "string"
    )

    return (
      <div className="max-w-full mb-2 bg-[#DDA520]/76 text-xl px-2 pt-2"> {/*ori color: AF8219*/}
        <div className=" bg-[#E6E6E6]/60 text-[#302F2F] flex"> {/*ori color: DCCDAA*/}
            <div className="w-[58.5%] m-[1.5%] h-50 flex justify-center">
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
            <div className="w-[38.5%] m-[1.5%] flex flex-col justify-center">
              <p className="font-dm font-medium text-xs"> ▶ {news.subtitle}</p> {/*font is not font-ing :(((*/}
              <p className="font-[23] text-2xl"> {news.title}</p>
              {/*<h5>{formatDate(news.createdAt)}</h5>
              <hr />*/}
              <RichText data={news.description} className="font-[Fira_Mono] text-sm" /> {/*font is not font-ing :(((*/}
              {/*gotta make new fucntion cuz there's gonna be probs more than one category*/}
              <div className="flex-col justify-left mt-2">
                {categories.map((cat) => ((
                  <div key={cat.id} className="bg-black text-[#E2E2E2] m-2 py-1 px-10 text-sm text-center font-[Fira_Mono]">{cat.name}</div> /*font is not font-ing :(((*/
                )))}
              </div>
              
            </div>
        </div>
        <Link href={`/news/${news.id}`} className="group">
            <div className="max-w-[16%] flex items-center">
                <div className="bg-[#DDA520] border-2 border-[#FEFEFE] group-hover:border-[#FFFFFF] rounded-full w-7 h-7 m-2 flex justify-center-safe items-center-safe"> {/* check margin and press tab in the rendering its kinda bad ngl*/}
                  <div className="text-xs text-[#FEFEFE] group-hover:text-[#FFFFFF]">▶</div>
                </div>
                <div className="text-[75%] group-hover:text-[#FFFFFF]">Read more</div>
            </div>
        </Link>
      </div>
    );
  }