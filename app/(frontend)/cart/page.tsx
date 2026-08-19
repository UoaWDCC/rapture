"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Image from "next/image";
import { Product } from "@/payload-types";

const IconX = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </svg>
);

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartProps {
  searchParams: Promise<{ canceled?: string }>;
}

async function getCartFromServer(): Promise<CartItem[]> {
  const res = await fetch("/api/cart", { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];

  return items
    .filter((item: any) => item?.product)
    .map((item: any) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description ?? "",
        price: Number(item.product.price ?? 0),
        currency: item.product.currency ?? "NZD",
        stripePriceId: item.product.stripePriceId ?? null,
      },
      quantity: Number(item.quantity ?? 1),
    }));
}

export default function CartPage({ searchParams }: CartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPromo, setShowPromo] = useState<boolean>(true);
  const [isHydrating, setIsHydrating] = useState(true);

  const { canceled } = use(searchParams);

  useEffect(() => {
    void (async () => {
      const items = await getCartFromServer();
      setCartItems(items);
      setIsHydrating(false);
    })();
  }, []);

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready.",
    );
  }

  const refreshCart = async () => {
    const items = await getCartFromServer();
    setCartItems(items);
  };

  const handleAdd = async (product: Product) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });

    if (res.ok) {
      await refreshCart();
    }
  };

  const handleQuantityChange = async (id: string, delta: number) => {
    const item = cartItems.find((i) => i.product.id === id);
    if (!item) return;

    const nextQty = Math.max(1, item.quantity + delta);
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, quantity: nextQty }),
    });

    if (res.ok) {
      await refreshCart();
    }
  };

  const handleRemove = async (id: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });

    if (res.ok) {
      await refreshCart();
    }
  };

  const handleClearCart = async () => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (res.ok) {
      await refreshCart();
    }
  };

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      cartItems.forEach((item) => console.log(item.product.stripePriceId));

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items: cartItems.map((item) => ({
            price: item.product.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      const url = typeof data?.url === "string" ? data.url : "";

      if (!res.ok || !url.startsWith("http")) {
        throw new Error(data?.error ?? "Checkout could not start.");
      }

      router.push(url);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong on checkout. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="font-bold mb-5">Your Items</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Items list */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-4">
            <div className="bg-brand-white text-background flex-1 px-4 py-3 flex items-center">
              <h4>{String(itemCount).padStart(2, "0")} items</h4>
            </div>
            <button
              onClick={() => void handleClearCart()}
              disabled={cartItems.length === 0}
              className="bg-brand-white text-background px-6 font-bold cursor-pointer hover:opacity-70 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {isHydrating && <p className="opacity-60">Loading cart...</p>}
            {!isHydrating && cartItems.length === 0 && (
              <p className="opacity-60">Your cart is empty.</p>
            )}

            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-5 relative border-5 border-brand-blue bg-brand-blue/25 flex flex-col xl:flex-row"
              >
                <button
                  onClick={() => void handleRemove(product.id)}
                  aria-label="Remove item"
                  className="absolute top-3 right-4 cursor-pointer hover:opacity-60 transition text-xl leading-none"
                >
                  -
                </button>

                {/* Image placeholder */}
                <div className="rounded-sm w-[calc(100%-3rem)] xl:w-64 h-56 sm:h-64 md:h-80 xl:h-auto xl:self-stretch bg-gray-400 shrink-0" />

                <div className="bg-background/10 border border-brand-blue xl:border-l-0 mt-5 mb-5 mr-5 flex-1 flex flex-col xl:flex-row gap-6 sm:gap-8 p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col justify-center gap-4 sm:gap-6 xl:w-56 shrink-0">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl break-words">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-6 sm:gap-8 text-base sm:text-lg">
                      <button
                        onClick={() =>
                          void handleQuantityChange(product.id, -1)
                        }
                        aria-label="Decrease quantity"
                        className="cursor-pointer hover:opacity-60 transition"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => void handleQuantityChange(product.id, 1)}
                        aria-label="Increase quantity"
                        className="cursor-pointer hover:opacity-60 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 p-5 sm:p-6 text-right">
                    <p className="text-xl sm:text-2xl mb-3 sm:mb-4">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed opacity-80">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => void handleCheckout()}
              disabled={cartItems.length === 0 || loading}
              className="bg-foreground text-background font-bold px-20 py-3 cursor-pointer hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "PLEASE WAIT..." : "GO TO CHECKOUT"}
            </button>
          </div>
        </div>

        <div className="w-full md:w-72 md:self-start shrink-0 flex flex-col text-foreground">
          {/* Top bar */}
          <div className="relative flex justify-end items-center p-2">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Top edge */}
              <line
                x1="1"
                y1="1"
                x2="99"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
              {/* Left edge */}
              <line
                x1="1"
                y1="1"
                x2="1"
                y2="100"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
              {/* Right edge */}
              <line
                x1="99"
                y1="1"
                x2="99"
                y2="100"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
              {/* sm and up position */}
              <line
                className="hidden md:block"
                x1="88"
                y1="0"
                x2="88"
                y2="100"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Mobile position - fixed pixel size, doesn't scale with the container */}
            <svg
              className="md:hidden absolute top-1/2 right-10 -translate-y-1/2 pointer-events-none"
              width="2"
              height="32"
              viewBox="0 0 2 32"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="32"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
              />
            </svg>

            <button
              onClick={() => setShowPromo(false)}
              aria-label="Dismiss promo"
              className="pr-2 md:pr-1 relative cursor-pointer hover:opacity-60 transition"
            >
              <IconX />
            </button>
          </div>

          {/* Main box */}
          <div className="relative p-2">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                x="1"
                y="0"
                width="98"
                height="99"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <Image
              src="/images/vhs-case.png"
              alt="VHS Case"
              width={353}
              height={548}
              className="relative w-full h-auto"
            />

            <div className="relative bg-foreground h-[155px] flex items-center justify-center">
              <Image
                src="/images/get-it-today.png"
                alt="Get It Today"
                width={275}
                height={0} // auto height
                className="w-auto h-auto max-w-[70%] sm:max-w-[180px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
