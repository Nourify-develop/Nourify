import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";

import "./globals.css";

import { Toaster} from 'sonner'
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const metadata: Metadata = {
  title: "Nourify",
  description: "Where Healthy Choices Meet Peak Freshness",
}

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
        {showNavbarFooter && <Footer />}
        <Toaster position="top-right" expand={false} richColors/>

      </body>
    </html>
  );
}
