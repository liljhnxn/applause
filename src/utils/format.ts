import { isAddress } from "viem";

/**
 * Formats a wallet address to 0x1234...5678 format
 */
export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return "";
  if (!isAddress(address)) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

/**
 * Validates whether a string is a valid Ethereum-compatible address
 */
export function isValidEthereumAddress(address: string): boolean {
  return isAddress(address);
}

/**
 * Formats unix timestamp into a readable date string
 */
export function formatTimestamp(timestamp: bigint | number): string {
  if (!timestamp) return "";
  const numericTime = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
  const date = new Date(numericTime * 1000);
  
  // Format as "Oct 31, 2026 • 10:24 PM" or similar clean format
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Returns block explorer address link
 */
export function getExplorerAddressUrl(address: string): string {
  return `https://scan.botchain.ai/address/${address}`;
}

/**
 * Returns block explorer transaction link
 */
export function getExplorerTxUrl(txHash: string): string {
  return `https://scan.botchain.ai/tx/${txHash}`;
}

