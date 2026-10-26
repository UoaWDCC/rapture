// Route tests for GET / POST / PATCH / DELETE /api/cart.
// Run:  npx vitest run app/api/cart
//
// Payload and next/headers are mocked so no database is needed.
//
// ISSUES found while testing (not fixed). Each one has a test below that
// asserts the expected behaviour, so these tests FAIL until the issue is fixed.
// - POST: an unknown productId returns 500 instead of 404.
// - POST / PATCH: a malformed JSON body returns 500 instead of 400.
// - POST: a non-numeric quantity is not validated; it becomes NaN and is sent
//   to Payload, which rejects it, so the route returns 500 instead of 400.
// - POST / PATCH: fractional quantities (e.g. 1.5) are saved. Checkout later
//   sends them to Stripe, which only accepts whole numbers.
// - PATCH: a non-numeric quantity removes the item from the cart.
// - PATCH: the updated item is moved to the end of the cart, so items reorder
//   on the cart page whenever a quantity changes.
// - DELETE: a malformed body is treated as "clear cart" and empties the cart.

import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  find: vi.fn(),
  findByID: vi.fn(),
  update: vi.fn(),
  create: vi.fn(),
}));

vi.mock("payload", () => ({ getPayload: vi.fn(async () => mocks) }));
vi.mock("@/payload.config", () => ({ default: {} }));
vi.mock("next/headers", () => ({ headers: vi.fn(async () => new Headers()) }));

import { GET, POST, PATCH, DELETE } from "@/app/api/cart/route";

const USER = { id: "user_1" };

function product(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    name: `Product ${id}`,
    description: `About ${id}`,
    price: 2500,
    currency: "NZD",
    stripePriceId: `price_${id}`,
    ...overrides,
  };
}

function cartWith(items: unknown[]) {
  return { id: "cart_1", user: USER.id, items };
}

function setCart(cart: ReturnType<typeof cartWith> | null) {
  mocks.find.mockResolvedValue({ docs: cart ? [cart] : [] });
}

function makeRequest(method: string, body?: unknown) {
  return new Request("http://localhost:3000/api/cart", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function makeRawRequest(method: string, body: string) {
  return new Request("http://localhost:3000/api/cart", {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  });
}

// items passed to the last payload.update / payload.create call
function savedItems(fn: typeof mocks.update) {
  return fn.mock.calls.at(-1)?.[0].data.items;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.auth.mockResolvedValue({ user: USER });
  setCart(null);
  mocks.findByID.mockImplementation(async ({ id }: { id: string }) =>
    product(id),
  );
  // echo back what was written, like Payload does (unpopulated relationships)
  mocks.update.mockImplementation(
    async ({ id, data }: { id: string; data: object }) => ({ id, ...data }),
  );
  mocks.create.mockImplementation(async ({ data }: { data: object }) => ({
    id: "cart_new",
    ...data,
  }));
});

describe("GET /api/cart", () => {
  it("returns an empty cart for a guest without querying the database", async () => {
    mocks.auth.mockResolvedValue({ user: null });

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ items: [] });
    expect(mocks.find).not.toHaveBeenCalled();
  });

  it("looks up the cart belonging to the logged in user", async () => {
    await GET();

    expect(mocks.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "Cart",
        where: { user: { equals: USER.id } },
        limit: 1,
      }),
    );
  });

  it("returns an empty list when the user has no cart", async () => {
    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ items: [] });
  });

  it("returns normalised items with populated product details", async () => {
    setCart(
      cartWith([
        { id: "row_1", product: product("a"), quantity: 2 },
        {
          id: "row_2",
          product: product("b", {
            description: null,
            currency: null,
            stripePriceId: null,
          }),
          quantity: 1,
        },
      ]),
    );

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      items: [
        {
          productId: "a",
          quantity: 2,
          stripePriceId: "price_a",
          product: {
            id: "a",
            name: "Product a",
            description: "About a",
            price: 2500,
            currency: "NZD",
            stripePriceId: "price_a",
          },
        },
        {
          productId: "b",
          quantity: 1,
          stripePriceId: null,
          product: {
            id: "b",
            name: "Product b",
            description: "",
            price: 2500,
            currency: "NZD",
            stripePriceId: null,
          },
        },
      ],
    });
  });

  it("returns a null product when the relationship is not populated", async () => {
    setCart(cartWith([{ product: "a", quantity: 3 }]));

    const res = await GET();

    expect(await res.json()).toEqual({
      items: [
        { productId: "a", quantity: 3, stripePriceId: null, product: null },
      ],
    });
  });

  it("returns 500 with an empty list when Payload throws", async () => {
    mocks.find.mockRejectedValueOnce(new Error("db down"));

    const res = await GET();

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ items: [] });
  });
});

