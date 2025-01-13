"use client";
import { Suspense, useState } from "react";

import UserNavbar from "./components/navbar";
import SettingsSidebar from "./components/sidebar";
import { ModalProvider } from "./context/ModalContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="flex flex-1">
          <div className="sticky top-20 z-20">
            <SettingsSidebar />
          </div>

          {/* Main content area */}
          <div className="flex-1 p-4">
            {/* Add border and styling to this wrapper */}
            <div className="w-full h-full border-[1.5px] border-gray-light bg-white rounded-xl">
              {/* Navbar with border */}
              <div className="border-b border-gray-300">
                <UserNavbar />
              </div>

              {/* Suspense to load children */}
              <div className="p-4">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
