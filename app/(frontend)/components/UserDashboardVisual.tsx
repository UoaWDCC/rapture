"use client";

import { useState } from "react";
import GlowingHeader from "./ui/GlowingHeader";
import UserDashboardTab from "./UserDashboardTab";
import { RankTabContent } from "./UserDashboardRank";
import { OrdersDisplay } from "./UserDashboard/Order";
import { Profile } from "./UserDashboard/Profile";

import { logout, updateProfile } from "@/lib/user";
import { Order, User } from "@/payload-types";

type TabKey = "profile" | "orders" | "settings";

export default function UserDashboardVisual({
  user,
  orders,
}: {
  user: User;
  orders: Order[];
}) {
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

        {activeTab === "orders" && <RankTabContent />}

        {activeTab === "settings" && <OrdersDisplay orders={orders || []} />}
      </div>
    </div>
  );
}
