"use client";

import { useState } from "react";
import GlowingHeader from "./ui/GlowingHeader";
import UserDashboardTab from "./UserDashboardTab";
import { RankTabContent } from "./UserDashboardRank";
import { OrdersDisplay } from "./UserDashboard/Order";
import { Profile } from "./UserDashboard/Profile";

import { logout, updateProfile } from "@/lib/user";
import { Order, User } from "@/payload-types";

type TabKey = "profile" | "rank" | "orders";

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
      className="relative mx-auto flex min-h-[740px] w-[calc(100%-1.5rem)] max-w-4xl flex-col overflow-visible border-2 border-[#20805A] bg-cover bg-center bg-no-repeat p-3 shadow-lg sm:min-h-[680px] sm:w-[92%] sm:border-4 sm:p-8"
      style={{ backgroundImage: "url('/images/bit-texture.png')" }}
    >
      <GlowingHeader className="mb-3 block text-left text-2xl uppercase italic text-emerald-500 sm:mb-6 sm:text-5xl">
        Welcome Back
      </GlowingHeader>

      <div className="w-full flex-none">
        <div
          role="tablist"
          aria-label="Dashboard Tabs"
          className="flex w-full overflow-x-auto overflow-y-hidden"
        >
          <UserDashboardTab
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            color="#146543"
            className="mr-0 h-8 w-[104px] shrink-0 sm:h-10 sm:w-[170px]"
          />

          <UserDashboardTab
            label="Rank"
            active={activeTab === "rank"}
            onClick={() => setActiveTab("rank")}
            color="#a82a2a"
            className="-ml-6 mr-0 h-8 w-[104px] shrink-0 sm:-ml-10 sm:h-10 sm:w-[170px]"
          />

          <UserDashboardTab
            label="Orders"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            color="#1e5fa8"
            className="-ml-6 h-8 w-[104px] shrink-0 sm:-ml-10 sm:h-10 sm:w-[170px]"
          />
        </div>
      </div>

      <div className="relative z-40 flex min-h-0 flex-1 flex-col">
        {activeTab === "profile" && (
          <Profile
            user={user}
            updateAction={updateProfile}
            logoutAction={logout}
          />
        )}

        {activeTab === "rank" && <RankTabContent />}

        {activeTab === "orders" && <OrdersDisplay orders={orders || []} />}
      </div>
    </div>
  );
}
