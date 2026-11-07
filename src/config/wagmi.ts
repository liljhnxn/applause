import { http, createConfig, createStorage, noopStorage, injected } from "wagmi";
import { botchainMainnet, botchainTestnet } from "./chain";

export const wagmiConfig = createConfig({
  chains: [botchainMainnet, botchainTestnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected(),
  ],
  transports: {
    [botchainMainnet.id]: http("https://rpc.botchain.ai"),
    [botchainTestnet.id]: http("https://rpc.bohr.life"),
  },
  ssr: true,
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
  }),
});
