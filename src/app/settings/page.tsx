"use client";
import React, { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import { Tab } from "@/types";

const Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const isActive = (tab: Tab) => activeTab === tab;

  return (
    <div>
      <div className="p-5 sm:px-10">
        <h1 className="text-2xl text-primary-2/85 font-bold border-b border-primary-2/40 uppercase py-3 sm:pt-0">
          Account Settings
        </h1>

        <div className="text-gray-4 flex gap-5 sm:gap-20 justify-center sm:justify-start py-5">
          {(["profile", "password"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`group relative py-3 ${isActive(tab) ? "font-medium" : "font-normal"}`}
            >
              {tab === "profile" ? "Profile Settings" : "Password Settings"}
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 mx-2 rounded-full duration-300 ${
                  isActive(tab) ? "bg-green-1" : "bg-transparent group-hover:bg-green-1"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {activeTab === "profile" ? <ProfileSettings /> : <PasswordSettings />}
      </div>
    </div>
  );
};

export default Page;
