"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SettingsForm } from "./components/settings-form";
import { NotificationsSettings } from "./components/notifications-settings";
import { SecuritySettings } from "./components/security-settings";

export function SettingsFeature() {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState("profile");

  if (!publicKey) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Please connect your wallet</h3>
        <p className="text-muted-foreground">
          Connect your wallet to access account settings
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="tabs tabs-vertical">
            <button
              className={`tab tab-lg w-full justify-start ${
                activeTab === "profile" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`tab tab-lg w-full justify-start ${
                activeTab === "notifications" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`tab tab-lg w-full justify-start ${
                activeTab === "security" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && <SettingsForm />}
          {activeTab === "notifications" && <NotificationsSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}
