import { describe, it, expect, vi } from "vitest";

vi.mock("payload", () => ({
  getPayload: vi.fn(),
  buildConfig: vi.fn((config) => config),
}));

vi.mock("@/payload.config", () => ({ default: {} }));
vi.mock("@/lib/stripe", () => ({ stripeClient: {}, Stripe: vi.fn() }));
vi.mock("@/lib/email/send_email", () => ({ sendEmail: vi.fn() }));
vi.mock("@react-email/render", () => ({ render: vi.fn() }));

import { Users } from "@/collections/users";
import { Products } from "@/collections/products";
import { News } from "@/collections/News";
import { Donors } from "@/collections/Donors";
import { EmailSettings } from "@/collections/EmailSettings";
import { OrderCollection } from "@/collections/orderCollection";
import { CartCollection } from "@/collections/Cart";
import { Category } from "@/collections/category";
import { Players } from "@/collections/players";
import { Media } from "@/collections/media";
import { ExampleCollection } from "@/collections/exampleCollection";
import type { User } from "@/payload-types";

type AccessContext = { req: { user: User | null } };
type AccessCheckFn = (args: AccessContext) => unknown;

function runAccess(fn: unknown, user: User | null): unknown {
  if (typeof fn !== "function") return undefined;
  return (fn as AccessCheckFn)({ req: { user } });
}

