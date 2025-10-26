import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NetworkState {
  selectedNetwork: string | null;
}

const initialState: NetworkState = {
  selectedNetwork: null,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setSelectedNetwork: (state, action: PayloadAction<string | null>) => {
      state.selectedNetwork = action.payload;
    },
  },
});

export const { setSelectedNetwork } = networkSlice.actions;
export default networkSlice.reducer;
