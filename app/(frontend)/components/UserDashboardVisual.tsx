"use client";

import { useState } from "react";
import GlowingHeader from "./ui/GlowingHeader";
import UserDashboardTab from "./UserDashboardTab";
import { colorToRgba } from "@/lib/colour";

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
            className="rounded-lg border p-4 flex-1"
            style={{
              borderColor: "#146543",
              backgroundColor: colorToRgba("#146543", 0.15),
            }}
          >
            <h2 className="text-lg font-semibold text-emerald-200">Profile</h2>
            <p className="mt-2 text-sm text-emerald-100/80">
              This is the profile panel. Replace with real content.
            </p>
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
            <p className="mt-2 text-sm text-emerald-100/80">
              Order history and management live here.
            </p>
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
            <p className="mt-2 text-sm text-emerald-100/80">
              Account settings and preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
