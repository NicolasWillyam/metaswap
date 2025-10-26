import type { Token } from "@/core/entities/Token";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

export interface WalletInfo {
  address: string;
  walletType: "MetaMask" | "Binance" | "Coinbase";
}

interface WalletState {
  info: WalletInfo | null;
  tokens: Token[];
  loading: boolean;
}

const initialState: WalletState = {
  info:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("walletInfo") || "null")
      : null,
  tokens:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("tokens") || "[]")
      : [],
  loading: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletInfo(state, action: PayloadAction<WalletInfo | null>) {
      state.info = action.payload;
      if (action.payload) {
        localStorage.setItem("tokens", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("tokens");
      }
    },
    setWalletTokens(state, action: PayloadAction<Token[]>) {
      state.tokens = action.payload;
      localStorage.setItem("tokens", JSON.stringify(action.payload));
    },
    updateTokenBalance(
      state,
      action: PayloadAction<{ symbol: string; balance: number }>
    ) {
      const token = state.tokens.find(
        (t) => t.symbol === action.payload.symbol
      );
      if (token) token.balance = action.payload.balance;
    },
    setWalletLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.tokens = [];
    });
  },
});

export const {
  setWalletInfo,
  setWalletTokens,
  updateTokenBalance,
  setWalletLoading,
} = walletSlice.actions;

export default walletSlice.reducer;
