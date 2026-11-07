"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchainMainnet } from "@/config/chain";
import { APPLAUSE_CONTRACT_ADDRESS } from "@/config/contract";
import { shortenAddress, getExplorerAddressUrl } from "@/utils/format";
import { Sparkles, ExternalLink, LogOut, ChevronDown, CheckCircle2, AlertTriangle, Globe, Search } from "lucide-react";

export function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isWrongNetwork = isConnected && chain?.id !== botchainMainnet.id;

  const handleConnect = () => {
    // Prefer MetaMask connector if available, otherwise first connector
    const metaMaskConnector = connectors.find((c) => c.name.toLowerCase().includes("metamask")) || connectors[0];
    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-700/60 bg-charcoal-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-brand-purple-border flex items-center justify-center text-brand-purple-light shadow-sm">
            <Sparkles className="w-5 h-5 text-brand-purple-light" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-zinc-100">
                Applause
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-charcoal-800 text-brand-green-light border border-charcoal-700">
                Botchain Mainnet
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-normal">
              Give good work its recognition.
            </p>
          </div>
        </div>

        {/* Center/Quick links with official BOT Chain Logo */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-charcoal-900/90 border border-charcoal-800">
          <div className="flex items-center gap-1.5 pr-2 border-r border-charcoal-800">
            <div className="relative w-5 h-5 rounded-md overflow-hidden bg-charcoal-950 shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xs font-semibold text-zinc-200">BOT Chain</span>
          </div>

          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded-md hover:bg-charcoal-800"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Website</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>

          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-purple-400 transition-colors px-2 py-1 rounded-md hover:bg-charcoal-800"
          >
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span>Explorer</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>

          {APPLAUSE_CONTRACT_ADDRESS && (
            <a
              href={`https://scan.botchain.ai/address/${APPLAUSE_CONTRACT_ADDRESS}#code`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1 rounded-md bg-charcoal-850 border border-charcoal-750"
              title="Verified Mainnet Contract"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{shortenAddress(APPLAUSE_CONTRACT_ADDRESS, 4)}</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          )}
        </div>

        {/* Right Actions: Network & Wallet */}
        <div className="flex items-center gap-3">
          {isConnected && isWrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: botchainMainnet.id })}
              disabled={isSwitching}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isSwitching ? "Switching..." : "Switch to Botchain (677)"}</span>
            </button>
          )}

          {isConnected ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-zinc-200 text-sm font-medium transition-all duration-150 focus:outline-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs sm:text-sm">{shortenAddress(address)}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-charcoal-900 border border-charcoal-700 shadow-xl z-20 py-2 divide-y divide-charcoal-800">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-zinc-400">Connected Wallet</p>
                      <p className="text-xs font-mono text-zinc-200 truncate mt-0.5">{address}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                        <span>Botchain Mainnet (677)</span>
                      </div>
                    </div>

                    <div className="py-1">
                      {isWrongNetwork && (
                        <button
                          onClick={() => {
                            switchChain({ chainId: botchainMainnet.id });
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-amber-300 hover:bg-charcoal-800 flex items-center gap-2"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Switch to Botchain</span>
                        </button>
                      )}
                      <a
                        href={getExplorerAddressUrl(address || "")}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-charcoal-800 flex items-center justify-between"
                      >
                        <span>View on Botchain Scan</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      </a>
                      <a
                        href={`https://scan.botchain.ai/address/${APPLAUSE_CONTRACT_ADDRESS}#code`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left px-4 py-2 text-xs text-emerald-400 hover:bg-charcoal-800 flex items-center justify-between"
                      >
                        <span>Mainnet Contract</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      </a>
                      <button
                        onClick={() => {
                          disconnect();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium shadow-md shadow-purple-950/40 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21.9 8.2l-2.4-7.4c-.1-.4-.6-.6-.9-.3L15.3 4H8.7L5.4.5c-.3-.3-.8-.1-.9.3L2.1 8.2c-.1.3 0 .7.3.9l9.1 7.1c.3.2.7.2 1 0l9.1-7.1c.3-.2.4-.6.3-.9z" />
              </svg>
              <span>{isConnecting ? "Connecting..." : "Connect MetaMask"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
