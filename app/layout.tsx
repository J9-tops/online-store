import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
