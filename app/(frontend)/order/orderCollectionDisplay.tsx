import { Order } from "@/payload-types";
export default async function OrderCollectionDisplay({
  order,
}: {
  order: Order;
}) {
  return (
    <div className="flex flex-row gap-5 bg-black rounded-lg text-xl p-2">
      <h1>{typeof order.user === 'string' ? order.user : order.user.email}</h1>
      <h2>{order.dateTime}</h2>
      <h2>{order.totalPrice}</h2>
    </div>
  );
}
