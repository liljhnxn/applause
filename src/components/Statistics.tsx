"use client";

import React from "react";
import { MessageSquareHeart, Users, Send } from "lucide-react";

interface StatisticsProps {
  totalAppreciations: number;
  uniqueRecipients: number;
  yourSentCount: number | null;
  isLoading: boolean;
}

export function Statistics({
  totalAppreciations,
  uniqueRecipients,
  yourSentCount,
  isLoading,
}: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Appreciations */}
      <div className="relative overflow-hidden rounded-2xl bg-charcoal-900 border border-charcoal-800 p-5 transition-all duration-200 hover:border-charcoal-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">Total Appreciations</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
              {isLoading ? (
                <span className="inline-block w-12 h-8 bg-charcoal-800 animate-pulse rounded" />
              ) : (
                totalAppreciations.toLocaleString()
              )}
            </p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>Permanently recorded on-chain</span>
        </div>
      </div>

      {/* Unique Recipients */}
      <div className="relative overflow-hidden rounded-2xl bg-charcoal-900 border border-charcoal-800 p-5 transition-all duration-200 hover:border-charcoal-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">Unique Recipients</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
              {isLoading ? (
                <span className="inline-block w-12 h-8 bg-charcoal-800 animate-pulse rounded" />
              ) : (
                uniqueRecipients.toLocaleString()
              )}
            </p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Wallets recognized by peers</span>
        </div>
      </div>

      {/* Your Sent Appreciations */}
      <div className="relative overflow-hidden rounded-2xl bg-charcoal-900 border border-charcoal-800 p-5 transition-all duration-200 hover:border-charcoal-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">Your Sent Appreciations</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
              {yourSentCount === null ? (
                <span className="text-sm text-zinc-500 font-normal">Connect wallet</span>
              ) : isLoading ? (
                <span className="inline-block w-12 h-8 bg-charcoal-800 animate-pulse rounded" />
              ) : (
                yourSentCount.toLocaleString()
              )}
            </p>
          </div>
          <div className="h-11 w-11 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-zinc-300">
            <Send className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>Recognitions you shared</span>
        </div>
      </div>
    </div>
  );
}

