import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Online Store",
  description: "A sample online store made by j9-tops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
