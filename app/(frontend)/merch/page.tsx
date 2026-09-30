import { getPayload } from "payload";
import config from "@/payload.config";
import MerchPageClient from "./MerchPageClient";

export default async function MerchPage() {
  const payload = await getPayload({ config: await config });

  const result = await payload.find({
    collection: "products",
    sort: "-createdAt",
    depth: 1,
    where: { _status: { equals: "published" } },
  });

  return <MerchPageClient initialProducts={result.docs} />;
}
