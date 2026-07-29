'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/ui/Button";

const PRODUCTS = [
  {
    id: 'price_1TRQuyPgB8PggCocyrPvde6P', // can be found in product price in the Stripe dashboard
    name: 'Rapture Shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
    price: 1,
    currency: 'NZD',
  }
]

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type ProductProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

function Product({ product, onAdd }: ProductProps) {
  return (
    <div>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price} {product.currency}</p>
      <Button onClick={() => onAdd(product)}>Add to cart</Button>
    </div>
  )
}
interface CartProps {
  searchParams: { canceled?: string };
}

export default function CartPage({ searchParams }: CartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const { canceled } = searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.'
    )
  }

  const handleAdd = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const total = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const currency = cartItems[0]?.product.currency ?? "NZD";

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: cartItems[0].product.id }),
      });
      const { url } = await res.json();
      router.push(url);
    } catch {
      alert('Something went wrong on checkout. Please try again.')
    } finally {
      setLoading(false)
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
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
              className="bg-brand-white text-background px-6 font-bold cursor-pointer hover:opacity-70 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {cartItems.length === 0 && (
              <p className="opacity-60">Your cart is empty.</p>
            )}

            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="relative border border-foreground bg-slate-700 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 sm:gap-8"
              >
                <button
                  onClick={() => handleRemove(product.id)}
                  aria-label="Remove item"
                  className="absolute top-3 right-6 sm:top-4 sm:right-5 cursor-pointer hover:opacity-60 transition text-xl leading-none"
                >
                  -
                </button>

                <div className="w-[calc(100%-3rem)] lg:w-56 xl:w-72 h-56 sm:h-64 md:h-80 bg-gray-400 shrink-0" />

                <div className="flex flex-col justify-center gap-4 sm:gap-6 lg:w-44 xl:w-56 shrink-0">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl break-words">{product.name}</h3>
                  <div className="flex items-center gap-6 sm:gap-8 text-base sm:text-lg">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      aria-label="Decrease quantity"
                      className="cursor-pointer hover:opacity-60 transition"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      aria-label="Increase quantity"
                      className="cursor-pointer hover:opacity-60 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-w-0 mt-8 lg:mt-0 lg:ml-4">
                  <p className="text-xl sm:text-2xl mb-3 sm:mb-4">Description</p>
                  <p className="text-sm leading-relaxed opacity-80">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 p-4 border-1">
            Add an item - for testing purposes only
            {PRODUCTS.map((item, i) => (
              <Product key={i} product={item} onAdd={handleAdd} />
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="w-full md:w-72 md:self-start shrink-0 md:min-h-[400px] bg-gray-300 text-background p-5 flex flex-col gap-4">
          <h4 className="font-bold">Order Summary</h4>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{total} {currency}</span>
          </div>
          <div className="h-[1px] bg-background/20" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total} {currency}</span>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || loading}
            className="mt-4 w-full"
          >
            {loading ? 'Please wait...' : 'Checkout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
