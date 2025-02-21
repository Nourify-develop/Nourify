"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // App Router version of useRouter
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function RootClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();
  const excludeNavbarFooter =
    ["/signup", "/login"].some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/admin");

  // Add NProgress for route changes
  useEffect(() => {
    NProgress.configure({
      minimum: 0.2,
      easing: "ease", // Animation easing
      speed: 500,
      showSpinner: false,
    });

    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen for route changes (App Router doesn't have router.events)
    const originalPush = router.push;
    router.push = async (...args) => {
      handleStart();
      originalPush(...args);
      handleComplete();
    };

    return () => {
      router.push = originalPush; // Cleanup to restore default push behavior
    };
  }, [router]);

  return (
    <AuthProvider>
      {!excludeNavbarFooter && <Navbar />}
      <main>{children}</main>
      {!excludeNavbarFooter && <Footer />}
      <Toaster position="top-right" expand={false} richColors closeButton />
    </AuthProvider>
  );
}
