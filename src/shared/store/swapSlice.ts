import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SwapState {
  fromValue: number;
  toValue: number;
}

const initialState: SwapState = {
  fromValue: 0,
  toValue: 0,
};

const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setFromValue: (state, action: PayloadAction<number>) => {
      state.fromValue = action.payload;
    },
    setToValue: (state, action: PayloadAction<number>) => {
      state.toValue = action.payload;
    },
    resetSwap: (state) => {
      state.fromValue = 0;
      state.toValue = 0;
    },
  },
});

export const { setFromValue, setToValue, resetSwap } = swapSlice.actions;
export default swapSlice.reducer;
