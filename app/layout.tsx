import type { Metadata } from "next";
import { Sora, Reddit_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sebastian Marat Urdanegui Bisalaya | Full-Stack Developer",
  description: "I am Full-Stack Web/Mobile Developer & Data Analyst from Lima, Peru, building impactful web and mobile apps with React, Node.js & Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl w-full bg-white min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
