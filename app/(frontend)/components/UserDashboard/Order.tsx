import { colorToRgba } from "@/lib/colour";

type Order = {
  id: string;
  number: string;
  status: string;
};

export const ordersTest: Order[] = [
  { id: "1", number: "00001", status: "Completed" },
  { id: "2", number: "00002", status: "Delievery" },
  { id: "3", number: "00003", status: "Waiting on details" },
  { id: "4", number: "00004", status: "Payment completed" },
];

export function OrderRow({ order, isLast }: { order: Order; isLast: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4"
      style={{
        borderBottom: isLast
          ? "none"
          : `1px solid ${colorToRgba("#1e5fa8", 0.4)}`,
      }}
    >
      <span
        className="font-bold tracking-wide text-lg"
        style={{ color: "#3b82f6", fontFamily: "monospace" }}
      >
        Order #{order.number}
      </span>

      <span
        className="text-sm tracking-wide"
        style={{ color: "#3b82f6", fontFamily: "monospace" }}
      >
        Status: {order.status}
      </span>

      <button
        type="button"
        className="px-6 py-2 rounded text-sm font-bold tracking-wide text-white"
        style={{ backgroundColor: "#1e5fa8" }}
      >
        Detail
      </button>
    </div>
  );
}

export function OrdersDisplay() {
  return (
    <div
      className="rounded-lg border flex-1 p-8"
      style={{
        borderColor: "#1e5fa8",
        backgroundColor: "#050d1f",
      }}
    >
      <h2
        className="text-3xl font-bold tracking-wide mb-8"
        style={{ color: "#3b82f6", fontFamily: "monospace" }}
      >
        Order History
      </h2>

      <div
        className="rounded border"
        style={{
          borderColor: "#1e5fa8",
          backgroundColor: colorToRgba("#1e5fa8", 0.08),
        }}
      >
        {ordersTest.map((order, i) => (
          <OrderRow
            key={order.id}
            order={order}
            isLast={i === ordersTest.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
