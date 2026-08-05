"use client";

import { useState } from "react";
import GlowingHeader from "./ui/GlowingHeader";
import UserDashboardTab from "./UserDashboardTab";
import {
  GlitchTitle,
  LeaderboardRow,
  leaderboardTest,
} from "./UserDashboardRank";
import { OrdersDisplay } from "./UserDashboard/Order";
import { Profile } from "./UserDashboard/Profile";

import { logout, updateProfile } from "@/lib/user";
import { User } from "@/payload-types";

type TabKey = "profile" | "orders" | "settings";

export default function UserDashboardVisual({ user }: { user: User }) {
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
          <Profile
            user={user}
            updateAction={updateProfile}
            logoutAction={logout}
          />
        )}

        {activeTab === "orders" && (
          <div
            className="rounded-lg border flex-1 flex flex-col overflow-hidden relative"
            style={{
              borderColor: "#a82a2a",
              backgroundColor: "#1a0505",
            }}
          >
            {/* Hero: rank tag, then wordmark stacked below */}
            <div className="px-8 pt-6 pb-6">
              <div
                className="inline-block border px-5 py-1.5 mb-3"
                style={{
                  borderColor: "#ffffff",
                  transform: "skewX(-12deg)",
                  clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
                }}
              >
                <span
                  className="italic font-bold tracking-wide text-white text-sm inline-block"
                  style={{ transform: "skewX(12deg)" }}
                >
                  RANK
                </span>
              </div>

              <GlitchTitle text="VITROL" size="clamp(48px, 7vw, 96px)" />
              <GlitchTitle
                text="#001"
                size="clamp(28px, 4vw, 56px)"
                className="mt-1"
              />
            </div>

            {/* Top rule */}
            <div className="h-1.5" style={{ backgroundColor: "#a82a2a" }} />

            {/* Leaderboard body */}
            <div
              className="flex-1 overflow-y-auto px-8 py-4"
              style={{ backgroundColor: "#050202" }}
            >
              {leaderboardTest.map((entry, i) => (
                <LeaderboardRow key={entry.id} rank={i + 1} entry={entry} />
              ))}
            </div>

            {/* Bottom rule */}
            <div className="h-1.5" style={{ backgroundColor: "#a82a2a" }} />
          </div>
        )}

        {activeTab === "settings" && <OrdersDisplay />}
      </div>
    </div>
  );
}
