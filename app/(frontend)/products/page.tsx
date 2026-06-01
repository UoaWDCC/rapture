import { getPayload } from "payload";
import config from "@/payload.config";
import ProductsDisplay from "./components/productsDisplay";
import { Pagination } from "@/app/(frontend)/components/ui/Pagination";
import ProductForm from "./components/productForm"

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { page: pageParam, limit: limitParam } = await searchParams;

  const page = Number(pageParam ?? 1);
  const limit = Math.min(Number(limitParam ?? 10), 100);

  const payload = await getPayload({ config: await config });

  const result = await payload.find({
    collection: "products",
    sort: '-createdAt',
    limit,
    page,
    where: { _status: { equals: "published" } },
    depth: 1,
  });

  const { user } = await payload.auth({ headers: await (await import("next/headers")).headers() })

  return (
    <div className="container mx-auto py-10">
      {user?.role === "admin" && <ProductForm />}
      <h1 className="font-bold text-xl">Products ({result.totalDocs})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {result.docs.map((product, i) => (
          <ProductsDisplay key={i} product={product} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={result.totalPages}
        hasNextPage={result.hasNextPage}
        hasPrevPage={result.hasPrevPage}
      />
    </div>
  );
}