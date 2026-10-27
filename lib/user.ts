"use server";

import { UpdateProfileState } from "@/app/(frontend)/components/UserDashboard/Profile";
import payloadConfig from "@/payload.config";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import { logout as payloadLogout } from "@payloadcms/next/auth";

export async function updateProfile(
  _prev: UpdateProfileState | null,
  formData: FormData,
): Promise<UpdateProfileState> {
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) redirect("/login");

  const data: Record<string, unknown> = {};
  const fields = [
    "username",
    "email",
    "realName",
    "country",
    "address",
    "state",
    "paymentCountry",
    "pincode",
  ];
  for (const field of fields) {
    const val = String(formData.get(field) ?? "").trim();
    if (val && val !== "Not Inserted") data[field] = val;
  }

  const newPassword = String(formData.get("newPassword") ?? "").trim();
  if (newPassword) data.password = newPassword;

  if (Object.keys(data).length === 0) {
    return { status: "error", message: "Nothing to update." };
  }

  try {
    await payload.update({ collection: "users", id: user.id, data, user });
    revalidatePath("/userDashboard");
    return { status: "success", message: "Profile updated successfully." };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Update failed.",
    };
  }
}

export async function logout(): Promise<void> {
  // Payload's own logout: ends the session on the server (so the old token stops working)
  // and deletes the auth cookie by its real name. Only deleting the cookie here left the
  // session valid, so users who "logged out" could still subscribe/unsubscribe etc.
  await payloadLogout({ config: payloadConfig });

  // Make sure server components (navbar, news page) re-render as logged out
  revalidatePath("/", "layout");
  redirect("/login");
}
