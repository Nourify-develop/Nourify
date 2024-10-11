"use client";
import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const metadata: Metadata = {
  title: "Nourify",
  description: "Where Healthy Choices Meet Peak Freshness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavbarFooterRoutes = ["/signup", "/login"];
  const showNavbarFooter = !noNavbarFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        {showNavbarFooter && <Navbar />}
        <main className={` ${roboto.className}`}> {children} </main>
        {showNavbarFooter && <Footer />}
      </body>
    </html>
  );
}