import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

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
        <main className={` ${roboto.className}`}> {children} </main>
        <Footer />

      </body>
    </html>
  );
}
