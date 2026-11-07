import { botchainMainnet, botchainTestnet } from "./chain";
import { APPLAUSE_ABI } from "../contracts/ApplauseAbi";

// Default fallback contract address if not yet set in environment
export const DEFAULT_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const APPLAUSE_CONTRACT_ADDRESS = (
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || DEFAULT_CONTRACT_ADDRESS
) as `0x${string}`;

export const APPLAUSE_CHAIN = botchainMainnet;

export interface CategoryInfo {
  id: number;
  name: string;
  description: string;
  accent: "purple" | "green";
  icon: string;
}

export const APPRECIATION_CATEGORIES: CategoryInfo[] = [
  {
    id: 0,
    name: "Great Design",
    description: "Exceptional UI, UX, visuals, or frontend craft",
    accent: "purple",
    icon: "Palette",
  },
  {
    id: 1,
    name: "Helpful",
    description: "Kind assistance, guidance, or mentorship",
    accent: "green",
    icon: "HeartHandshake",
  },
  {
    id: 2,
    name: "Creative",
    description: "Original ideas, artistry, or out-of-the-box thinking",
    accent: "purple",
    icon: "Sparkles",
  },
  {
    id: 3,
    name: "Excellent Work",
    description: "Flawless execution, bug fixes, or high-grade engineering",
    accent: "green",
    icon: "Award",
  },
  {
    id: 4,
    name: "Inspiration",
    description: "Motivating others and setting a high bar",
    accent: "purple",
    icon: "Flame",
  },
];

export interface AppreciationRecord {
  id: bigint;
  sender: `0x${string}`;
  recipient: `0x${string}`;
  category: number;
  message: string;
  timestamp: bigint;
}

export { APPLAUSE_ABI };

