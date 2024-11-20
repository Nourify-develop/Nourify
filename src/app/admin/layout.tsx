import { Suspense } from "react";

import UserNavbar from "./components/navbar";
import SettingsSidebar from "./components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1">
        <div className="sticky top-20 z-20  ">
          {" "}
          <SettingsSidebar />
        </div>

        {/* Main content area that is scrollable */}
        <div className="w-full  p-4">
          <div className="w-full h-full border bg-white border-gray-light rounded-xl ">
            <UserNavbar />
            
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
