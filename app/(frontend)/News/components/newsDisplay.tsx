import { News } from "@/payload-types";
export default async function NewsDisplay({
  example,
}: {
  example: News;
}) {
  return (
    <div className="flex flex-row gap-5 bg-black rounded-lg text-xl p-2">
      <h1>{example.title}</h1>
      <h5>{example.createdAt}</h5>
      <h5>{example.editedAt}</h5>
      <hr></hr>
      <p>{example.description}</p>
    </div>
  );
}
