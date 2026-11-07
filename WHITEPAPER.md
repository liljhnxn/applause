# Applause — Whitepaper & Pitch Deck

**Tagline:** *Give good work its recognition.*  
**Network:** Botchain Mainnet (Chain ID: 677)  
**Native Currency:** BOT (Total Supply: 150,000,000)  
**Contract Address:** [`0x8cDCC868F0E758A4902258738b7A0a872d459781`](https://scan.botchain.ai/address/0x8cDCC868F0E758A4902258738b7A0a872d459781#code)  
**GitHub Repository:** [https://github.com/liljhnxn/applause](https://github.com/liljhnxn/applause)  
**Date:** November 2026  

---

## 1. Executive Summary

**Applause** is a lightweight, decentralized appreciation protocol deployed on **Botchain Mainnet**. It provides an immutable, transparent, and non-financialized reputation and recognition layer for creators, developers, designers, and community members. 

In traditional Web2 and existing Web3 platforms, peer recognition is either ephemeral (lost in Discord or Slack chats) or strictly transactional (requiring token tipping, speculative assets, or paywalled platforms). **Applause** returns peer recognition to its purest form: permanent on-chain acknowledgment backed by the security and transparency of the Botchain blockchain.

---

## 2. Problem Statement

1. **Transient Recognition:** Meaningful contributions in open-source projects, hackathons, and decentralized communities are usually acknowledged in private chats, Telegram channels, or Twitter mentions, which are easily lost or censored over time.
2. **Over-Financialization of Gratitude:** Most Web3 tipping applications enforce monetary transfers or custom tokenomics, introducing speculation, volatility, fee friction, and barriers to participation.
3. **Lack of Portable On-Chain Reputation:** Wallets carry financial history (DeFi balances, NFTs) but lack authentic social proof and peer appreciation that reflect collaborative credibility.

---

## 3. The Solution: Applause Protocol

Applause establishes an open, decentralized appreciation registry where:
- Anyone with a Web3 wallet can publicly praise any other wallet address.
- Recognition is categorized into five meaningful peer-review pillars.
- Messages are lightweight, immutable, and preserved forever on the Botchain ledger.
- The platform remains completely non-speculative: no tokens, no fees, no financial barriers.

---

## 4. Key Pillars & Recognition Categories

Applause categorizes praise to ensure high-signal feedback:

| Category | Icon | Focus Area |
| :--- | :---: | :--- |
| **Great Design** | 🎨 | Outstanding UI/UX, graphics, branding, and frontend craftsmanship. |
| **Helpful** | 🤝 | Pair-programming assistance, debugging, mentorship, and support. |
| **Creative** | ✨ | Out-of-the-box thinking, original concepts, and innovative ideas. |
| **Excellent Work** | 🏆 | Flawless technical execution, robust smart contracts, and reliability. |
| **Inspiration** | 🔥 | Leadership, visionary contributions, and community motivation. |

---

## 5. Technical Architecture

### 5.1 Smart Contract Layer
- **Contract Name:** `Applause.sol`
- **Solidity Version:** `^0.8.20`
- **Network:** Botchain Mainnet (EVM Compatible)
- **Chain ID:** `677`
- **Native Currency:** `BOT`
- **RPC URL:** `https://rpc.botchain.ai`
- **Block Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)

#### Core Data Structure
```solidity
struct Appreciation {
    uint256 id;
    address sender;
    address recipient;
    uint8 category;
    string message;
    uint256 timestamp;
}
```

#### Anti-Abuse & Gas-Conscious Safeguards
- **Zero-Address Prohibition:** Prevents accidentally burning gas by sending appreciation to `address(0)`.
- **Self-Appreciation Prevention:** Reverts if `msg.sender == recipient`, maintaining platform integrity.
- **Strict Category Boundaries:** Restricts category values strictly from `0` to `4`.
- **120-Character Message Cap:** Caps payload sizes to minimize calldata and storage costs while keeping messages concise.
- **Indexed Event Emission:** Emits `AppreciationSent` indexed by `id`, `sender`, and `recipient` for instant indexing.

### 5.2 Frontend & Web3 Client Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with a custom dark charcoal palette (`#0b0d11`, `#10131a`) and muted purple/green accents.
- **Web3 Connector:** `wagmi` v2 + `viem` v2 + `@tanstack/react-query`
- **Wallet Compatibility:** Native MetaMask and standard Injected EVM providers.

---

## 6. Pitch Deck Slide Summary

### Slide 1: Cover
* **Title:** Applause
* **Subheading:** Give good work its recognition.
* **Tag:** The On-Chain Appreciation Board for Botchain.

### Slide 2: The Problem
* Peer recognition in Web3 is either lost in noisy chats or locked behind financial tipping.
* Collaborators have no verifiable, on-chain record of their contributions and peer praise.

### Slide 3: The Solution
* Decentralized, public appreciation registry.
* Direct wallet-to-wallet praise permanently etched into Botchain Mainnet.
* Gas-conscious, zero-fee, zero-token mechanics.

### Slide 4: Product Showcase
* **Send Appreciation:** Real-time wallet validation, category selector, 120-char message box.
* **Live Statistics:** Total praises, unique recipients recognized, personal sent count.
* **Appreciation Board:** Category filtering and live keyword/address search.
* **Personal Activity Hub:** Dedicated dashboard for received and sent recognitions.

### Slide 5: Why Botchain?
* High-speed, low-latency transactions.
* Low gas overhead ideal for micro-interactions and social proof on-chain.
* Early builder advantage within an expanding ecosystem.

### Slide 6: Roadmap
* **Phase 1 (Completed):** Smart contract deployment & verification on Botchain Mainnet (Chain ID 677), responsive Next.js dApp.
* **Phase 2:** Discord and GitHub bots enabling on-chain praise directly from developer workspaces.
* **Phase 3:** Soulbound Attestation NFTs for milestone achievements (e.g., 10+ "Great Design" recognitions).
* **Phase 4:** Multi-community leaderboards and API for Web3 developer profiles.

---

## 7. Official Resources & Links

- **Smart Contract (Verified):** [0x8cDCC868F0E758A4902258738b7A0a872d459781](https://scan.botchain.ai/address/0x8cDCC868F0E758A4902258738b7A0a872d459781#code)
- **Source Code (GitHub):** [https://github.com/liljhnxn/applause](https://github.com/liljhnxn/applause)
- **RPC URL:** `https://rpc.botchain.ai`
- **Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
