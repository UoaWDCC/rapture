import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import ProductsDisplayBig from "../components/productsDisplayBig";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const payload = await getPayload({ config: await config });

  let product;

  try {
    product = await payload.findByID({
      collection: "products",
      id,
      depth: 2,
    });
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] py-8">
      <ProductsDisplayBig product={product} cap={30} />
    </main>
  );
}
