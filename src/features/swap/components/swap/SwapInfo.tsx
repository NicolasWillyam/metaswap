import type { RootState } from "@/shared/store";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const SwapInfo = () => {
  const swappedToken = useSelector(
    (state: RootState) => state.token.swappedToken
  );
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const { wallet } = useSelector((state: RootState) => state.auth);
  const fromValue = useSelector((state: RootState) => state.swap.fromValue);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!wallet?.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  Math.floor(Math.random() * 1_000_000_000) + 100_000_000;

  if (swappedToken && selectedToken)
    return (
      <div className="space-y-4">
        <div className="p-4 flex flex-col gap-4 bg-muted/50 rounded-2xl">
          {[
            ["Provider", wallet?.walletType],
            [
              "Price",
              `1 ${selectedToken.symbol} = ${(
                selectedToken?.priceUsd / swappedToken?.priceUsd
              ).toFixed(4)} ${swappedToken.symbol} `,
            ],
            [
              "Fee",
              `$${(((fromValue * selectedToken?.priceUsd!) / 100) * 3).toFixed(
                2
              )}`,
            ],
            ["Price Impact", `2.46%`],
            ["Slippage", "0.5%"],
          ].map(([label, value]) => (
            <div key={label} className="w-full flex justify-between text-sm">
              <p className="text-muted-foreground">{label}</p>
              <div className="flex gap-2 items-center">
                <p className="capitalize">{value}</p>
                {label === "Contract address" && (
                  <>
                    {copied ? (
                      <Check
                        size={16}
                        className="text-green-500 transition-all duration-300"
                      />
                    ) : (
                      <Copy
                        size={16}
                        className="cursor-pointer hover:text-blue/300 transition-all duration-300"
                        onClick={handleCopy}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
