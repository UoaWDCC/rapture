"use client";

import { useState } from "react";

type props = {
  productId: string;
  className?: string;
  amount: number;
};

async function addToCart(productId: string, amount: number) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity: amount }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to add item to cart");
  }
}

export default function AddToCartButton(props: props) {
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    if (added) return;

    try {
      setAdded(true);
      await addToCart(props.productId, props.amount);
    } catch {
      setAdded(false);
    }
  };

  return (
    <button
      className={`font-mono p-[2%] rounded-sm transition-colors duration-200 ${
        added
          ? "bg-gray-500 text-gray-200 cursor-not-allowed"
          : "bg-white text-black hover:cursor-pointer hover:opacity-90"
      } ${props.className ?? ""}`}
      onClick={handleClick}
      disabled={added}
      aria-live="polite"
    >
      {added ? "ADDED" : "ADD TO BAG"}
    </button>
  );
}
