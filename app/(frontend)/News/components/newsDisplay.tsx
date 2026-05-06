import { News } from "@/payload-types";
export default async function NewsDisplay({
  news,
}: {
  news: News;
}) {
  return (
    <div className="flex flex-row gap-5 bg-black rounded-lg text-xl p-2">
      <h1>{news.title}</h1>
      <h5>{news.createdAt}</h5>
      <h5>{news.updatedAt}</h5>
      <hr></hr>
      <p>{news.description}</p>
    </div>
  );
}
