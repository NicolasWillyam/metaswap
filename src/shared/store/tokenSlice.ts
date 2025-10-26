import type { Token } from "@/core/entities/Token";
import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
  selectedToken: Token | null;
  swappedToken: Token | null;
}

const initialState: TokenState = {
  selectedToken: null,
  swappedToken: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setSelectedToken: (state, action: any) => {
      state.selectedToken = action.payload;
    },
    clearSelectedToken: (state) => {
      state.selectedToken = null;
    },
    setSwappedToken: (state, action: any) => {
      state.swappedToken = action.payload;
    },
    clearSwappedToken: (state) => {
      state.swappedToken = null;
    },
  },
});

export const {
  setSelectedToken,
  clearSelectedToken,
  setSwappedToken,
  clearSwappedToken,
} = tokenSlice.actions;
export default tokenSlice.reducer;
