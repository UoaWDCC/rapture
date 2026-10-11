// Route tests for POST /api/checkout_sessions.
// Run:  npx vitest run app/api/checkout_sessions
//
// Stripe and next/headers are mocked so no network calls are made.
//
// ISSUES found while testing (not fixed):
// - A malformed JSON body returns 500 instead of 400.
// - Quantities (0, negative, non-numeric) are not validated before Stripe.
// - userId is taken from the request body with no auth check.
// - success/cancel urls are built from the client-controlled Origin header.

import { describe, it, expect, vi, beforeEach } from "vitest";

const { createSession } = vi.hoisted(() => ({ createSession: vi.fn() }));

vi.mock("@/lib/stripe", () => ({
  stripeClient: { checkout: { sessions: { create: createSession } } },
  Stripe: {},
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers({ origin: "https://rapture.example" })),
}));

import { POST } from "@/app/api/checkout_sessions/route";

const STRIPE_URL = "https://checkout.stripe.com/c/pay/cs_test_123";

function makeRequest(body: unknown) {
  return new Request("http://localhost:3000/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  createSession.mockReset();
  createSession.mockResolvedValue({ id: "cs_test_123", url: STRIPE_URL });
});

describe("POST /api/checkout_sessions", () => {
  it("creates a session from line_items and returns its url", async () => {
    const res = await POST(
      makeRequest({ line_items: [{ price: "price_a", quantity: 2 }] }),
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ url: STRIPE_URL });
    expect(createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        line_items: [{ price: "price_a", quantity: 2 }],
        success_url:
          "https://rapture.example/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://rapture.example/cart?canceled=true",
      }),
    );
  });

  it("creates a session from a single price_id", async () => {
    const res = await POST(makeRequest({ price_id: "price_a" }));

    expect(res.status).toBe(200);
    expect(createSession.mock.calls[0][0].line_items).toEqual([
      { price: "price_a", quantity: 1 },
    ]);
  });

  it("returns 400 when no valid price is given", async () => {
    const res = await POST(makeRequest({ line_items: [] }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Missing valid Stripe price(s)" });
    expect(createSession).not.toHaveBeenCalled();
  });

  it("returns Stripe's error message and status code", async () => {
    createSession.mockRejectedValueOnce(
      Object.assign(new Error("No such price: 'price_x'"), { statusCode: 400 }),
    );

    const res = await POST(makeRequest({ price_id: "price_x" }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "No such price: 'price_x'" });
  });

  it("returns 500 for an unexpected error", async () => {
    createSession.mockRejectedValueOnce("boom");

    const res = await POST(makeRequest({ price_id: "price_a" }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "An unexpected error occurred" });
  });
});
