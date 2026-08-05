"use client";

import { useActionState } from "react";
import { colorToRgba } from "@/lib/colour";
import GlowingHeader from "../ui/GlowingHeader";
import { User } from "@/payload-types";

export type UpdateProfileState = {
  status: "success" | "error";
  message: string;
};

function ProfileInput({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string | undefined | null;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-wide mb-1"
        style={{ color: "#8fe3bd" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue || "Not Inserted"}
        className="w-full h-10 rounded border px-3 text-sm bg-transparent outline-none focus:ring-1"
        style={{
          borderColor: colorToRgba("#146543", 0.5),
          backgroundColor: colorToRgba("#146543", 0.1),
          color: "#e2f5ec",
          // @ts-expect-error css var
          "--tw-ring-color": "#146543",
        }}
      />
    </div>
  );
}

export function Profile({
  user,
  updateAction,
  logoutAction,
}: {
  user: User;
  updateAction: (
    prev: UpdateProfileState | null,
    formData: FormData,
  ) => Promise<UpdateProfileState>;
  logoutAction: () => Promise<void>;
}) {
  const [state, formAction, pending] = useActionState(updateAction, null);

  return (
    <form
      action={formAction}
      className="rounded-lg border p-6 flex-1 flex flex-col gap-6 overflow-y-auto"
      style={{
        borderColor: "#146543",
        backgroundColor: colorToRgba("#146543", 0.15),
      }}
    >
      {/* Top: avatar + name + actions */}
      <div className="flex items-start gap-6">
        <div
          className="w-24 h-24 rounded-full border flex-none"
          style={{
            borderColor: "#146543",
            backgroundColor: colorToRgba("#146543", 0.3),
          }}
        />

        <div className="flex-1 min-w-0 pt-2">
          <GlowingHeader
            intensity="low"
            className="text-2xl font-bold tracking-wide"
            style={{ color: "#146543" }}
          >
            {user.username ?? user.email}
          </GlowingHeader>
          <p
            className="mt-1 text-sm tracking-widest uppercase"
            style={{ color: colorToRgba("#146543", 0.6) }}
          >
            {user.email}
          </p>
        </div>

        <div className="flex flex-col gap-3 flex-none">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2 rounded border text-sm font-semibold tracking-wide disabled:opacity-50"
            style={{
              borderColor: "#146543",
              color: "#8fe3bd",
              backgroundColor: colorToRgba("#146543", 0.25),
            }}
          >
            {pending ? "Saving…" : "Update Detail"}
          </button>
          <button
            type="button"
            onClick={() => logoutAction()}
            className="px-6 py-2 rounded border text-sm font-semibold tracking-wide"
            style={{
              borderColor: "#146543",
              color: "#8fe3bd",
              backgroundColor: colorToRgba("#146543", 0.25),
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Status message */}
      {state && (
        <div
          className="px-4 py-2 rounded text-sm"
          style={{
            backgroundColor:
              state.status === "success"
                ? colorToRgba("#146543", 0.3)
                : colorToRgba("#c41e3a", 0.3),
            color: state.status === "success" ? "#8fe3bd" : "#ff6b6b",
          }}
        >
          {state.message}
        </div>
      )}

      {/* Bottom: About + Show Information */}
      <div
        className="rounded-lg border p-6 flex-1"
        style={{
          borderColor: colorToRgba("#146543", 0.5),
          backgroundColor: "#0a1f16",
        }}
      >
        <div className="grid grid-cols-2 gap-8">
          {/* Left: About */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-100 mb-4">
              About
            </h3>
            <ProfileInput
              name="username"
              label="Username"
              defaultValue={user.username}
            />

            <ProfileInput
              name="email"
              label="email"
              defaultValue={user.email}
            />
            <ProfileInput
              name="realName"
              label="Real Name"
              defaultValue={user.realName}
            />
            <ProfileInput
              name="country"
              label="Country"
              defaultValue={user.country}
            />
          </div>

          {/* Right: Show Information */}
          <div>
            <span
              className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded mb-4"
              style={{
                backgroundColor: colorToRgba("#146543", 0.3),
                color: "#8fe3bd",
              }}
            >
              Show Information
            </span>

            <div
              className="rounded-lg border p-4"
              style={{ borderColor: colorToRgba("#146543", 0.4) }}
            >
              <ProfileInput
                name="cardInfo"
                label="Card Info"
                defaultValue={user.cardInfo}
              />
              <ProfileInput
                name="address"
                label="Address"
                defaultValue={user.address}
              />
              <ProfileInput
                name="state"
                label="State/Province"
                defaultValue={user.state}
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ProfileInput
                    name="paymentCountry"
                    label="Country"
                    defaultValue={user.paymentCountry}
                  />
                </div>
                <div className="w-32 flex-none">
                  <ProfileInput
                    name="pincode"
                    label="Pincode"
                    defaultValue={user.pincode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
