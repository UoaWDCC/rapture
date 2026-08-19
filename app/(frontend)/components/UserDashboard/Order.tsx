"use client";

import { useState } from "react";
import { colorToRgba } from "@/lib/colour";
import { Order, Product } from "@/payload-types";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  payment_completed: "Payment Completed",
  waiting_on_details: "Waiting on Details",
  processing: "Processing",
  delivery: "Delivery",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

function resolveProducts(order: Order): Array<{
  id: string;
  name: string;
  description?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}> {
  const items = order.items ?? [];

  return items.map((item) => {
    const productDoc =
      typeof item.product === "string"
        ? null
        : (item.product as Product | null);
    const quantity = Number(item.quantity ?? 1);
    const unitPrice = Number((productDoc?.price ?? 0) / 100);

    return {
      id: String(productDoc?.id ?? item.product ?? "unknown-product"),
      name: productDoc?.name ?? "Unknown product",
      description: productDoc?.description ?? undefined,
      unitPrice,
      quantity,
      lineTotal: unitPrice * quantity,
    };
  });
}

// ── OrderRow ──────────────────────────────────────────────────────────────────

function OrderRow({
  order,
  isLast,
  isOpen,
  onToggle,
}: {
  order: Order;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const statusLabel = STATUS_LABELS[order.status ?? "pending"] ?? order.status;
  const products = resolveProducts(order);

  return (
    <div
      style={{
        borderBottom:
          isLast && !isOpen
            ? "none"
            : `1px solid ${colorToRgba("#1e5fa8", 0.4)}`,
      }}
    >
      {/* Main row */}
      <div className="flex items-center justify-between px-6 py-4">
        <span
          className="font-bold tracking-wide text-lg"
          style={{ color: "#3b82f6", fontFamily: "monospace" }}
        >
          Order #{order.id}
        </span>

        <span
          className="text-sm tracking-wide"
          style={{ color: "#3b82f6", fontFamily: "monospace" }}
        >
          Status: {statusLabel}
        </span>

        <button
          type="button"
          onClick={onToggle}
          className="px-6 py-2 rounded text-sm font-bold tracking-wide text-white transition-colors"
          style={{
            backgroundColor: isOpen ? colorToRgba("#1e5fa8", 0.5) : "#1e5fa8",
            outline: isOpen ? `1px solid #3b82f6` : "none",
          }}
        >
          {isOpen ? "Close" : "Detail"}
        </button>
      </div>

      {/* Expanded products */}
      {isOpen && (
        <div
          className="px-6 pb-5"
          style={{ borderTop: `1px solid ${colorToRgba("#1e5fa8", 0.3)}` }}
        >
          <div className="pt-4 flex flex-col gap-2">
            <div
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 pb-2 text-xs uppercase tracking-widest"
              style={{
                color: colorToRgba("#3b82f6", 0.6),
                fontFamily: "monospace",
              }}
            >
              <span>Product</span>
              <span className="text-right w-20">Qty</span>
              <span className="text-right w-24">Total</span>
            </div>

            {products.length === 0 && (
              <p
                className="px-4 text-sm"
                style={{
                  color: colorToRgba("#3b82f6", 0.5),
                  fontFamily: "monospace",
                }}
              >
                No products found.
              </p>
            )}

            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 rounded"
                style={{
                  backgroundColor: colorToRgba("#1e5fa8", 0.08),
                  border: `1px solid ${colorToRgba("#1e5fa8", 0.25)}`,
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#93c5fd", fontFamily: "monospace" }}
                  >
                    {product.name}
                  </span>
                  {product.description && (
                    <span
                      className="text-xs"
                      style={{
                        color: colorToRgba("#3b82f6", 0.6),
                        fontFamily: "monospace",
                      }}
                    >
                      {product.description}
                    </span>
                  )}
                </div>
                <span
                  className="font-bold text-sm self-center w-20 text-right"
                  style={{ color: "#3b82f6", fontFamily: "monospace" }}
                >
                  x{product.quantity}
                </span>
                <span
                  className="font-bold text-sm self-center w-24 text-right"
                  style={{ color: "#3b82f6", fontFamily: "monospace" }}
                >
                  ${product.lineTotal.toFixed(2)}
                </span>
              </div>
            ))}

            {/* Total */}
            <div
              className="flex justify-between px-4 pt-3 mt-1 border-t"
              style={{ borderColor: colorToRgba("#1e5fa8", 0.3) }}
            >
              <span
                className="text-sm font-bold tracking-wide"
                style={{ color: "#3b82f6", fontFamily: "monospace" }}
              >
                Total
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "#93c5fd", fontFamily: "monospace" }}
              >
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── OrdersDisplay ─────────────────────────────────────────────────────────────

export function OrdersDisplay({ orders }: { orders: Order[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      className="rounded-lg border flex-1 p-8"
      style={{ borderColor: "#1e5fa8", backgroundColor: "#050d1f" }}
    >
      <h2
        className="text-3xl font-bold tracking-wide mb-8"
        style={{ color: "#3b82f6", fontFamily: "monospace" }}
      >
        Order History
      </h2>

      {orders.length === 0 ? (
        <p
          className="text-sm"
          style={{
            color: colorToRgba("#3b82f6", 0.5),
            fontFamily: "monospace",
          }}
        >
          No orders found.
        </p>
      ) : (
        <div
          className="rounded border"
          style={{
            borderColor: "#1e5fa8",
            backgroundColor: colorToRgba("#1e5fa8", 0.08),
          }}
        >
          {orders.map((order, i) => (
            <OrderRow
              key={order.id}
              order={order}
              isLast={i === orders.length - 1}
              isOpen={openId === String(order.id)}
              onToggle={() =>
                setOpenId((prev) =>
                  prev === String(order.id) ? null : String(order.id),
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
