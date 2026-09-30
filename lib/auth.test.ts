import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  state: [] as unknown[],
  stateIndex: 0,
  push: vi.fn(),
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();

  return {
    ...actual,
    useState: (initialValue: unknown) => {
      const index = mocks.stateIndex++;
      if (index >= mocks.state.length) mocks.state.push(initialValue);

      return [
        mocks.state[index],
        (value: unknown) => {
          mocks.state[index] = value;
        },
      ];
    },
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push }),
}));

import LoginForm from "../app/(frontend)/components/auth/LoginForm";
import SignupForm from "../app/(frontend)/components/auth/SignupForm";

type FormComponent = () => ReactElement;
type TestElement = ReactElement<Record<string, unknown>>;

function renderForm(component: FormComponent): TestElement {
  mocks.stateIndex = 0;
  return component() as TestElement;
}

function findElement(
  node: unknown,
  predicate: (element: TestElement) => boolean,
): TestElement | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const match = findElement(child, predicate);
      if (match) return match;
    }
    return undefined;
  }

  if (typeof node !== "object" || node === null || !("props" in node)) {
    return undefined;
  }

  const element = node as TestElement;
  if (predicate(element)) return element;
  return findElement(element.props.children, predicate);
}

function updateInput(
  tree: TestElement,
  placeholder: string,
  value: string,
): void {
  const input = findElement(
    tree,
    (element) => element.props.placeholder === placeholder,
  );
  expect(input).toBeDefined();
  (input?.props.onChange as (event: { target: { value: string } }) => void)({
    target: { value },
  });
}

async function submitForm(
  component: FormComponent,
  fields: Record<string, string>,
): Promise<TestElement> {
  const initialTree = renderForm(component);
  for (const [placeholder, value] of Object.entries(fields)) {
    updateInput(initialTree, placeholder, value);
  }

  const updatedTree = renderForm(component);
  const form = findElement(updatedTree, (element) => element.type === "form");
  expect(form).toBeDefined();
  await (form?.props.onSubmit as (event: { preventDefault: () => void }) => Promise<void>)(
    { preventDefault: vi.fn() },
  );

  return renderForm(component);
}

function renderedText(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(renderedText).join("");
  if (typeof node !== "object" || node === null || !("props" in node)) return "";
  return renderedText((node as TestElement).props.children);
}

beforeEach(() => {
  mocks.state = [];
  mocks.stateIndex = 0;
  mocks.push.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LoginForm submission", () => {
  it("posts credentials and navigates after a successful login", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ user: { id: "user-1" } }), { status: 200 }),
    );
    vi.stubGlobal("fetch", request);

    await submitForm(LoginForm, {
      email: "player@example.com",
      password: "secret",
    });

    expect(request).toHaveBeenCalledWith("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "player@example.com", password: "secret" }),
    });
    expect(mocks.push).toHaveBeenCalledWith("/account");
  });

  it("shows the server error for rejected credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ errors: [{ message: "Invalid credentials" }] }), {
          status: 401,
        }),
      ),
    );

    const tree = await submitForm(LoginForm, {
      email: "player@example.com",
      password: "wrong",
    });

    expect(renderedText(tree)).toContain("Invalid credentials");
    expect(mocks.push).not.toHaveBeenCalled();
  });
});

describe("SignupForm submission", () => {
  it("posts matching credentials and navigates after successful signup", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ doc: { id: "user-1" } }), { status: 201 }),
    );
    vi.stubGlobal("fetch", request);

    await submitForm(SignupForm, {
      email: "player@example.com",
      password: "secret",
      "confirm password": "secret",
    });

    expect(request).toHaveBeenCalledWith("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "player@example.com", password: "secret" }),
    });
    expect(mocks.push).toHaveBeenCalledWith("/account");
  });

  it("does not submit when the passwords do not match", async () => {
    const request = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", request);

    const tree = await submitForm(SignupForm, {
      email: "player@example.com",
      password: "secret",
      "confirm password": "different",
    });

    expect(request).not.toHaveBeenCalled();
    expect(renderedText(tree)).toContain("Passwords do not match.");
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("shows the server error when account creation is rejected", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ errors: [{ message: "Email already exists" }] }), {
          status: 409,
        }),
      ),
    );

    const tree = await submitForm(SignupForm, {
      email: "player@example.com",
      password: "secret",
      "confirm password": "secret",
    });

    expect(renderedText(tree)).toContain("Email already exists");
    expect(mocks.push).not.toHaveBeenCalled();
  });
});
