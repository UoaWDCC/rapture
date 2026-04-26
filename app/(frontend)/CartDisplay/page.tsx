import { getPayload } from "payload";
import config from "@/payload.config";
import CartCollectionDisplay from "./components/cartCollectionDisplay";


export default async function CartCollectionPage() {
  const payload = await getPayload({ config: await config });

  const carts = await payload.find({
    collection: "Cart",
    depth: 2,
  });

  return (
    <div>
      <h1>Cart Collection Display</h1>
      {carts.docs.map((cart) => (
        <CartCollectionDisplay key={cart.id} cart={cart} />
      ))}
    </div>
  );
}