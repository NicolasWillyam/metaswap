import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenSelectDrawer } from "../token/TokenSelectDrawer";
import type { RootState } from "@/shared/store";
import { setFromValue } from "@/shared/store/swapSlice";

export const SwapFromCard = () => {
  const dispatch = useDispatch();
  const fromValue = useSelector((state: RootState) => state.swap.fromValue);
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const wallet = useSelector((state: RootState) => state.auth);

  const [activePercent, setActivePercent] = useState<number | null>(null);
  const [localValue, setLocalValue] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);

  console.log(percent);

  const balance = selectedToken?.balance || 0;
  const symbol = selectedToken?.symbol || "";
  const priceUsd = selectedToken?.priceUsd || 0;
  const isWallet = !!wallet.wallet;

  useEffect(() => {
    setLocalValue(fromValue ? fromValue.toString() : "");
  }, [fromValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Chỉ cho phép số và dấu chấm
    if (/^\d*\.?\d*$/.test(value)) {
      // Giới hạn tối đa 4 chữ số sau dấu phẩy
      const parts = value.split(".");
      if (parts.length === 2 && parts[1].length > 4) {
        parts[1] = parts[1].slice(0, 4);
        value = parts.join(".");
      }

      setLocalValue(value);
      dispatch(setFromValue(Number(value) || 0));
      setActivePercent(null);
    }
  };

  const usdValue = (fromValue * priceUsd).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-4 pb-6 flex flex-col items-center justify-between bg-muted/50 rounded-2xl h-40">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Swap</p>
        {isWallet && selectedToken && (
          <p className="text-sm text-muted-foreground">
            Balance: {balance.toLocaleString()} {symbol}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="w-full flex items-center justify-between mt-2">
        <input
          type="text"
          inputMode="decimal"
          className={`bg-transparent text-4xl font-medium outline-none w-full
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [appearance:textfield]
            ${
              fromValue > balance && isWallet
                ? "text-red-500"
                : "text-foreground"
            }`}
          value={localValue}
          placeholder="0.0"
          onChange={handleChange}
        />
        <TokenSelectDrawer type="from" setActivePercent={setActivePercent} />
      </div>

      {/* USD Value + Percent */}
      <div className="w-full flex justify-between items-center h-6 mb-1">
        <p className="text-sm text-muted-foreground">${usdValue}</p>
        {isWallet && selectedToken && (
          <div className="flex gap-1">
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                onClick={() => {
                  const newValue = (balance * p) / 100;

                  setPercent(p);
                  dispatch(setFromValue(newValue));
                  setActivePercent(p);
                }}
                className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
                  activePercent === p
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted hover:bg-muted-foreground/20"
                }`}
              >
                {p === 100 ? "MAX" : `${p}%`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
