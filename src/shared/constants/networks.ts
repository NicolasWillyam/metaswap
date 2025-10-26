export interface NetworkOption {
  id: string;
  name: string;
  chainId?: number;
  color: string;
  icon: string;
}

export interface NetworkOption {
  id: string;
  name: string;
  chainId?: number;
  color: string;
  icon: string;
}

export const NETWORKS: NetworkOption[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    chainId: 1,
    color: "#627EEA",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg",
  },
  {
    id: "bsc",
    name: "BNB Chain",
    chainId: 56,
    color: "#F0B90B",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BNB.svg",
  },
  {
    id: "polygon",
    name: "Polygon",
    chainId: 137,
    color: "#8247E5",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/MATIC.svg",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    chainId: 42161,
    color: "#28A0F0",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ARB.svg",
  },
  {
    id: "optimism",
    name: "Optimism",
    chainId: 10,
    color: "#FF0420",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OP.svg",
  },
  {
    id: "cosmos",
    name: "Cosmos",
    color: "#2E3148",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ATOM.svg",
  },
  {
    id: "osmosis",
    name: "Osmosis",
    color: "#7C4DFF",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OSMO.svg",
  },
  {
    id: "kujira",
    name: "Kujira",
    color: "#007AFF",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KUJI.svg",
  },
  {
    id: "neo",
    name: "Neo",
    color: "#58BF00",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg",
  },
  {
    id: "okx chain",
    name: "OKX Chain",
    color: "#000000",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKB.svg",
  },
  {
    id: "zilliqa",
    name: "Zilliqa",
    color: "#49C1BF",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZIL.svg",
  },
  {
    id: "injective",
    name: "Injective",
    color: "#0B9DF2",
    icon: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/INJ.svg",
  },
];
