import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { TokenSheet } from "./TokenSheet";
import { useDispatch } from "react-redux";
import { setSelectedToken } from "@/shared/store/tokenSlice";

export const TokenCard = ({ token }: any) => {
  const dispatch = useDispatch();

  return (
    <Sheet>
      <SheetTrigger
        onClick={() => dispatch(setSelectedToken(token))}
        className="w-full cursor-pointer sm:max-w-xs"
      >
        <div className="p-3 pr-4 flex items-center justify-between border dark:border-none bg-muted/50 rounded-2xl hover:bg-muted transition duration-300">
          <div className="flex gap-3 items-center">
            <img
              src={token.image}
              alt={token.name}
              className="h-12 w-12 rounded-full"
            />
            <div className="text-left">
              <p className="text-base font-medium truncate">{token.name}</p>
              <p className="text-sm text-foreground/30">
                {token.balance.toFixed(4)} {token.symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-base font-medium">
              ${token.priceUsd.toLocaleString()}
            </p>
            <p
              className={`text-sm font-medium ${
                token.changeUsd >= 0 ? "text-[#2F7965]" : "text-red-500"
              }`}
            >
              {token.changeUsd >= 0 ? "+" : ""}${token.changeUsd.toFixed(2)}
            </p>
          </div>
        </div>
      </SheetTrigger>

      <TokenSheet />
    </Sheet>
  );
};
