import { Example } from "@/payload-types";
export default async function ExampleCollectionDisplay({
  example,
}: {
  example: Example;
}) {
  return (
    <div className="flex flex-row gap-5 bg-black rounded-lg text-xl p-2">
      <h1>{example.title}</h1>
      <h2>{example.subTitle}</h2>
    </div>
  );
}
