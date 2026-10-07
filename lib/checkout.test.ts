// Checkout / purchase tests: creating the Stripe session, recording the order
// on the success page, and the order confirmation emails.
// Run:  npx vitest run lib/checkout.test.ts
//
// Uses the real Stripe TEST API (STRIPE_SECRET_KEY=sk_test_... in .env).
// Mocked: next/headers, next/navigation, Payload and sendEmail.
// Stripe can't pay a Checkout Session through the API, so the "paid" tests
// use a real session with its status overridden.
//
// FAILING TESTS (bugs found, not fixed):
// - A malformed JSON body returns 500 instead of 400.
// - A blank price_id ("   ") gets past the route's check and returns Stripe's
//   raw "empty string" error instead of "Missing valid Stripe price(s)".
// - An expired session renders a blank success page.
// - Reloading the success page overwrites the order's dateTime.
// - The order email hook reads doc.products, but the field is items, so
//   confirmation emails never list the purchased items.
//
// OTHER ISSUES (tests pass, but worth a look):
// - A paid order isn't saved if the user's login has expired by the time they
//   return from Stripe, because the cart page never sends userId.
// - Paid items whose product isn't in Payload are silently left off the order.
// - Quantities (0, negative, non-numeric) aren't validated by the route;
//   they only fail because Stripe rejects them.
// - A session_id that doesn't exist throws, showing Next's error page.

import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";

const { headersMock, redirectMock, payloadMock, sendEmailMock } = vi.hoisted(
  () => {
    // Runs before the imports below, so lib/stripe sees the key.
    try {
      process.loadEnvFile();
    } catch {
      // no .env file, caught by the check below
    }
    if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
      throw new Error("These tests need a Stripe TEST key (sk_test_...) in .env");
    }

    return {
      headersMock: vi.fn(),
      // the real redirect() throws to stop rendering
      redirectMock: vi.fn((url: string) => {
        throw new Error(`NEXT_REDIRECT ${url}`);
      }),
      payloadMock: {
        auth: vi.fn(),
        find: vi.fn(),
        findByID: vi.fn(),
        findGlobal: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      sendEmailMock: vi.fn(),
    };
  },
);

vi.mock("next/headers", () => ({ headers: headersMock }));
vi.mock("next/navigation", () => ({ redirect: redirectMock }));
vi.mock("payload", () => ({ getPayload: vi.fn(async () => payloadMock) }));
vi.mock("@/payload.config", () => ({ default: {} }));
vi.mock("@/lib/email/send_email", () => ({ sendEmail: sendEmailMock }));

import { POST } from "@/app/api/checkout_sessions/route";
import SuccessPage from "@/app/(frontend)/success/page";
import { OrderCollection } from "@/collections/orderCollection";
import { stripeClient, Stripe } from "@/lib/stripe";

const ORIGIN = "https://rapture.example";

let tee: Stripe.Price; // $35.00
let hoodie: Stripe.Price; // $60.00
let archived: Stripe.Price; // inactive
const createdSessions: string[] = [];

// What Payload "has" in each test, reset in beforeEach.
let payloadProducts: Record<string, string>; // stripeProductId -> Payload id
let payloadOrders: { id: string; dateTime?: string }[];

// Product first, then price: a price made with product_data becomes the
// product's default price, and Stripe won't let us archive that afterwards.
async function createTestPrice(name: string, unit_amount: number) {
  const product = await stripeClient.products.create({ name });
  return stripeClient.prices.create({
    product: product.id,
    unit_amount,
    currency: "nzd",
  });
}

