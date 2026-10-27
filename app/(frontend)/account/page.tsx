import UserDashboardVisual from "@/app/(frontend)/components/UserDashboardVisual";
import payloadConfig from "@/payload.config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

export default async function AccountPage() {
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    redirect("/login");
  }

  const ordersResult = await payload.find({
    collection: "order",
    where: {
      user: { equals: user.id },
    },
    depth: 2,
    sort: "-createdAt",
  });
  return (
    <main className="min-h-screen">
      <UserDashboardVisual user={user} orders={ordersResult.docs} />
    </main>
  );
}
