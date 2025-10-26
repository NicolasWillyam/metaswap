import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WalletInfo {
  address: string;
  walletType: "MetaMask" | "Binance" | "Coinbase";
}

interface AuthState {
  wallet: WalletInfo | null;
  loading: boolean;
  loadingWallet: string | null;
  recentWallet: WalletInfo | null;
}

const initialState: AuthState = {
  wallet:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wallet") || "null")
      : null,
  loading: false,
  loadingWallet: null,
  recentWallet:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("recentWallet") || "null")
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin(state, action: PayloadAction<string>) {
      state.loading = true;
      state.loadingWallet = action.payload;
    },
    login(state, action: PayloadAction<WalletInfo>) {
      const wallet = action.payload;
      state.wallet = wallet;
      state.loading = false;
      state.loadingWallet = null;

      localStorage.setItem("wallet", JSON.stringify(wallet));
      localStorage.setItem("recentWallet", JSON.stringify(wallet));
      state.recentWallet = wallet;
    },
    logout(state) {
      state.wallet = null;
      state.loading = false;
      state.loadingWallet = null;
      localStorage.removeItem("wallet");
      localStorage.removeItem("tokens");
    },
  },
});

export const { startLogin, login, logout } = authSlice.actions;
export default authSlice.reducer;
