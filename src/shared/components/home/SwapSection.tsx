import { Button } from "@/shared/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";
import SwapButton from "@/features/swap/components/swap/SwapButton";
import ConnectWalletDialog from "./ConnectWalletDialog";
import { SwapFromCard } from "@/features/swap/components/swap/SwapFromCard";
import { SwapToCard } from "@/features/swap/components/swap/SwapToCard";

type SwapSectionProps = {
  isHasWallet: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  navigate: (path: string) => void;
};

const SwapSection = ({
  isHasWallet,
  open,
  setOpen,
  navigate,
}: SwapSectionProps) => {
  const fromValue = useSelector((state: RootState) => state.swap.fromValue);
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const swappedToken = useSelector(
    (state: RootState) => state.token.swappedToken
  );

  return (
    <div className="space-y-4 w-full max-w-md mx-auto z-10">
      <SwapFromCard />
      <SwapButton />
      <SwapToCard />

      <Button
        onClick={() =>
          isHasWallet &&
          navigate(
            `/swap?from=${selectedToken?.symbol}&to=${swappedToken?.symbol}&amount=${fromValue}`
          )
        }
        className="w-full rounded-full h-12"
      >
        {isHasWallet ? (
          <div className="flex items-center gap-2">
            <ArrowLeftRight />
            <p>Swap</p>
          </div>
        ) : (
          <ConnectWalletDialog open={open} setOpen={setOpen} />
        )}
      </Button>

      <p className="text-center px-10 text-muted-foreground pt-2 text-sm">
        Buy and sell crypto on 15+ networks including Ethereum, Unichain, and
        Base
      </p>
    </div>
  );
};

export default SwapSection;
