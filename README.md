# Applause 👏

> **Give good work its recognition.**

Applause is a lightweight, decentralized Web3 appreciation board built on **Botchain Testnet**. It enables users to connect their MetaMask wallet, recognize developers, creators, colleagues, and friends on-chain, and store authentic appreciation records permanently on a public ledger.

---

## 🌟 Key Features

- **On-Chain Appreciation**: Every praise and recognition is permanently recorded on the blockchain with sender, recipient, category, timestamp, and an optional note.
- **5 Focused Recognition Categories**:
  - 🎨 **Great Design** (UI/UX, visual polish, frontend craft)
  - 🤝 **Helpful** (Mentorship, pair programming, debugging help)
  - ✨ **Creative** (Original ideas, out-of-the-box thinking)
  - 🏆 **Excellent Work** (Flawless delivery, robust smart contracts)
  - 🔥 **Inspiration** (Leadership and high standards)
- **Live Statistics**:
  - Total appreciations recorded on-chain
  - Total unique wallet recipients recognized
  - Personal sent appreciations count
- **Interactive Appreciation Board**:
  - Instant category filtering
  - Live search by wallet address or keywords
  - Direct links to Botchain Block Explorer (`Bohr Scan`)
- **Personal Wallet Activity**:
  - Dedicated tabbed view of recognitions *received* and *sent* by your connected wallet.
- **Gas-Conscious & Secure**:
  - Prevents zero-address submissions
  - Prevents self-appreciation
  - Strictly validates categories (0 to 4)
  - Limits messages to 120 characters to minimize gas and prevent spam
  - No tokens, fees, or financial transactions required

---

## ⛓️ Blockchain Configuration (Botchain Testnet)

| Parameter | Value |
|---|---|
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **Currency Symbol** | `BOHR` |
| **RPC URL** | `https://rpc.bohr.life` |
| **Block Explorer** | [https://scan.bohr.life](https://scan.bohr.life) |

---

## 🛠️ Tech Stack

- **Smart Contract**: Solidity `^0.8.20`, Hardhat
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Web3 Integration**: `wagmi` v2, `viem` v2, `@tanstack/react-query`
- **Wallet Support**: MetaMask / Injected Web3 Provider
- **Icons**: Lucide React

---

## 📂 Project Structure

```text
Applause/
├── contracts/
│   └── Applause.sol          # Main Solidity smart contract
├── scripts/
│   └── deploy.ts             # Hardhat deployment script for Botchain
├── test/
│   └── Applause.test.ts      # Unit tests for validation, gas, and event logs
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind & custom dark charcoal theme
│   │   ├── layout.tsx        # App layout with Wagmi & Query Providers
│   │   └── page.tsx          # Single-page interface & state integration
│   ├── components/
│   │   ├── Header.tsx        # Logo, network badge, MetaMask connect
│   │   ├── Statistics.tsx    # Total, unique recipients, and sent counts
│   │   ├── SendAppreciation.tsx # Recipient, category selector, message form
│   │   ├── AppreciationBoard.tsx # Category filter pills & appreciation feed
│   │   ├── AppreciationCard.tsx  # Individual recognition card
│   │   ├── WalletActivity.tsx    # Received & Sent personal tabs
│   │   ├── Footer.tsx        # Explorer links & contract details
│   │   └── Providers.tsx     # Wagmi + React Query provider wrapper
│   ├── config/
│   │   ├── chain.ts          # Botchain Testnet viem chain definition
│   │   ├── wagmi.ts          # Wagmi client configuration
│   │   └── contract.ts       # Contract ABI, address, and category metadata
│   ├── contracts/
│   │   └── ApplauseAbi.ts    # Typed contract ABI
│   └── utils/
│       └── format.ts         # Address shortening & date formatters
├── hardhat.config.ts         # Hardhat network & compiler settings
├── tailwind.config.ts        # Tailwind configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v18+ or v20+
- **MetaMask** browser extension installed

### 2. Installation

Clone or open the repository directory and install the dependencies:

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```env
# Deployed contract address on Botchain Testnet (Chain ID 968)
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddressHere

# Botchain Testnet RPC
RPC_URL=https://rpc.bohr.life

# Deployer private key (only required when running hardhat deployment)
PRIVATE_KEY=your_private_key_here
```

---

## 🧪 Testing the Smart Contract

Run the comprehensive unit test suite:

```bash
npx hardhat test
```

This tests:
- Rejecting zero-address recipients
- Rejecting self-appreciation
- Rejecting invalid category numbers (`> 4`)
- Rejecting messages exceeding 120 characters
- Emitting the `AppreciationSent` event
- Querying all appreciations, received appreciations, and sent appreciations

---

## 📡 Deploying to Botchain Testnet

1. Ensure your deployer wallet has testnet `BOHR` tokens for gas.
2. Add your private key to `.env`:
   ```env
   PRIVATE_KEY=0x...
   ```
3. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.ts --network botchain
   ```
4. Copy the deployed contract address printed in the terminal into `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`.

---

## 💻 Running the Frontend

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## 🛡️ Security & Privacy Notice

All transactions, messages, sender addresses, and recipient addresses are published permanently to the public Botchain distributed ledger. Users should never enter sensitive credentials, private keys, or personal identifying information into appreciation notes.

---

## 📄 License

MIT

