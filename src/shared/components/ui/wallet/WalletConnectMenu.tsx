import { LoaderCircle } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";
import { useWallet } from "@/shared/hooks/useWallet";

const fakeWallets = {
  MetaMask: "0x4b6AE3eCada23eF4E19e111B6902650AAE532B51",
  Binance: "0xA12cE3f1bAAa7789Df9112224B9012CdEf001234",
  Coinbase: "0x8BfE11Aa2C3422eAD1F0Bb22Cef4AcdE11223344",
};

const WalletConnectMenu = () => {
  const { loadingWallet, connectWallet } = useWallet();
  const { recentWallet } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-80 rounded-2xl p-3 space-y-2">
      <p className="text-sm font-medium mb-3">Connect a wallet</p>

      {Object.entries(fakeWallets).map(([name]) => {
        const isRecent = recentWallet?.walletType === name;
        return (
          <div
            key={name}
            onSelect={(e) => e.preventDefault()}
            onClick={() => connectWallet(name as keyof typeof fakeWallets)}
            className="bg-muted/30 hover:bg-muted transition-all duration-300 h-auto p-3 rounded-xl cursor-pointer flex items-center gap-3 text-sm -mx-2"
          >
            <img
              src={
                name === "MetaMask"
                  ? "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  : name === "Binance"
                  ? "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png"
                  : "https://raw.githubusercontent.com/gist/taycaldwell/2291907115c0bb5589bc346661435007/raw/cbw.svg"
              }
              alt={name}
              className="h-10 w-10 rounded-lg"
            />
            <p>{name} Wallet </p>

            {loadingWallet === name ? (
              <LoaderCircle
                size={20}
                className="animate-spin text-primary ml-auto mr-2"
              />
            ) : (
              <>
                {isRecent && (
                  <span className="text-xs font-medium flex items-center gap-1 ml-auto mr-2 bg-blue-500/10 text-blue-500 py-1 px-2 rounded-sm">
                    Recent
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}

      <p className="text-xs text-center text-muted-foreground mt-3">
        By connecting a wallet, you agree to Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );
};

export default WalletConnectMenu;
