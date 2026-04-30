'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const PRODUCTS = [
  {
    id: 'price_1TRQuyPgB8PggCocyrPvde6P', // can be found in product price in the Stripe dashboard
    name: 'Rapture Shirt',
    description: 'Brand new design',
    price: 100,
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
      <button
        onClick={() => onAdd(product)}
        className="cursor-pointer bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
      >
        Add to cart
      </button>
    </div>
  )
}
interface CartProps {
  searchParams: { canceled?: string };
}

export default function CartPage({ searchParams }: CartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<typeof PRODUCTS>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const { canceled } = searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.'
    )
  }

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev; // already in cart, skip
      return [...prev, product];
    });
  };

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: cartItems[0].id }),
      });
      const { url } = await res.json();
      router.push(url);
    } catch {
      alert('Something went wrong on checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <div className="container mx-auto my-10">
      <h1 className="font-bold text-xl mb-10s">Cart ({cartItems.length})</h1>

      <div className='my-10'>
        {PRODUCTS.map((item, i) => (
          <Product key={i} product={item} onAdd={handleAdd} />
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || loading}
          className="cursor-pointer bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : 'Checkout'}
        </button>
        <button
          onClick={handleClearCart}
          disabled={cartItems.length === 0 || loading}
          className="cursor-pointer bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed"   >
          Clear Cart
        </button>
      </div>
    </div>
  );
}