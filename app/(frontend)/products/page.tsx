import { getPayload } from "payload";
import config from "@/payload.config";
import ProductsDisplay from "./components/productsDisplay";
import ProductsDisplayBig from "./components/productsDisplayBig";
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
    <div className="container mx-auto">

      <div className="my-[5%] md:mx-0">
        {result.docs[1] && ( //1 is just the first product.
            <ProductsDisplayBig product={result.docs[1]} cap={30} />
            //cap = quantity cap for the quantity can one add into cart each time.
          )}
      </div>

      <div className="h-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-[5%] p-[3%]">
        {result.docs.map((product, i) => (
          <ProductsDisplay key={i} product={product} className="h-full" /> //all products previewed here.
        ))}
      </div>
    </div>
  );
}