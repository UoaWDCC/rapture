import { getPayload } from "payload";
import config from "@/payload.config";

export default async function ExampleColectionPage() {
  const payload = await getPayload({ config: await config });

  const examples = await payload.find({
    collection: "example",
  });

  return (
    <div>
      <h1>Example Collection Display</h1>
    </div>
  );
}