// layout.tsx
"use client";
import "./globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import MetadataComponent from "./Metadata";

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
      <Head>
        <title>Nourify</title>
        <meta
          name="description"
          content="Where Healthy Choices Meet Peak Freshness"
        />
      </Head>
      <link
        href="https://fonts.cdnfonts.com/css/sf-pro-display?styles=98774,98773,98770"
        rel="stylesheet"
      ></link>

      <body>
        {showNavbarFooter && <Navbar />}
        <main> {children} </main>
        {showNavbarFooter && <Footer />}
        <Toaster position="top-right" expand={false} richColors />
      </body>
    </html>
  );
}
