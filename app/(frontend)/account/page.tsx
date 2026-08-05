import UserDashboardVisual from "@/app/(frontend)/components/UserDashboardVisual";
import payloadConfig from "@/payload.config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import { use } from "react";

export default async function AccountPage() {
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen">
      <UserDashboardVisual user={user} />
    </main>
  );
}
