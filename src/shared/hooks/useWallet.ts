import { useDispatch, useSelector } from "react-redux";
import { login, logout, startLogin } from "@/shared/store/authSlice";
import type { RootState } from "@/shared/store";
import { TOKENS } from "../constants/tokens";
import { setWalletTokens } from "../store/walletSlice";

const fakeWallets = {
  MetaMask: "0x4b6AE3eCada23eF4E19e111B6902650AAE532B51",
  Binance: "0xA12cE3f1bAAa7789Df9112224B9012CdEf001234",
  Coinbase: "0x8BfE11Aa2C3422eAD1F0Bb22Cef4AcdE11223344",
};

export const useWallet = () => {
  const dispatch = useDispatch();
  const { wallet, loading, loadingWallet } = useSelector(
    (state: RootState) => state.auth
  );

  const connectWallet = (walletName: keyof typeof fakeWallets) => {
    if (loading) return;
    dispatch(startLogin(walletName));

    dispatch(setWalletTokens(TOKENS));

    setTimeout(() => {
      const walletInfo = {
        address: fakeWallets[walletName],
        walletType: walletName,
      };
      dispatch(login(walletInfo));
    }, 2000);
  };

  const disconnectWallet = () => {
    dispatch(logout());
  };

  return {
    wallet,
    loading,
    loadingWallet,
    connectWallet,
    disconnectWallet,
  };
};
