import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import MerchPageClient from "./MerchPageClient";

export default async function MerchPage() {
  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isAdmin = user?.role === "admin";

  const result = await payload.find({
    collection: "products",
    sort: "-createdAt",
    depth: 1,
    where: { _status: { equals: "published" } },
  });

  return <MerchPageClient initialProducts={result.docs} isAdmin={isAdmin} />;
}
