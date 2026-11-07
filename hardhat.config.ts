import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    botchain: {
      url: process.env.RPC_URL || "https://rpc.botchain.ai",
      chainId: 677,
      accounts: PRIVATE_KEY.startsWith("0x") ? [PRIVATE_KEY] : [`0x${PRIVATE_KEY}`],
    },
    botchainTestnet: {
      url: "https://rpc.bohr.life",
      chainId: 968,
      accounts: PRIVATE_KEY.startsWith("0x") ? [PRIVATE_KEY] : [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      botchain: "no-api-key-needed",
      botchainTestnet: "no-api-key-needed",
    },
    customChains: [
      {
        network: "botchain",
        chainId: 677,
        urls: {
          apiURL: "https://scan.botchain.ai/api",
          browserURL: "https://scan.botchain.ai",
        },
      },
      {
        network: "botchainTestnet",
        chainId: 968,
        urls: {
          apiURL: "https://scan.bohr.life/api",
          browserURL: "https://scan.bohr.life",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