describe("POST /api/cart", () => {
  it("returns 401 for a guest", async () => {
    mocks.auth.mockResolvedValue({ user: null });

    const res = await POST(makeRequest("POST", { productId: "a" }));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it.each([{}, { productId: "" }, { productId: "   " }])(
    "returns 400 when productId is missing (%o)",
    async (body) => {
      const res = await POST(makeRequest("POST", body));

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({ error: "Missing productId" });
      expect(mocks.findByID).not.toHaveBeenCalled();
    },
  );

  it("creates a cart for the user when they do not have one", async () => {
    const res = await POST(
      makeRequest("POST", { productId: "a", quantity: 2 }),
    );

    expect(res.status).toBe(200);
    expect(mocks.create).toHaveBeenCalledWith({
      collection: "Cart",
      data: {
        user: USER.id,
        items: [{ product: "a", stripePriceId: "price_a", quantity: 2 }],
      },
    });
    expect(mocks.update).not.toHaveBeenCalled();
    expect(await res.json()).toEqual({
      success: true,
      items: [
        {
          productId: "a",
          quantity: 2,
          stripePriceId: "price_a",
          product: null,
        },
      ],
    });
  });

  it("trims the productId before looking up the product", async () => {
    await POST(makeRequest("POST", { productId: "  a  " }));

    expect(mocks.findByID).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "products", id: "a" }),
    );
  });

  it("defaults quantity to 1", async () => {
    await POST(makeRequest("POST", { productId: "a" }));

    expect(savedItems(mocks.create)).toEqual([
      { product: "a", stripePriceId: "price_a", quantity: 1 },
    ]);
  });

  it.each([0, -3])("raises a quantity of %d to 1", async (quantity) => {
    await POST(makeRequest("POST", { productId: "a", quantity }));

    expect(savedItems(mocks.create)?.[0].quantity).toBe(1);
  });

  it("appends a new product to an existing cart", async () => {
    setCart(cartWith([{ id: "row_1", product: product("a"), quantity: 1 }]));

    const res = await POST(makeRequest("POST", { productId: "b" }));

    expect(res.status).toBe(200);
    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.update).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "Cart", id: "cart_1" }),
    );
    expect(savedItems(mocks.update)).toEqual([
      { id: "row_1", product: product("a"), quantity: 1 },
      { product: "b", stripePriceId: "price_b", quantity: 1 },
    ]);
  });

  it("adds to the quantity of a product already in the cart (populated)", async () => {
    setCart(cartWith([{ id: "row_1", product: product("a"), quantity: 2 }]));

    await POST(makeRequest("POST", { productId: "a", quantity: 3 }));

    expect(savedItems(mocks.update)).toEqual([
      {
        id: "row_1",
        product: product("a"),
        quantity: 5,
        stripePriceId: "price_a",
      },
    ]);
  });

  it("adds to the quantity of a product already in the cart (unpopulated)", async () => {
    setCart(cartWith([{ id: "row_1", product: "a", quantity: 1 }]));

    await POST(makeRequest("POST", { productId: "a" }));

    expect(savedItems(mocks.update)).toHaveLength(1);
    expect(savedItems(mocks.update)?.[0].quantity).toBe(2);
  });

  it("returns 500 with the error message when saving fails", async () => {
    setCart(cartWith([]));
    mocks.update.mockRejectedValueOnce(new Error("write failed"));

    const res = await POST(makeRequest("POST", { productId: "a" }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "write failed" });
  });

  it("returns 500 when authentication throws", async () => {
    mocks.auth.mockRejectedValueOnce(new Error("bad token"));

    const res = await POST(makeRequest("POST", { productId: "a" }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "bad token" });
  });

  // ---- known issues (see top of file) ----

  it("returns 404 when the product does not exist", async () => {
    mocks.findByID.mockRejectedValueOnce(
      Object.assign(new Error("Not Found"), { status: 404 }),
    );

    const res = await POST(makeRequest("POST", { productId: "missing" }));

    expect(res.status).toBe(404);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(makeRawRequest("POST", "{not json"));

    expect(res.status).toBe(400);
  });

  it("returns 400 for a non-numeric quantity", async () => {
    const res = await POST(
      makeRequest("POST", { productId: "a", quantity: "abc" }),
    );

    expect(mocks.create).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });

  it("returns 400 for a fractional quantity", async () => {
    const res = await POST(
      makeRequest("POST", { productId: "a", quantity: 1.5 }),
    );

    expect(mocks.create).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/cart", () => {
  it("returns 401 for a guest", async () => {
    mocks.auth.mockResolvedValue({ user: null });

    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: 2 }),
    );

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("returns 404 when the user has no cart", async () => {
    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: 2 }),
    );

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Cart not found" });
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("returns 400 when productId is missing", async () => {
    setCart(cartWith([{ product: "a", quantity: 1 }]));

    const res = await PATCH(makeRequest("PATCH", { quantity: 2 }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Missing productId" });
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("sets the quantity of an item in the cart", async () => {
    setCart(
      cartWith([
        { id: "row_1", product: product("a"), quantity: 1 },
        { id: "row_2", product: "b", quantity: 4 },
      ]),
    );

    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: 3 }),
    );

    expect(res.status).toBe(200);
    expect(mocks.update).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "Cart", id: "cart_1" }),
    );
    expect(savedItems(mocks.update)).toEqual(
      expect.arrayContaining([
        { id: "row_2", product: "b", quantity: 4 },
        { product: "a", stripePriceId: "", quantity: 3 },
      ]),
    );
    expect(savedItems(mocks.update)).toHaveLength(2);
    expect((await res.json()).success).toBe(true);
  });

  it.each([0, -1, undefined])(
    "removes the item when quantity is %s",
    async (quantity) => {
      setCart(
        cartWith([
          { id: "row_1", product: "a", quantity: 1 },
          { id: "row_2", product: "b", quantity: 2 },
        ]),
      );

      const res = await PATCH(makeRequest("PATCH", { productId: "a", quantity }));

      expect(res.status).toBe(200);
      expect(savedItems(mocks.update)).toEqual([
        { id: "row_2", product: "b", quantity: 2 },
      ]);
    },
  );

  it("returns 500 with the error message when saving fails", async () => {
    setCart(cartWith([{ product: "a", quantity: 1 }]));
    mocks.update.mockRejectedValueOnce(new Error("write failed"));

    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: 2 }),
    );

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "write failed" });
  });

  // ---- known issues (see top of file) ----

  it("returns 400 for a malformed JSON body", async () => {
    setCart(cartWith([{ product: "a", quantity: 1 }]));

    const res = await PATCH(makeRawRequest("PATCH", "{not json"));

    expect(res.status).toBe(400);
  });

  it("returns 400 instead of removing the item for a non-numeric quantity", async () => {
    setCart(cartWith([{ product: "a", quantity: 2 }]));

    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: "abc" }),
    );

    expect(res.status).toBe(400);
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("returns 400 for a fractional quantity", async () => {
    setCart(cartWith([{ product: "a", quantity: 2 }]));

    const res = await PATCH(
      makeRequest("PATCH", { productId: "a", quantity: 1.5 }),
    );

    expect(mocks.update).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });

  it("keeps the item in the same position when its quantity changes", async () => {
    setCart(
      cartWith([
        { id: "row_1", product: "a", quantity: 1 },
        { id: "row_2", product: "b", quantity: 1 },
      ]),
    );

    await PATCH(makeRequest("PATCH", { productId: "a", quantity: 2 }));

    const order = savedItems(mocks.update)?.map(
      (item: { product: string }) => item.product,
    );
    expect(order).toEqual(["a", "b"]);
  });
});

