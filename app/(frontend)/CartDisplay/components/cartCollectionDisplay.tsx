import { Cart } from "@/payload-types";
export default async function CartCollectionDisplay({
  cart,
}: {
  cart: Cart;
}) {
  return (
    <div className="flex flex-col gap-5 bg-black rounded-lg text-xl p-2">
      <h1>User: {typeof cart.user === "object" ? cart.user.email : cart.user}</h1>
      {cart.items?.map((item, index) => (
        <div key={index} className="flex flex-row gap-5">
          <h2>{item.productTitle}</h2>
          <h2>${item.productPrice}</h2>
          <h2>Qty: {item.quantity}</h2>
        </div>
      ))}
    </div>
  );
}
