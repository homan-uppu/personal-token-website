import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/variables.css";
import "@/styles/typography.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal token",
  description: "A financial instrument to democratize opportunity.",
  icons: {
    icon: "/favicon.svg", // Place your SVG in the public folder
    // You can also specify different sizes/types
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
