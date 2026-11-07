"use client";

import React, { useRef, useMemo, useState } from "react";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";
import { Header } from "@/components/Header";
import { Statistics } from "@/components/Statistics";
import { SendAppreciation } from "@/components/SendAppreciation";
import { AppreciationBoard } from "@/components/AppreciationBoard";
import { WalletActivity } from "@/components/WalletActivity";
import { Footer } from "@/components/Footer";
import {
  APPLAUSE_CONTRACT_ADDRESS,
  APPLAUSE_ABI,
  AppreciationRecord,
} from "@/config/contract";
import { shortenAddress } from "@/utils/format";
import { ExternalLink, Globe, Search, Copy, Check } from "lucide-react";

export default function Home() {
  const { address } = useAccount();
  const sendFormRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Read all appreciations directly from the smart contract
  const {
    data: rawAppreciations,
    isLoading,
    refetch,
  } = useReadContract({
    address: APPLAUSE_CONTRACT_ADDRESS,
    abi: APPLAUSE_ABI,
    functionName: "getAllAppreciations",
  });

  const appreciations: AppreciationRecord[] = useMemo(() => {
    if (!rawAppreciations || !Array.isArray(rawAppreciations)) {
      return [];
    }
    return rawAppreciations.map((item) => ({
      id: item.id,
      sender: item.sender,
      recipient: item.recipient,
      category: Number(item.category),
      message: item.message,
      timestamp: item.timestamp,
    }));
  }, [rawAppreciations]);

  // Compute Statistics
  const totalCount = appreciations.length;

  const uniqueRecipientsCount = useMemo(() => {
    const recipientsSet = new Set(
      appreciations.map((a) => a.recipient.toLowerCase())
    );
    return recipientsSet.size;
  }, [appreciations]);

  const yourSentCount = useMemo(() => {
    if (!address) return null;
    return appreciations.filter(
      (a) => a.sender.toLowerCase() === address.toLowerCase()
    ).length;
  }, [appreciations, address]);

  const scrollToSend = () => {
    sendFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(APPLAUSE_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-950 text-zinc-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="relative text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900 border border-charcoal-750 text-zinc-200 text-xs font-medium shadow-sm">
            <div className="relative w-4 h-4 rounded overflow-hidden shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-emerald-400">BOT Chain Mainnet</span>
            <span className="text-zinc-500">•</span>
            <span>Chain ID: 677</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Give good work its{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              recognition.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Publicly recognize developers, creators, colleagues, and contributors.
            Every shout-out and token of gratitude is permanently recorded on the BOT Chain public ledger.
          </p>

          {/* Featured BOT Chain Links & Mainnet Contract Address on Interface */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
            {/* BOT Chain Website Link with Logo */}
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-850 border border-charcoal-800 hover:border-emerald-500/40 text-zinc-200 transition-all font-medium group"
            >
              <div className="relative w-4 h-4 rounded overflow-hidden shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <Globe className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>BOT Chain Website</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>

            {/* BOT Chain Explorer Link with Logo */}
            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-850 border border-charcoal-800 hover:border-purple-500/40 text-zinc-200 transition-all font-medium group"
            >
              <div className="relative w-4 h-4 rounded overflow-hidden shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <Search className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>BOT Chain Explorer</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>

            {/* Verified Mainnet Contract Address Link & Copy */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-900 border border-charcoal-800 text-zinc-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-500 font-sans text-[11px]">Contract:</span>
              <a
                href={`https://scan.botchain.ai/address/${APPLAUSE_CONTRACT_ADDRESS}#code`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                title="View verified contract on Botchain Scan"
              >
                <span>{shortenAddress(APPLAUSE_CONTRACT_ADDRESS, 6)}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
              <button
                onClick={handleCopyContract}
                className="ml-1 p-1 rounded hover:bg-charcoal-800 text-zinc-400 hover:text-white transition-colors"
                title="Copy contract address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <Statistics
          totalAppreciations={totalCount}
          uniqueRecipients={uniqueRecipientsCount}
          yourSentCount={yourSentCount}
          isLoading={isLoading}
        />

        {/* Send Appreciation Form */}
        <div ref={sendFormRef}>
          <SendAppreciation onSuccess={() => refetch()} />
        </div>

        {/* Connected Wallet Activity */}
        <WalletActivity
          currentAddress={address}
          allAppreciations={appreciations}
          isLoading={isLoading}
          onSendClick={scrollToSend}
        />

        {/* Public Appreciation Board */}
        <AppreciationBoard
          appreciations={appreciations}
          currentAddress={address}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  );
}
