"use client";

import React, { useState, useMemo } from "react";
import { AppreciationRecord, APPRECIATION_CATEGORIES } from "@/config/contract";
import { AppreciationCard } from "./AppreciationCard";
import { LayoutGrid, Filter, Search, Sparkles } from "lucide-react";

interface AppreciationBoardProps {
  appreciations: AppreciationRecord[];
  currentAddress?: string;
  isLoading: boolean;
}

export function AppreciationBoard({
  appreciations,
  currentAddress,
  isLoading,
}: AppreciationBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppreciations = useMemo(() => {
    return appreciations
      .filter((item) => {
        // Filter by category
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        // Filter by search query (address or message)
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchSender = item.sender.toLowerCase().includes(q);
          const matchRecipient = item.recipient.toLowerCase().includes(q);
          const matchMessage = item.message.toLowerCase().includes(q);
          return matchSender || matchRecipient || matchMessage;
        }

        return true;
      })
      // Newest first
      .sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [appreciations, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-brand-purple-light" />
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
              Appreciation Board
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Public feed of peer recognition and gratitude on Botchain.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search wallet or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-charcoal-900 border border-charcoal-750 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/70"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
            selectedCategory === "all"
              ? "bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-950"
              : "bg-charcoal-900 text-zinc-400 border-charcoal-800 hover:text-zinc-200 hover:border-charcoal-700"
          }`}
        >
          All Categories ({appreciations.length})
        </button>

        {APPRECIATION_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = appreciations.filter((a) => a.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? cat.accent === "purple"
                    ? "bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-950"
                    : "bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-950"
                  : "bg-charcoal-900 text-zinc-400 border-charcoal-800 hover:text-zinc-200 hover:border-charcoal-700"
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Cards Feed */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-5 space-y-4 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-charcoal-800 rounded-full" />
                <div className="h-4 w-16 bg-charcoal-800 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-charcoal-800 rounded" />
                <div className="h-4 w-3/4 bg-charcoal-800 rounded" />
              </div>
              <div className="pt-3 border-t border-charcoal-800 flex justify-between">
                <div className="h-4 w-20 bg-charcoal-800 rounded" />
                <div className="h-4 w-20 bg-charcoal-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAppreciations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppreciations.map((item) => (
            <AppreciationCard
              key={item.id.toString()}
              appreciation={item}
              currentAddress={currentAddress}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
            <Sparkles className="w-6 h-6 text-zinc-500" />
          </div>
          <h3 className="text-base font-semibold text-zinc-200">
            {searchQuery || selectedCategory !== "all"
              ? "No matching appreciations found"
              : "No appreciations published yet"}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "all"
              ? "Try clearing your filters or search keywords to view other records."
              : "Be the pioneer! Recognize a collaborator, developer, or creator above."}
          </p>
        </div>
      )}
    </div>
  );
}

