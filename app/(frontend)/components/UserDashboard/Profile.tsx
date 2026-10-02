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
  const inputValue = defaultValue === "Not Inserted" ? "" : defaultValue || "";

  return (
    <div className="mb-0.5 sm:mb-4">
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
        defaultValue={inputValue}
        className="h-6 w-full rounded border bg-transparent px-2 text-[11px] outline-none focus:ring-1 sm:h-10 sm:px-3 sm:text-sm"
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
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-visible border bg-black p-2 sm:gap-6 sm:rounded-lg sm:p-6"
      style={{
        borderColor: "#146543",
        backgroundColor: colorToRgba("#146543", 0.15),
      }}
    >
      {/* Top: avatar + name + actions */}
      <div className="flex flex-row flex-wrap items-start gap-3 sm:flex-nowrap sm:gap-6">
        <div
          className="h-12 w-12 flex-none rounded-full border sm:h-24 sm:w-24"
          style={{
            borderColor: "#146543",
            backgroundColor: colorToRgba("#146543", 0.3),
          }}
        />

        <div className="min-w-0 flex-1 sm:pt-2">
          <GlowingHeader
            intensity="low"
            className="text-lg font-bold tracking-wide sm:text-2xl"
            style={{ color: "#146543" }}
          >
            {user.username ?? user.email}
          </GlowingHeader>
          <p
            className="mt-1 break-all text-[9px] uppercase tracking-widest sm:text-sm"
            style={{ color: colorToRgba("#146543", 0.6) }}
          >
            {user.email}
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-1.5 sm:w-auto sm:flex-none sm:flex-col sm:gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded border px-2 py-1 text-[10px] font-semibold tracking-wide disabled:opacity-50 sm:px-6 sm:py-2 sm:text-sm"
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
            className="rounded border px-2 py-1 text-[10px] font-semibold tracking-wide sm:px-6 sm:py-2 sm:text-sm"
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
          className="rounded px-2 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-sm"
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
        className="flex-1 border p-2 sm:rounded-lg sm:p-6"
        style={{
          borderColor: colorToRgba("#146543", 0.5),
          backgroundColor: "#0a1f16",
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:gap-8 lg:grid-cols-2">
          {/* Left: About */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-emerald-100 sm:mb-4 sm:text-lg">
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
              className="mb-2 inline-block rounded px-2 py-1 text-[9px] uppercase tracking-widest sm:mb-4 sm:px-3 sm:text-xs"
              style={{
                backgroundColor: colorToRgba("#146543", 0.3),
                color: "#8fe3bd",
              }}
            >
              Show Information
            </span>

            <div
              className="rounded border p-2 sm:rounded-lg sm:p-4"
              style={{ borderColor: colorToRgba("#146543", 0.4) }}
            >
              <div className="mb-0.5 sm:mb-4">
                <label
                  htmlFor="newPassword"
                  className="mb-1 block text-xs uppercase tracking-wide"
                  style={{ color: "#8fe3bd" }}
                >
                  Change Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  className="h-6 w-full rounded border bg-transparent px-2 text-[11px] outline-none focus:ring-1 sm:h-10 sm:px-3 sm:text-sm"
                  style={{
                    borderColor: colorToRgba("#146543", 0.5),
                    backgroundColor: colorToRgba("#146543", 0.1),
                    color: "#e2f5ec",
                    // @ts-expect-error css var
                    "--tw-ring-color": "#146543",
                  }}
                />
              </div>
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

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex-1">
                  <ProfileInput
                    name="paymentCountry"
                    label="Country"
                    defaultValue={user.paymentCountry}
                  />
                </div>
                <div className="min-w-0">
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
