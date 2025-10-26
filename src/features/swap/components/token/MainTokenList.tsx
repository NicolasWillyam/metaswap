import { TokenCard } from "./TokenCard";
import { cn } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";

export const MainTokenList = () => {
  const selectedNetwork = useSelector(
    (state: RootState) => state.network.selectedNetwork
  );

  const walletTokens = useSelector((state: RootState) => state.wallet.tokens);

  const filteredTokens =
    selectedNetwork === "All"
      ? walletTokens
      : walletTokens.filter((t) => t.network === selectedNetwork);

  console.log(selectedNetwork);

  return (
    <div
      className={cn(
        filteredTokens.length < 3
          ? "flex justify-center"
          : "max-w-4xl grid sm:grid-cols-3 ",
        `w-full mx-auto gap-3 sm:gap-4`
      )}
    >
      {filteredTokens.length === 0 && (
        <div className="flex flex-col gap-6 items-center p-8 max-w-xs w-full bg-muted dark:bg-muted rounded-2xl">
          <img src="/graph/wallet.svg" alt="" />
          <p className="text-sm text-muted-foreground">
            You do not have any token yet!
          </p>
        </div>
      )}
      {filteredTokens.map((token) => (
        <TokenCard key={token.symbol} token={token} />
      ))}
    </div>
  );
};

export default MainTokenList;
