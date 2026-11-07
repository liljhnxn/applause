import React from "react";
import { APPLAUSE_CONTRACT_ADDRESS } from "@/config/contract";
import { shortenAddress, getExplorerAddressUrl } from "@/utils/format";
import { Sparkles, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950 py-10 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-purple" />
          <span className="font-semibold text-zinc-300">Applause</span>
          <span>— Give good work its recognition.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Botchain Mainnet (Chain ID 677)</span>
          </div>

          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <span>Botchain Scan Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {APPLAUSE_CONTRACT_ADDRESS && APPLAUSE_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000" && (
            <a
              href={getExplorerAddressUrl(APPLAUSE_CONTRACT_ADDRESS)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <span>Contract: {shortenAddress(APPLAUSE_CONTRACT_ADDRESS)}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

