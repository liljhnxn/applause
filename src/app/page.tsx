"use client";

import React, { useRef, useMemo } from "react";
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

export default function Home() {
  const { address } = useAccount();
  const sendFormRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-950 text-zinc-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="relative text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Decentralized Appreciation Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Give good work its{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              recognition.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Publicly recognize developers, creators, colleagues, and contributors.
            Every shout-out and token of gratitude is permanently recorded on Botchain.
          </p>
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

