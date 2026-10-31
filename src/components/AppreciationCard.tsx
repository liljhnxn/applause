"use client";

import React from "react";
import { AppreciationRecord, APPRECIATION_CATEGORIES } from "@/config/contract";
import { shortenAddress, formatTimestamp, getExplorerAddressUrl } from "@/utils/format";
import { Palette, HeartHandshake, Sparkles, Award, Flame, ExternalLink, ArrowRight } from "lucide-react";

interface AppreciationCardProps {
  appreciation: AppreciationRecord;
  currentAddress?: string;
}

export function AppreciationCard({ appreciation, currentAddress }: AppreciationCardProps) {
  const categoryInfo = APPRECIATION_CATEGORIES[appreciation.category] || APPRECIATION_CATEGORIES[0];

  const isCurrentUserSender = currentAddress && appreciation.sender.toLowerCase() === currentAddress.toLowerCase();
  const isCurrentUserRecipient = currentAddress && appreciation.recipient.toLowerCase() === currentAddress.toLowerCase();

  // Pick category icon
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return <Palette className="w-3.5 h-3.5" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-3.5 h-3.5" />;
      case "Sparkles":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "Award":
        return <Award className="w-3.5 h-3.5" />;
      case "Flame":
      default:
        return <Flame className="w-3.5 h-3.5" />;
    }
  };

  const isPurple = categoryInfo.accent === "purple";

  return (
    <div className="group relative rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-charcoal-700 transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-lg hover:shadow-black/40">
      <div>
        {/* Top bar: Category badge & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isPurple
                ? "bg-purple-500/10 text-purple-300 border-purple-500/25"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
            }`}
          >
            {renderCategoryIcon(categoryInfo.icon)}
            <span>{categoryInfo.name}</span>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono">
            {formatTimestamp(appreciation.timestamp)}
          </span>
        </div>

        {/* Message */}
        <div className="my-3">
          {appreciation.message ? (
            <p className="text-zinc-200 text-sm leading-relaxed break-words">
              &ldquo;{appreciation.message}&rdquo;
            </p>
          ) : (
            <p className="text-zinc-500 italic text-sm">
              (Sent appreciation without a note)
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar: Sender & Recipient */}
      <div className="pt-4 mt-2 border-t border-charcoal-800/80 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">From:</span>
          <a
            href={getExplorerAddressUrl(appreciation.sender)}
            target="_blank"
            rel="noreferrer"
            className={`font-mono transition-colors flex items-center gap-1 hover:underline ${
              isCurrentUserSender ? "text-purple-400 font-medium" : "text-zinc-300 hover:text-zinc-100"
            }`}
            title={appreciation.sender}
          >
            <span>{isCurrentUserSender ? "You" : shortenAddress(appreciation.sender)}</span>
            <ExternalLink className="w-3 h-3 text-zinc-500 opacity-60 group-hover:opacity-100" />
          </a>
        </div>

        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 mx-2" />

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">To:</span>
          <a
            href={getExplorerAddressUrl(appreciation.recipient)}
            target="_blank"
            rel="noreferrer"
            className={`font-mono transition-colors flex items-center gap-1 hover:underline ${
              isCurrentUserRecipient ? "text-emerald-400 font-medium" : "text-zinc-300 hover:text-zinc-100"
            }`}
            title={appreciation.recipient}
          >
            <span>{isCurrentUserRecipient ? "You" : shortenAddress(appreciation.recipient)}</span>
            <ExternalLink className="w-3 h-3 text-zinc-500 opacity-60 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
}

