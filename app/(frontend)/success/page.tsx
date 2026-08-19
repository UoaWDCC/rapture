import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";
import { stripeClient, Stripe } from "@/lib/stripe";
import Link from "next/link";

interface SuccessProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessProps) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session: Stripe.Checkout.Session =
    await stripeClient.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent", "line_items.data.price.product"],
    });

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email ?? session.customer_email ?? "";

  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });

  const orderItems = await Promise.all(
    (session.line_items?.data ?? []).map(async (item) => {
      const product = item.price?.product;
      const stripeProductId =
        typeof product === "string" ? product : product?.id;
      const quantity = Number(item.quantity ?? 1);

      if (!stripeProductId) {
        return null;
      }

      const result = await payload.find({
        collection: "products",
        where: {
          stripeProductId: { equals: stripeProductId },
        },
        limit: 1,
      });

      const productDoc = result.docs[0];
      if (!productDoc) {
        return null;
      }

      return {
        product: productDoc.id,
        quantity,
      };
    }),
  );

  const orderStatus = status === "complete" ? "payment_completed" : "pending";
  const orderData: any = {
    user:
      user?.id ?? (session.metadata?.userId as string | undefined) ?? undefined,
    status: orderStatus,
    items: orderItems.filter(Boolean),
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? ""),
    customerEmail,
    totalPrice: Number(((session.amount_total ?? 0) / 100).toFixed(2)),
    shippingAddress: {
      address: customer_details?.address?.line1 ?? "",
      state: customer_details?.address?.state ?? "",
      country: customer_details?.address?.country ?? "",
      pincode: customer_details?.address?.postal_code ?? "",
    },
    dateTime: new Date(),
  };

  const existingOrder = await payload.find({
    collection: "order",
    where: {
      stripeCheckoutSessionId: { equals: session.id },
    },
    limit: 1,
  });

  if (existingOrder.docs.length > 0) {
    await payload.update({
      collection: "order",
      id: existingOrder.docs[0].id,
      data: orderData as any,
      user: user ?? undefined,
    });
  } else if (user?.id || session.metadata?.userId) {
    await payload.create({
      collection: "order",
      data: {
        ...orderData,
        user: user?.id ?? (session.metadata?.userId as string),
      } as any,
      user: user ?? undefined,
    });
  }

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="flex flex-col justify-center items-center px-4 py-8 gap-4"
      >
        <div className="bg-background border border-border rounded-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-13 h-13 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium mb-1">Order confirmed</h2>
            <p className="text-sm text-muted-foreground">
              Thanks for your purchase!
            </p>
          </div>

          <div className="bg-muted rounded-lg px-5 py-4 mb-6 flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-1">
              Confirmation sent to
            </p>
            <p className="text-sm font-medium">{customerEmail}</p>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Questions about your order? Email us at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </div>
        <div className="flex items-center">
          <Link
            className="bg-foreground transition duration-200 hover:bg-sky-700 text-background rounded-lg p-3"
            href="/cart"
          >
            Go back to Cart
          </Link>
        </div>
      </section>
    );
  }
}
