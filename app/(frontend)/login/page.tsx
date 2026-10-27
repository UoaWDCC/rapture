import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { getPostLoginPath } from "@/lib/safeRedirect";
import LoginClient from "./LoginClient";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  // Already logged in: skip the form. Go to ?next (keeping e.g. intent=subscribe) or the account page.
  if (user) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(await searchParams)) {
      if (typeof value === "string") params.set(key, value);
    }
    redirect(getPostLoginPath(params, "/account"));
  }

  return <LoginClient />;
}
