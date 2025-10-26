import { TOKENS } from "@/shared/constants/tokens";
import { TokenItem } from "./TokenItem";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";

interface TokenListProps {
  onSelectToken?: (token: any) => void;
  searchValue?: string;
}

export const TokenList = ({
  onSelectToken,
  searchValue = "",
}: TokenListProps) => {
  const walletTokens = useSelector((state: RootState) => state.wallet.tokens);

  console.log("walletTokens", walletTokens);
  const wallet = useSelector((state: RootState) => state.auth);
  const isWallet = !!wallet.wallet;

  console.log(isWallet);

  const filteredTokens = isWallet
    ? walletTokens.filter(
        (token) =>
          token.network.includes(searchValue) ||
          token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
    : TOKENS;

  return (
    <ScrollArea className="h-[calc(80vh-168px)] w-full">
      <div className="space-y-2">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token) => (
            <TokenItem
              key={token.symbol}
              token={token}
              onClick={() => onSelectToken?.(token)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground text-sm mt-8">
            No tokens found
          </p>
        )}
      </div>
    </ScrollArea>
  );
};
