import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./swapSlice";
import authReducer from "./authSlice";
import tokenReducer from "./tokenSlice";
import networkReducer from "./networkSlice";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    swap: swapReducer,
    token: tokenReducer,
    network: networkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
