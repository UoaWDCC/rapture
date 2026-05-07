import { getPayload } from "payload";
import config from "@/payload.config";
import ExampleCollectionDisplay from "./components/exampleCollectionDisplay";


export default async function ExampleCollectionPage() {
  const payload = await getPayload({ config: await config });

  const examples = await payload.find({
    collection: "example",
  });

  return (
    <div>
      <h1>Example Collection Display</h1>
      {examples.docs.map((example) => (
        <ExampleCollectionDisplay key={example.title} example={example} />
      ))}
    </div>
  );
}