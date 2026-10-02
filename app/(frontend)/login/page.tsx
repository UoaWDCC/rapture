import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import LoginForm from "../components/auth/LoginForm";

export default async function LoginPage() {
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });

  if (user) redirect("/account");

  return <LoginForm />;
}
