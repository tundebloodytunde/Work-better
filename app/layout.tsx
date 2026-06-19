import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Work Better",
  description: "Your intelligent workflow assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <Navigation />
        <main className="max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
