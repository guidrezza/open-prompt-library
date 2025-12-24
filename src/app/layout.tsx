import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenPrompt Library | Verified AI Image Prompts",
  description: "A lightweight, high-performance gallery for verified AI image-to-image prompts. Open-source and SEO optimized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
          {children}
        </div>
      </body>
    </html>
  );
}
