import type { Token } from "@/core/entities/Token";
import { shortenAddress } from "@/shared/lib/utils";
import type { RootState } from "@/shared/store";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function formatNumberWithSuffix(value: number): string {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return value.toString();
}

export const TokenStats = ({ token }: { token: Token }) => {
  const { wallet } = useSelector((state: RootState) => state.auth);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!wallet?.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomVolume = Math.floor(Math.random() * 100_000_000) + 1_000_000;
  const randomMarketCap =
    Math.floor(Math.random() * 1_000_000_000) + 100_000_000;
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Token details</p>
      <div className="p-4 flex flex-col gap-4 bg-muted/50 rounded-2xl">
        {[
          ["Network", token.network],
          ["Contract address", shortenAddress(wallet?.address!)],
          ["Price", `$${token.priceUsd.toLocaleString()}`],
          ["Change 24h", `${token.changePercent}%`],
          ["Volume24h", formatNumberWithSuffix(randomVolume)],
          ["Marketcap", formatNumberWithSuffix(randomMarketCap)],
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
