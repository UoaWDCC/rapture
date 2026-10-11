import { describe, expect, it } from "vitest";
import {
  buildLoginUrl,
  getAuthRedirectQuery,
  getPostLoginPath,
  getSafeRedirectPath,
} from "@/lib/safeRedirect";

const params = (qs: string) => new URLSearchParams(qs);

describe("getSafeRedirectPath", () => {
  it("allows relative paths", () => {
    expect(getSafeRedirectPath("/news")).toBe("/news");
    expect(getSafeRedirectPath("/news?article=1")).toBe("/news?article=1");
  });

  it("falls back for missing or external targets", () => {
    expect(getSafeRedirectPath(null)).toBe("/");
    expect(getSafeRedirectPath("https://evil.com")).toBe("/");
    expect(getSafeRedirectPath("//evil.com")).toBe("/");
    expect(getSafeRedirectPath("/\\evil.com")).toBe("/");
    expect(getSafeRedirectPath("news")).toBe("/");
  });
});

describe("buildLoginUrl", () => {
  it("encodes next and intent", () => {
    expect(buildLoginUrl("/news", "subscribe")).toBe("/login?next=%2Fnews&intent=subscribe");
    expect(buildLoginUrl("/")).toBe("/login?next=%2F");
  });
});

describe("getPostLoginPath", () => {
  it("defaults to home", () => {
    expect(getPostLoginPath(params(""))).toBe("/");
  });

  it("returns next with the intent attached", () => {
    expect(getPostLoginPath(params("next=/news&intent=subscribe"))).toBe("/news?intent=subscribe");
    expect(getPostLoginPath(params("next=/news?article=5&intent=subscribe"))).toBe(
      "/news?article=5&intent=subscribe",
    );
  });

  it("drops unknown intents and unsafe targets", () => {
    expect(getPostLoginPath(params("next=/news&intent=deleteAccount"))).toBe("/news");
    expect(getPostLoginPath(params("next=//evil.com&intent=subscribe"))).toBe("/?intent=subscribe");
  });
});

describe("getAuthRedirectQuery", () => {
  it("keeps only next and a known intent", () => {
    expect(getAuthRedirectQuery(params("next=/news&intent=subscribe&x=1"))).toBe(
      "?next=%2Fnews&intent=subscribe",
    );
    expect(getAuthRedirectQuery(params("intent=nope"))).toBe("");
  });
});