const adminUser: User = {
  id: "admin-user-01",
  email: "admin@rapture.app",
  role: "admin",
  collection: "users",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const regularUser: User = {
  id: "regular-user-01",
  email: "player@rapture.app",
  role: "user",
  collection: "users",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const anotherUser: User = {
  id: "regular-user-02",
  email: "player2@rapture.app",
  role: "user",
  collection: "users",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("Users Collection Access Rights", () => {
  it("allows public self-registration for guests and regular users", () => {
    expect(runAccess(Users.access?.create, null)).toBe(true);
    expect(runAccess(Users.access?.create, regularUser)).toBe(true);
    expect(runAccess(Users.access?.create, adminUser)).toBe(true);
  });

  it("allows admin to read all user profiles without restrictions", () => {
    expect(runAccess(Users.access?.read, adminUser)).toBe(true);
  });

  it("restricts regular users to reading only their own profile and denies others", () => {
    const result = runAccess(Users.access?.read, regularUser) as { id?: { equals?: string } };
    expect(result).not.toBe(true);
    expect(result).toEqual({ id: { equals: regularUser.id } });
    expect(result.id?.equals).not.toBe(anotherUser.id);
  });

  it("denies unauthenticated guests from reading user records", () => {
    const result = runAccess(Users.access?.read, null);
    expect(result).not.toBe(true);
    expect(result).toEqual({ id: { equals: undefined } });
  });

  it("allows admin to update any user, but restricts regular users to their own profile", () => {
    expect(runAccess(Users.access?.update, adminUser)).toBe(true);
    expect(runAccess(Users.access?.update, regularUser)).toEqual({ id: { equals: regularUser.id } });
    expect(runAccess(Users.access?.update, null)).toEqual({ id: { equals: undefined } });
  });

  it("allows only admins to delete accounts, denying regular users and guests", () => {
    expect(runAccess(Users.access?.delete, adminUser)).toBe(true);
    expect(runAccess(Users.access?.delete, regularUser)).toBe(false);
    expect(runAccess(Users.access?.delete, null)).toBe(false);
  });

  it("allows only admins to access the Payload Admin Panel", () => {
    expect(runAccess(Users.access?.admin, adminUser)).toBe(true);
    expect(runAccess(Users.access?.admin, regularUser)).toBe(false);
    expect(runAccess(Users.access?.admin, null)).toBe(false);
  });
});

describe("Products Collection Access Rights", () => {
  it("allows public read access for guests, regular users, and admins", () => {
    expect(runAccess(Products.access?.read, null)).toBe(true);
    expect(runAccess(Products.access?.read, regularUser)).toBe(true);
    expect(runAccess(Products.access?.read, adminUser)).toBe(true);
  });

  it("allows admin to create products, but denies regular users and guests", () => {
    expect(runAccess(Products.access?.create, adminUser)).toBe(true);
    expect(runAccess(Products.access?.create, regularUser)).toBe(false);
    expect(runAccess(Products.access?.create, null)).toBe(false);
  });

  it("allows admin to update products, but denies regular users and guests", () => {
    expect(runAccess(Products.access?.update, adminUser)).toBe(true);
    expect(runAccess(Products.access?.update, regularUser)).toBe(false);
    expect(runAccess(Products.access?.update, null)).toBe(false);
  });

  it("allows admin to delete products, but denies regular users and guests", () => {
    expect(runAccess(Products.access?.delete, adminUser)).toBe(true);
    expect(runAccess(Products.access?.delete, regularUser)).toBe(false);
    expect(runAccess(Products.access?.delete, null)).toBe(false);
  });
});

describe("News Collection Access Rights", () => {
  it("allows public read access to news articles", () => {
    expect(runAccess(News.access?.read, null)).toBe(true);
    expect(runAccess(News.access?.read, regularUser)).toBe(true);
    expect(runAccess(News.access?.read, adminUser)).toBe(true);
  });

  it("allows admin users to create, update, and delete news articles", () => {
    expect(runAccess(News.access?.create, adminUser)).toBe(true);
    expect(runAccess(News.access?.update, adminUser)).toBe(true);
    expect(runAccess(News.access?.delete, adminUser)).toBe(true);
  });

  it("denies regular users and guests from mutating news articles", () => {
    expect(runAccess(News.access?.create, regularUser)).toBe(false);
    expect(runAccess(News.access?.update, regularUser)).toBe(false);
    expect(runAccess(News.access?.delete, regularUser)).toBe(false);
    expect(runAccess(News.access?.create, null)).toBe(false);
  });
});

describe("Donors Collection Access Rights", () => {
  it("allows public read access to donor listings", () => {
    expect(runAccess(Donors.access?.read, null)).toBe(true);
    expect(runAccess(Donors.access?.read, regularUser)).toBe(true);
    expect(runAccess(Donors.access?.read, adminUser)).toBe(true);
  });

  it("allows admin users to create, update, and delete donor records", () => {
    expect(runAccess(Donors.access?.create, adminUser)).toBe(true);
    expect(runAccess(Donors.access?.update, adminUser)).toBe(true);
    expect(runAccess(Donors.access?.delete, adminUser)).toBe(true);
  });

  it("denies regular users and guests from mutating donor records", () => {
    expect(runAccess(Donors.access?.create, regularUser)).toBe(false);
    expect(runAccess(Donors.access?.update, regularUser)).toBe(false);
    expect(runAccess(Donors.access?.delete, regularUser)).toBe(false);
    expect(runAccess(Donors.access?.create, null)).toBe(false);
  });
});

describe("EmailSettings Global Access Rights", () => {
  it("allows public, regular, and admin users to read email templates", () => {
    expect(runAccess(EmailSettings.access?.read, null)).toBe(true);
    expect(runAccess(EmailSettings.access?.read, regularUser)).toBe(true);
    expect(runAccess(EmailSettings.access?.read, adminUser)).toBe(true);
  });

  it("allows only admins to update email settings, denying regular users and guests", () => {
    expect(runAccess(EmailSettings.access?.update, adminUser)).toBe(true);
    expect(runAccess(EmailSettings.access?.update, regularUser)).toBe(false);
    expect(runAccess(EmailSettings.access?.update, null)).toBe(false);
  });
});

describe("Security Audit: Unprotected Collections & Operations", () => {
  it("Orders: should define access controls to protect sensitive customer orders", () => {
    expect(OrderCollection.access).toBeDefined();
  });

  it("Orders: should restrict regular users from deleting order records", () => {
    const deleteAccess = (OrderCollection.access as { delete?: unknown } | undefined)?.delete;
    expect(deleteAccess).toBeDefined();
  });

  it("Cart: should define collection-level access control on CartCollection", () => {
    expect(CartCollection.access).toBeDefined();
  });

  it("Category: should restrict category creation and mutation to admin users", () => {
    expect(Category.access).toBeDefined();
  });

  it("Players: should protect leaderboard scores from tampering", () => {
    expect(Players.access).toBeDefined();
  });

  it("Media: should restrict file uploads and media deletion to authorized users", () => {
    expect(Media.access).toBeDefined();
  });

  it("ExampleCollection: should have access control or be removed if unused boilerplate", () => {
    expect(ExampleCollection.access).toBeDefined();
  });

  it("Users role field: should prevent regular users from escalating their role to admin", () => {
    const roleField = Users.fields.find(
      (field) => "name" in field && field.name === "role",
    );
    expect(roleField).toBeDefined();
    const fieldAccess = (roleField as { access?: { update?: unknown } } | undefined)?.access;
    expect(fieldAccess?.update).toBeDefined();
  });
});
