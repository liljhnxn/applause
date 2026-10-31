"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { isAddress } from "viem";
import {
  APPLAUSE_CONTRACT_ADDRESS,
  APPLAUSE_ABI,
  APPRECIATION_CATEGORIES,
} from "@/config/contract";
import { botchainTestnet } from "@/config/chain";
import { getExplorerTxUrl } from "@/utils/format";
import {
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Palette,
  HeartHandshake,
  Award,
  Flame,
  UserCheck,
} from "lucide-react";

interface SendAppreciationProps {
  onSuccess?: () => void;
}

export function SendAppreciation({ onSuccess }: SendAppreciationProps) {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Wagmi contract write hook
  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for tx confirmation
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const isWrongNetwork = isConnected && chain?.id !== botchainTestnet.id;

  // Validate inputs
  useEffect(() => {
    if (!recipient.trim()) {
      setValidationError(null);
      return;
    }

    if (!isAddress(recipient.trim())) {
      setValidationError("Please enter a valid Ethereum-style wallet address (0x...)");
      return;
    }

    if (recipient.trim().toLowerCase() === "0x0000000000000000000000000000000000000000") {
      setValidationError("Cannot send appreciation to the zero address");
      return;
    }

    if (address && recipient.trim().toLowerCase() === address.toLowerCase()) {
      setValidationError("You cannot send appreciation to yourself");
      return;
    }

    setValidationError(null);
  }, [recipient, address]);

  // Handle successful transaction
  useEffect(() => {
    if (isConfirmed) {
      setRecipient("");
      setMessage("");
      setCategory(0);
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [isConfirmed, onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) return;
    if (isWrongNetwork) {
      switchChain({ chainId: botchainTestnet.id });
      return;
    }

    const cleanRecipient = recipient.trim();
    if (!isAddress(cleanRecipient)) {
      setValidationError("Please enter a valid wallet address");
      return;
    }

    if (cleanRecipient.toLowerCase() === "0x0000000000000000000000000000000000000000") {
      setValidationError("Cannot send appreciation to the zero address");
      return;
    }

    if (address && cleanRecipient.toLowerCase() === address.toLowerCase()) {
      setValidationError("You cannot send appreciation to yourself");
      return;
    }

    if (message.length > 120) {
      setValidationError("Message must be 120 characters or fewer");
      return;
    }

    resetWrite();

    writeContract({
      address: APPLAUSE_CONTRACT_ADDRESS,
      abi: APPLAUSE_ABI,
      functionName: "sendAppreciation",
      args: [cleanRecipient as `0x${string}`, category, message.trim()],
    });
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return <Palette className="w-4 h-4" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-4 h-4" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Award":
        return <Award className="w-4 h-4" />;
      case "Flame":
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  const isPending = isWritePending || isConfirming;
  const isFormValid =
    isConnected &&
    !isWrongNetwork &&
    !validationError &&
    recipient.trim().length > 0 &&
    isAddress(recipient.trim()) &&
    message.length <= 120;

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-brand-purple-light">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
              Send Appreciation
            </h2>
            <p className="text-xs text-zinc-400">
              Recognize peer contribution permanently on the Botchain blockchain.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Recipient Wallet Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Recipient Wallet Address <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl bg-charcoal-850 border text-sm font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all ${
                  validationError
                    ? "border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50"
                    : recipient && isAddress(recipient.trim())
                    ? "border-emerald-500/50 focus:border-emerald-500"
                    : "border-charcoal-700 focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30"
                }`}
              />
              {recipient && isAddress(recipient.trim()) && !validationError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 flex items-center gap-1 text-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            {validationError && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationError}</span>
              </p>
            )}
          </div>

          {/* Appreciation Category Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Appreciation Category <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {APPRECIATION_CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                const isPurple = cat.accent === "purple";
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    disabled={isPending}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? isPurple
                          ? "bg-purple-950/40 border-purple-500 text-purple-200 shadow-sm shadow-purple-950"
                          : "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm shadow-emerald-950"
                        : "bg-charcoal-850 border-charcoal-750 text-zinc-400 hover:border-charcoal-600 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={isSelected ? (isPurple ? "text-purple-300" : "text-emerald-300") : "text-zinc-400"}>
                        {renderCategoryIcon(cat.icon)}
                      </span>
                      <span className="text-xs font-semibold truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 leading-tight line-clamp-2">
                      {cat.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Short Message <span className="text-zinc-500 font-normal normal-case">(optional)</span>
              </label>
              <span
                className={`text-xs font-mono ${
                  message.length > 120
                    ? "text-rose-400 font-bold"
                    : message.length >= 100
                    ? "text-amber-400"
                    : "text-zinc-500"
                }`}
              >
                {message.length}/120
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={120}
              placeholder="e.g. Inspiring leadership and crystal-clear code review today!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
            />
            <p className="mt-1.5 text-[11px] text-zinc-500">
              Note: Messages and wallet addresses are publicly stored on-chain forever. Do not enter personal confidential info.
            </p>
          </div>

          {/* Transaction Status Alerts */}
          {writeError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Transaction Failed</p>
                <p className="mt-0.5 opacity-90 line-clamp-2">
                  {writeError.message.includes("User rejected")
                    ? "Transaction rejected in your wallet."
                    : writeError.message}
                </p>
              </div>
            </div>
          )}

          {confirmError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Confirmation Error</p>
                <p className="mt-0.5 opacity-90">{confirmError.message}</p>
              </div>
            </div>
          )}

          {isConfirmed && hash && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start justify-between gap-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Appreciation Published On-Chain!</p>
                  <p className="mt-0.5 opacity-90">
                    Your recognition has been confirmed on the Botchain network.
                  </p>
                </div>
              </div>
              <a
                href={getExplorerTxUrl(hash)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-semibold underline shrink-0 hover:text-emerald-200"
              >
                <span>Receipt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Submit Action */}
          <div>
            {!isConnected ? (
              <div className="text-center py-2">
                <p className="text-xs text-zinc-400 mb-2">Connect your wallet to publish an appreciation.</p>
              </div>
            ) : isWrongNetwork ? (
              <button
                type="button"
                onClick={() => switchChain({ chainId: botchainTestnet.id })}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-950 text-sm font-semibold transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Switch to Botchain Testnet (968)</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid || isPending}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:via-indigo-500 hover:to-emerald-500 text-white text-sm font-semibold shadow-lg shadow-purple-950/40 transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isWritePending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Approve in MetaMask...</span>
                  </>
                ) : isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming on Botchain...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Appreciation</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

