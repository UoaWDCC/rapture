"use server";

import { UpdateProfileState } from "@/app/(frontend)/components/UserDashboard/Profile";
import payloadConfig from "@/payload.config";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

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
    "cardInfo",
    "address",
    "state",
    "paymentCountry",
    "pincode",
  ];
  for (const field of fields) {
    const val = String(formData.get(field) ?? "").trim();
    if (val) data[field] = val;
  }

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
  const payload = await getPayload({ config: await payloadConfig });
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) redirect("/login");

  const cookieStore = await cookies();

  // Clear the Payload auth token cookie
  cookieStore.delete("payload-token");

  redirect("/login");
}
