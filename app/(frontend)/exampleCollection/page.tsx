import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";
import ExampleCollectionDisplay from "./components/exampleCollectionDisplay";
import NewsSubmission from "../components/newsSubmission";

export default async function ExampleColectionPage() {
  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const isAdmin = user?.role === "admin";

  const examples = await payload.find({
    collection: "example",
  });

  return (
    <div>
      <h1>Example Collection Display</h1>
      {examples.docs.map((example) => (
        <ExampleCollectionDisplay key={example.title} example={example} />
      ))}

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Test News Submission Component</h2>
        <NewsSubmission isAdmin={isAdmin} />
      </div>
    </div>
  );
}