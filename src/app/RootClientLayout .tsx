// app/RootClientLayout.tsx
"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function RootClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const excludeNavbarFooter = ["/signup", "/login"].some((route) =>
    pathname.startsWith(route)
  ) || pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {!excludeNavbarFooter && <Navbar />}
      <main>{children}</main>
      {!excludeNavbarFooter && <Footer />}
      <Toaster position="top-right" expand={false} richColors />
    </AuthProvider>
  );
}