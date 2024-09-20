import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nourify",
  description: "Where Healthy Choices Meet Peak Freshness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="font-sans"> {children} </main>
        <Footer />
      </body>
    </html>
  );
}
