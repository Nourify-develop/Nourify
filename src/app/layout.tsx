// app/layout.tsx (Server Component)
import "./globals.css";
import "./../styles/checkbox.css";
import { Metadata } from "next";
import Head from "next/head";
import RootClientLayout from "./RootClientLayout ";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  title: "Nourify",
  description: "Where Healthy Choices Meet Peak Freshness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display?styles=98774,98773,98770"
          rel="stylesheet"
        />
      </head>
      <body>
        <ModalProvider>
          <RootClientLayout>{children}</RootClientLayout>
        </ModalProvider>
      </body>
    </html>
  );
}