async function createTestSession() {
  const session = await stripeClient.checkout.sessions.create({
    mode: "payment",
    line_items: [
      { price: tee.id, quantity: 2 },
      { price: hoodie.id, quantity: 1 },
    ],
    success_url: `${ORIGIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: { userId: "user_123" },
  });
  createdSessions.push(session.id);
  return session;
}

beforeAll(async () => {
  [tee, hoodie, archived] = await Promise.all([
    createTestPrice("Vitest Tee", 3500),
    createTestPrice("Vitest Hoodie", 6000),
    createTestPrice("Vitest Archived", 1000),
  ]);
  await stripeClient.prices.update(archived.id, { active: false });
}, 30_000);

afterAll(async () => {
  await Promise.allSettled([
    ...createdSessions.map((id) => stripeClient.checkout.sessions.expire(id)),
    ...[tee, hoodie, archived].flatMap((price) => [
      stripeClient.prices.update(price.id, { active: false }),
      stripeClient.products.update(String(price.product), { active: false }),
    ]),
  ]);
}, 30_000);

beforeEach(() => {
  vi.resetAllMocks();
  vi.restoreAllMocks(); // undo vi.spyOn from the previous test

  payloadProducts = {
    [String(tee.product)]: "payload_tee",
    [String(hoodie.product)]: "payload_hoodie",
  };
  payloadOrders = [];

  headersMock.mockResolvedValue(new Headers({ origin: ORIGIN }));
  payloadMock.auth.mockResolvedValue({ user: null });
  payloadMock.find.mockImplementation(async ({ collection, where }) => {
    if (collection === "products") {
      const id = payloadProducts[where.stripeProductId.equals];
      return { docs: id ? [{ id }] : [] };
    }
    if (collection === "order") return { docs: payloadOrders };
    return { docs: [] }; // users (admins)
  });
  payloadMock.findByID.mockResolvedValue({ email: "buyer@example.com" });
  payloadMock.findGlobal.mockResolvedValue({});
});

// ---------------------------------------------------------------------------

describe("POST /api/checkout_sessions (real Stripe)", { timeout: 20_000 }, () => {
  function checkout(body: unknown) {
    return POST(
      new Request("http://localhost:3000/api/checkout_sessions", {
        method: "POST",
        // strings are sent as-is so we can test malformed JSON
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
    );
  }

  it("creates a session with the cart's items, quantities and total", async () => {
    const res = await checkout({
      line_items: [
        { price: tee.id, quantity: 2 },
        { price: hoodie.id, quantity: 1 },
      ],
      userId: "user_123",
    });

    expect(res.status).toBe(200);
    const { url } = await res.json();
    const id = url.match(/cs_test_[A-Za-z0-9]+/)[0];
    createdSessions.push(id);

    const session = await stripeClient.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });
    expect(session.status).toBe("open");
    expect(session.amount_total).toBe(3500 * 2 + 6000);
    expect(
      session.line_items?.data.map((item) => [item.price?.id, item.quantity]),
    ).toEqual([
      [tee.id, 2],
      [hoodie.id, 1],
    ]);
    expect(session.metadata).toEqual({ userId: "user_123" });
    expect(session.success_url).toBe(
      `${ORIGIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    );
  });

  it.each([
    ["an empty body", {}],
    ["empty line_items", { line_items: [] }],
    ["a blank price_id", { price_id: "   " }], // FAILS: reaches Stripe
  ])("returns 400 for %s", async (_name, body) => {
    const res = await checkout(body);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Missing valid Stripe price(s)" });
  });

  it.each([
    ["a price that doesn't exist", "price_doesnotexist", /no such price/i],
    ["an archived price", () => archived.id, /inactive/i],
  ])("returns Stripe's 400 for %s", async (_name, price, message) => {
    const priceId = typeof price === "function" ? price() : price;
    const res = await checkout({ price_id: priceId });

    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(message);
  });

  it.each([0, -1, "abc"])("returns 400 for quantity %s", async (quantity) => {
    const res = await checkout({ line_items: [{ price: tee.id, quantity }] });

    expect(res.status).toBe(400);
  });

  // FAILS: returns 500
  it("returns 400 for a malformed JSON body", async () => {
    const res = await checkout("{not json");

    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------

describe("Success page: recording the order", { timeout: 20_000 }, () => {
  // A real open session (2 x tee + 1 x hoodie), fetched the way the page does.
  let openSession: Stripe.Checkout.Session;

  beforeAll(async () => {
    const { id } = await createTestSession();
    openSession = await stripeClient.checkout.sessions.retrieve(id, {
      expand: ["line_items", "payment_intent", "line_items.data.price.product"],
    });
  }, 30_000);

  function visit(session_id?: string) {
    return SuccessPage({ searchParams: Promise.resolve({ session_id }) });
  }

  // The real session, as if the customer had paid.
  function mockPaidSession(overrides: Partial<Stripe.Checkout.Session> = {}) {
    vi.spyOn(stripeClient.checkout.sessions, "retrieve").mockResolvedValueOnce({
      ...openSession,
      status: "complete",
      payment_intent: "pi_test_123",
      customer_details: { email: "buyer@example.com" },
      ...overrides,
    } as never);
  }

  const createdOrder = () => payloadMock.create.mock.calls[0]?.[0].data;

  it("throws when there's no session_id", async () => {
    await expect(visit()).rejects.toThrow(/valid session_id/);
  });

  it("throws Stripe's error for a session that doesn't exist", async () => {
    await expect(visit("cs_test_doesnotexist")).rejects.toThrow(
      /no such checkout\.session/i,
    );
    expect(payloadMock.create).not.toHaveBeenCalled();
  });

  it("saves an unpaid session as a pending order and redirects home", async () => {
    await expect(visit(openSession.id)).rejects.toThrow("NEXT_REDIRECT /");
    expect(createdOrder()).toMatchObject({ status: "pending" });
  });

  // FAILS: the page returns nothing for an expired session
  it("redirects home for an expired session instead of rendering a blank page", async () => {
    const { id } = await createTestSession();
    await stripeClient.checkout.sessions.expire(id);

    await expect(visit(id)).rejects.toThrow("NEXT_REDIRECT /");
  });

  it("creates a payment_completed order for the logged-in user", async () => {
    payloadMock.auth.mockResolvedValue({ user: { id: "user_123" } });
    mockPaidSession();

    await visit(openSession.id);

    expect(payloadMock.create).toHaveBeenCalledTimes(1);
    expect(createdOrder()).toMatchObject({
      user: "user_123",
      status: "payment_completed",
      items: [
        { product: "payload_tee", quantity: 2 },
        { product: "payload_hoodie", quantity: 1 },
      ],
      stripeCheckoutSessionId: openSession.id,
      stripePaymentIntentId: "pi_test_123",
      customerEmail: "buyer@example.com",
      totalPrice: 130,
    });
  });

  it("uses metadata.userId when the user isn't logged in", async () => {
    mockPaidSession();

    await visit(openSession.id);

    expect(createdOrder().user).toBe("user_123");
  });

  it("doesn't save the order with no logged-in user and no metadata.userId", async () => {
    mockPaidSession({ metadata: {} });

    await visit(openSession.id);

    expect(payloadMock.create).not.toHaveBeenCalled();
  });

  it("leaves paid items off the order when their product isn't in Payload", async () => {
    delete payloadProducts[String(hoodie.product)];
    mockPaidSession();

    await visit(openSession.id);

    expect(createdOrder().items).toEqual([
      { product: "payload_tee", quantity: 2 },
    ]);
  });

  it("updates the existing order instead of creating a duplicate", async () => {
    payloadOrders = [{ id: "order_1" }];
    mockPaidSession();

    await visit(openSession.id);

    expect(payloadMock.create).not.toHaveBeenCalled();
    expect(payloadMock.update.mock.calls[0][0]).toMatchObject({
      id: "order_1",
      data: { status: "payment_completed" },
    });
  });

  // FAILS: dateTime is reset to now on every visit
  it("keeps the original order date when the page is reloaded", async () => {
    const originalDate = "2026-01-01T00:00:00.000Z";
    payloadOrders = [{ id: "order_1", dateTime: originalDate }];
    mockPaidSession();

    await visit(openSession.id);

    const { data } = payloadMock.update.mock.calls[0][0];
    expect(data.dateTime ?? originalDate).toBe(originalDate);
  });
});

// ---------------------------------------------------------------------------

describe("Order confirmation emails (order afterChange hook)", () => {
  const afterChange = OrderCollection.hooks!.afterChange![0];

  const order = {
    id: "6650f1c2a9b8c7d6e5f4a3b2",
    user: "user_123",
    items: [{ product: { name: "Rapture Tee", price: 35 }, quantity: 2 }],
    totalPrice: 70,
    dateTime: "2026-10-07T00:00:00.000Z",
  };

  function runHook(operation: "create" | "update" = "create") {
    return afterChange({
      doc: order,
      operation,
      req: { payload: payloadMock },
    } as unknown as Parameters<typeof afterChange>[0]);
  }

  it("emails the customer and all admins when an order is created", async () => {
    payloadMock.find.mockResolvedValue({
      docs: [{ email: "a1@example.com" }, { email: "a2@example.com" }],
    });

    await runHook();

    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "buyer@example.com",
        subject: "Order Confirmation",
      }),
    );
    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["a1@example.com", "a2@example.com"],
        subject: "New Order Received",
        html: expect.stringContaining("buyer@example.com"),
      }),
    );
  });

  it("doesn't send emails when an order is updated", async () => {
    await runHook("update");

    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  // FAILS: the hook reads doc.products instead of doc.items
  it("lists the purchased items in the confirmation email", async () => {
    await runHook();

    expect(sendEmailMock.mock.calls[0][0].html).toContain("Rapture Tee");
  });

  it("logs instead of throwing when the user lookup fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    payloadMock.findByID.mockRejectedValue(new Error("user not found"));

    await expect(runHook()).resolves.toBeUndefined();
    expect(consoleError).toHaveBeenCalledWith(
      "Failed to send purchase emails",
      expect.any(Error),
    );
  });
});