describe("DELETE /api/cart", () => {
  it("returns 401 for a guest", async () => {
    mocks.auth.mockResolvedValue({ user: null });

    const res = await DELETE(makeRequest("DELETE", { productId: "a" }));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("returns an empty list when the user has no cart", async () => {
    const res = await DELETE(makeRequest("DELETE", { productId: "a" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ items: [] });
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("removes only the given product", async () => {
    setCart(
      cartWith([
        { id: "row_1", product: product("a"), quantity: 1 },
        { id: "row_2", product: "b", quantity: 2 },
      ]),
    );

    const res = await DELETE(makeRequest("DELETE", { productId: "a" }));

    expect(res.status).toBe(200);
    expect(mocks.update).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "Cart", id: "cart_1" }),
    );
    expect(savedItems(mocks.update)).toEqual([
      { id: "row_2", product: "b", quantity: 2 },
    ]);
    expect(await res.json()).toEqual({
      success: true,
      items: [
        { productId: "b", quantity: 2, stripePriceId: null, product: null },
      ],
    });
  });

  it("leaves the cart unchanged when the product is not in it", async () => {
    setCart(cartWith([{ id: "row_1", product: "a", quantity: 1 }]));

    const res = await DELETE(makeRequest("DELETE", { productId: "zzz" }));

    expect(res.status).toBe(200);
    expect(savedItems(mocks.update)).toEqual([
      { id: "row_1", product: "a", quantity: 1 },
    ]);
  });

  it.each([{}, undefined])(
    "clears the whole cart when no productId is given (body: %o)",
    async (body) => {
      setCart(
        cartWith([
          { product: "a", quantity: 1 },
          { product: "b", quantity: 2 },
        ]),
      );

      const res = await DELETE(makeRequest("DELETE", body));

      expect(res.status).toBe(200);
      expect(savedItems(mocks.update)).toEqual([]);
      expect(await res.json()).toEqual({ success: true, items: [] });
    },
  );

  it("returns 500 with the error message when saving fails", async () => {
    setCart(cartWith([{ product: "a", quantity: 1 }]));
    mocks.update.mockRejectedValueOnce(new Error("write failed"));

    const res = await DELETE(makeRequest("DELETE", { productId: "a" }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "write failed" });
  });

  // ---- known issues (see top of file) ----

  it("does not clear the cart when the body is malformed", async () => {
    setCart(cartWith([{ product: "a", quantity: 1 }]));

    const res = await DELETE(makeRawRequest("DELETE", "{not json"));

    expect(res.status).toBe(400);
    expect(mocks.update).not.toHaveBeenCalled();
  });
});
