"use client";

import React, { useState, useMemo } from "react";
import { AppreciationRecord } from "@/config/contract";
import { AppreciationCard } from "./AppreciationCard";
import { shortenAddress } from "@/utils/format";
import { Inbox, Send, Wallet, Copy, Check } from "lucide-react";

interface WalletActivityProps {
  currentAddress?: string;
  allAppreciations: AppreciationRecord[];
  isLoading: boolean;
  onSendClick?: () => void;
}

export function WalletActivity({
  currentAddress,
  allAppreciations,
  isLoading,
  onSendClick,
}: WalletActivityProps) {
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [copied, setCopied] = useState(false);

  const receivedAppreciations = useMemo(() => {
    if (!currentAddress) return [];
    return allAppreciations
      .filter((a) => a.recipient.toLowerCase() === currentAddress.toLowerCase())
      .sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [allAppreciations, currentAddress]);

  const sentAppreciations = useMemo(() => {
    if (!currentAddress) return [];
    return allAppreciations
      .filter((a) => a.sender.toLowerCase() === currentAddress.toLowerCase())
      .sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [allAppreciations, currentAddress]);

  const handleCopy = () => {
    if (!currentAddress) return;
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentAddress) {
    return (
      <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-charcoal-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
          <Wallet className="w-6 h-6 text-zinc-400" />
        </div>
        <h3 className="text-base font-semibold text-zinc-200">
          Connect your wallet to view your personal activity
        </h3>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
          See recognitions you have received from peers and appreciation notes you have sent to others.
        </p>
      </div>
    );
  }

  const currentList = activeTab === "received" ? receivedAppreciations : sentAppreciations;

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-6">
      {/* Activity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-brand-green-light" />
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
              Your Wallet Activity
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-mono text-zinc-400">
              {shortenAddress(currentAddress, 6)}
            </span>
            <button
              onClick={handleCopy}
              className="text-zinc-500 hover:text-zinc-300 text-xs flex items-center gap-1 transition-colors"
              title="Copy address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-charcoal-850 border border-charcoal-750 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("received")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "received"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Received</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-charcoal-950/60 font-mono">
              {receivedAppreciations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("sent")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "sent"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sent</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-charcoal-950/60 font-mono">
              {sentAppreciations.length}
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-charcoal-850 border border-charcoal-800 p-5 h-32 animate-pulse" />
          <div className="rounded-2xl bg-charcoal-850 border border-charcoal-800 p-5 h-32 animate-pulse" />
        </div>
      ) : currentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentList.map((item) => (
            <AppreciationCard
              key={item.id.toString()}
              appreciation={item}
              currentAddress={currentAddress}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-charcoal-850 border border-charcoal-800 p-8 text-center">
          <p className="text-sm font-semibold text-zinc-300">
            {activeTab === "received"
              ? "You haven't received any appreciations yet."
              : "You haven't sent any appreciations yet."}
          </p>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {activeTab === "received"
              ? "Share your address with colleagues, collaborators, or friends to receive on-chain recognition."
              : "Find a colleague or creator who inspired you and send them recognition!"}
          </p>
          {activeTab === "sent" && onSendClick && (
            <button
              onClick={onSendClick}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors"
            >
              Send an Appreciation Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

