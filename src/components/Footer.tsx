import React from "react";
import { APPLAUSE_CONTRACT_ADDRESS } from "@/config/contract";
import { shortenAddress, getExplorerAddressUrl } from "@/utils/format";
import { Sparkles, ExternalLink, Globe, Search, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950 py-12 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-charcoal-800/80">
          {/* Brand info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-brand-purple-border flex items-center justify-center text-brand-purple-light">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-zinc-100 tracking-tight">Applause</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Mainnet
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Give good work its recognition. A decentralized, on-chain appreciation board for creators and developers.
            </p>
          </div>

          {/* BOT Chain Ecosystem Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
            <div className="flex items-center gap-2 pr-3 sm:border-r sm:border-charcoal-800">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center text-charcoal-950 font-black text-xs">
                B
              </div>
              <span className="font-semibold text-zinc-200">BOT Chain</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors font-medium"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>BOT Chain Website</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-purple-400 transition-colors font-medium"
              >
                <Search className="w-3.5 h-3.5 text-purple-400" />
                <span>BOT Chain Explorer</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Verified Contract */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built natively on BOT Chain (Chain ID: 677 • Native Token: BOT)</span>
          </div>

          {APPLAUSE_CONTRACT_ADDRESS && APPLAUSE_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000" && (
            <a
              href={getExplorerAddressUrl(APPLAUSE_CONTRACT_ADDRESS)}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 bg-charcoal-900 px-3 py-1.5 rounded-lg border border-charcoal-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Contract: {shortenAddress(APPLAUSE_CONTRACT_ADDRESS, 6)}</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
