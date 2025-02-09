// app/layout.tsx (Server Component)
import { Metadata } from "next";
import RootClientLayout from "./RootClientLayout ";
import "./../styles/checkbox.css";
import "./globals.css";
import initApiClient from "@/config/init";
import AuthQueryProvider from "@/context/AuthQueryProvider";

export const metadata: Metadata = {
  title: "Nourify",
  description: "Where Healthy Choices Meet Peak Freshness",
};

initApiClient();
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
        <AuthQueryProvider>
          <RootClientLayout>{children}</RootClientLayout>
        </AuthQueryProvider>
      </body>
    </html>
  );
}
