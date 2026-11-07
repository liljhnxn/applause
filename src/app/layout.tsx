import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Applause — Give good work its recognition",
  description:
    "A decentralized appreciation board where users publicly recognize developers, creators, and contributors on-chain via Botchain.",
  keywords: ["Web3", "Applause", "Botchain", "Ethereum", "Recognition", "Solidity", "MetaMask", "BOT"],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-charcoal-950 text-zinc-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

