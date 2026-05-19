  import type { News } from "@/payload-types";
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

  export default async function NewsFeed({
    news,
  }: {
    news: News;
  }) {
    return (
      <div className="max-w-full overflow-auto wrap-break-word mb-2 bg-[#DDA520]/76 text-xl px-2 pt-2"> {/*ori color: AF8219*/}
          <div className="bg-[#E6E6E6]/60 text-[#302F2F] flex"> {/*ori color: DCCDAA*/}
              <div className="w-[58.5%] m-[1.5%]">pic</div>
              <div className="w-[38.5%] m-[1.5%] flex flex-col justify-center">
                <p className="font-dm font-medium text-xs"> ▶ news.subtitle</p> {/*font is not font-ing :(((*/}
                <p className="font-[23] text-2xl"> {news.title}</p>
                {/*<h5>{formatDate(news.createdAt)}</h5>
                <hr />*/}
                <RichText data={news.description} className="font-[Fira_Mono] text-sm" /> {/*font is not font-ing :(((*/}
                {/*gotta make new fucntion cuz there's gonna be probs more than one category*/}
                <div className="max-w-full flex justify-left mt-2">
                    <div className="bg-black text-[#E2E2E2] mx-2 p-1 w-[47%] text-sm text-center font-[Fira_Mono]">Category</div> {/*font is not font-ing :(((*/}
                    <div className="bg-black text-[#E2E2E2] mx-2 p-1 w-[47%] text-sm text-center font-[Fira_Mono]">Category2</div> {/*font is not font-ing :(((*/}
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