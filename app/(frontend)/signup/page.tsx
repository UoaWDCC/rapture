import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import SignupForm from "../components/auth/SignupForm";

export default async function SignupPage() {
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });

  if (user) redirect("/account");

  return <SignupForm />;
}
