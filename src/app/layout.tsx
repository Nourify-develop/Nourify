"use client";

import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";
import { usePathname } from "next/navigation";

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
  const noHeaderFooterRoutes = ["/signup", "/another-page"];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);
  return (
    <html lang="en">
      <body>
        {showHeaderFooter && <Navbar />}
        <main className={`${roboto.className}`}> {children} </main>
        {showHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
