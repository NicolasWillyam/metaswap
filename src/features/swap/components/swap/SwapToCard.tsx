import { useState } from "react";
import { useSelector } from "react-redux";
import { TokenSelectDrawer } from "../token/TokenSelectDrawer";
import type { RootState } from "@/shared/store";

export const SwapToCard = () => {
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const swappedToken = useSelector(
    (state: RootState) => state.token.swappedToken
  );

  const fromValue = useSelector((state: RootState) => state.swap.fromValue);

  const wallet = useSelector((state: RootState) => state.auth);

  const [_, setActivePercent] = useState<number | null>(null);

  const isWallet = !!wallet.wallet;
  const balance = swappedToken?.balance || 0;
  const symbol = swappedToken?.symbol || "";
  const priceUsd = swappedToken?.priceUsd || 0;
  const selectedPriceUsd = selectedToken?.priceUsd || 0;

  const FEE_PERCENT = 3;
  const swappedValue =
    selectedPriceUsd && priceUsd
      ? (fromValue * selectedPriceUsd * (1 - FEE_PERCENT / 100)) / priceUsd
      : 0;

  console.log("swappedValue", swappedValue);

  const usdValue = (swappedValue * priceUsd).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div className="h-40 p-4 pb-6 flex flex-col gap-4 items-center justify-between bg-muted/50 rounded-2xl">
      <div className="w-full flex items-center justify-between">
        <p className="text-sm text-muted-foreground">To</p>
        {isWallet && swappedToken && (
          <p className="text-sm text-muted-foreground">
            Balance: {balance.toLocaleString()} {symbol}
          </p>
        )}
      </div>

      <div className="w-full flex items-center justify-between">
        <input
          readOnly
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          className={`bg-transparent text-4xl font-medium outline-none w-full
    transition-colors duration-200
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    [appearance:textfield]
    ${
      isWallet && fromValue > selectedToken?.balance!
        ? "text-red-500"
        : "text-foreground"
    }`}
          value={Number(swappedValue.toFixed(4)) || ""}
          placeholder="0.0"
        />

        <TokenSelectDrawer type="to" setActivePercent={setActivePercent} />
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-sm text-muted-foreground">${usdValue}</p>
      </div>
    </div>
  );
};
