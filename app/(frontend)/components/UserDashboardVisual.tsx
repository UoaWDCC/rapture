"use client";

import { useState } from "react";
import GlowingHeader from "./ui/GlowingHeader";
import UserDashboardTab from "./UserDashboardTab";
import { colorToRgba } from "@/lib/colour";
import { ProfileField } from "./ProfileField";

type TabKey = "profile" | "orders" | "settings";

export default function UserDashboardVisual() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  return (
    <div
      className="relative w-[80%] mx-auto aspect-[4/3] border-4 border-[#20805A] bg-cover bg-center bg-no-repeat shadow-lg p-[5%] flex flex-col"
      style={{ backgroundImage: "url('/images/bit-texture.png')" }}
    >
      <GlowingHeader>Welcome Back</GlowingHeader>

      <div className="w-full flex-none">
        <div
          role="tablist"
          aria-label="Dashboard Tabs"
          className="w-full -mb-px flex"
        >
          <UserDashboardTab
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            color="#146543"
            className="mr-0 w-[180px] h-10"
          />

          <UserDashboardTab
            label="Orders"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            color="#a82a2a"
            className="-ml-13 mr-0 w-[180px] h-10"
          />

          <UserDashboardTab
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            color="#1e5fa8"
            className="-ml-13 w-[180px] h-10"
          />
        </div>
      </div>

      <div className="-mt-px relative z-40 flex-1 flex flex-col">
        {activeTab === "profile" && (
          <div
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
                  USERNAME
                </GlowingHeader>
                <p
                  className="mt-1 text-sm tracking-widest uppercase"
                  style={{ color: colorToRgba("#146543", 0.6) }}
                >
                  Detail
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-none">
                <button
                  type="button"
                  className="px-6 py-2 rounded border text-sm font-semibold tracking-wide"
                  style={{
                    borderColor: "#146543",
                    color: "#8fe3bd",
                    backgroundColor: colorToRgba("#146543", 0.25),
                  }}
                >
                  Update Detail
                </button>
                <button
                  type="button"
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

                  <ProfileField label="Username" />
                  <ProfileField label="Real Name" />
                  <ProfileField label="Country" />
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
                    <ProfileField label="Card Info" />
                    <ProfileField label="Address" />
                    <ProfileField label="State/Province" />

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <ProfileField label="Country" />
                      </div>
                      <div className="w-32 flex-none">
                        <ProfileField label="Pincode" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div
            className="rounded-lg border p-4 flex-1"
            style={{
              borderColor: "#a82a2a",
              backgroundColor: colorToRgba("#a82a2a", 0.15),
            }}
          >
            <h2 className="text-lg font-semibold text-emerald-200">Orders</h2>
            <p className="mt-2 text-sm text-emerald-100/80">AHHH</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div
            className="rounded-lg border p-4 flex-1"
            style={{
              borderColor: "#1e5fa8",
              backgroundColor: colorToRgba("#1e5fa8", 0.15),
            }}
          >
            <h2 className="text-lg font-semibold text-emerald-200">Settings</h2>
            <p className="mt-2 text-sm text-emerald-100/80">AHHH</p>
          </div>
        )}
      </div>
    </div>
  );
}
