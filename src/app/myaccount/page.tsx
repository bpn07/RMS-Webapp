"use client";

import { useState } from "react";
import AccountDetailsTab from "@/layout/MyAccount/AccountPage";
import RewardsTab from "@/layout/MyAccount/RewardsPage";
import VouchersTab from "@/layout/MyAccount/VouchersPage";
import ProfileHeader from "@/layout/MyAccount/Profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account details" },
    { id: "rewards", label: "Rewards" },
    { id: "vouchers", label: "Vouchers & credit" },
    { id: "food-pro", label: "Food Pro" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <ProfileHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "account" && <AccountDetailsTab />}
        {activeTab === "rewards" && <RewardsTab />}
        {activeTab === "vouchers" && <VouchersTab />}
        {activeTab === "food-pro" && (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Food Pro</h2>
            <p className="text-sm text-gray-600">
              Food Pro benefits and subscription details will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
