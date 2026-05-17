import { redirect } from 'next/navigation'

import { stripeClient, Stripe } from '@/lib/stripe'
import Link from 'next/link'
interface SuccessProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessProps) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session: Stripe.Checkout.Session = await stripeClient.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success" className="flex flex-col justify-center items-center px-4 py-8 gap-4">
        <div className="bg-background border border-border rounded-xl p-8 max-w-md w-full">

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-13 h-13 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-lg font-medium mb-1">Order confirmed</h2>
            <p className="text-sm text-muted-foreground">Thanks for your purchase!</p>
          </div>

          <div className="bg-muted rounded-lg px-5 py-4 mb-6 flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-1">Confirmation sent to</p>
            <p className="text-sm font-medium">{customerEmail}</p>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Questions about your order? Email us at{" "}
            <a href="mailto:orders@example.com" className="text-blue-600 hover:underline">
              orders@example.com
            </a>
          </p>

        </div>
        <div className='flex items-center'>
          <Link
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href="/cart"
          >
            Go back to Cart
          </Link>
        </div>
      </section>
    )
  }
}