import React from "react";
import Image from "next/image";
import { APPLAUSE_CONTRACT_ADDRESS } from "@/config/contract";
import { shortenAddress } from "@/utils/format";
import { Sparkles, ExternalLink, Globe, Search, Layers, CheckCircle } from "lucide-react";

export function Footer() {
  const mainnetContractUrl = `https://scan.botchain.ai/address/${APPLAUSE_CONTRACT_ADDRESS}#code`;

  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950 py-12 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-charcoal-800/80">
          {/* Brand info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-brand-purple-border flex items-center justify-center text-brand-purple-light">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-zinc-100 tracking-tight">Applause</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Botchain Mainnet (677)
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Give good work its recognition. A decentralized, on-chain appreciation board for creators and developers on BOT Chain.
            </p>
          </div>

          {/* BOT Chain Ecosystem Showcase with Official Logo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 shadow-sm">
            <div className="flex items-center gap-2.5 pr-4 sm:border-r sm:border-charcoal-800">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-charcoal-950 border border-charcoal-750 shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-zinc-200 text-xs block leading-tight">BOT Chain</span>
                <span className="text-[10px] text-emerald-400 font-mono">Mainnet 677</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-zinc-200 hover:text-emerald-300 border border-charcoal-750 transition-all font-medium text-xs group"
              >
                <div className="relative w-4 h-4 rounded overflow-hidden shrink-0">
                  <Image
                    src="/botchain-logo.png"
                    alt="BOT Chain"
                    fill
                    className="object-contain"
                  />
                </div>
                <Globe className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>BOT Chain Website</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 ml-0.5" />
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-zinc-200 hover:text-purple-300 border border-charcoal-750 transition-all font-medium text-xs group"
              >
                <div className="relative w-4 h-4 rounded overflow-hidden shrink-0">
                  <Image
                    src="/botchain-logo.png"
                    alt="BOT Chain"
                    fill
                    className="object-contain"
                  />
                </div>
                <Search className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>BOT Chain Explorer</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Verified Mainnet Contract Address */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built natively on BOT Chain (Chain ID: 677 • Native Currency: BOT)</span>
          </div>

          {APPLAUSE_CONTRACT_ADDRESS && (
            <a
              href={mainnetContractUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-2 bg-charcoal-900 px-3.5 py-1.5 rounded-xl border border-charcoal-750 hover:border-emerald-500/50"
              title="Verified Mainnet Contract on Botchain Scan"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-400">Mainnet Contract:</span>
              <span className="text-emerald-400 font-semibold">{shortenAddress(APPLAUSE_CONTRACT_ADDRESS, 6)}</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
