import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeftRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { SwapFromCard } from "./SwapFromCard";
import { SwapToCard } from "./SwapToCard";
import { SwapInfo } from "./SwapInfo";
import { SwapHeader } from "./SwapHeader";
import SwapButton from "./SwapButton";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/shared/store";
import { setWalletTokens } from "@/shared/store/walletSlice";
import { setSelectedToken, setSwappedToken } from "@/shared/store/tokenSlice";
import { setFromValue } from "@/shared/store/swapSlice";
import type { Token } from "@/core/entities/Token";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

export const SwapDrawer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fromValue = useSelector((state: RootState) => state.swap.fromValue);
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const swappedToken = useSelector(
    (state: RootState) => state.token.swappedToken
  );

  const isValidable =
    selectedToken &&
    swappedToken &&
    fromValue > 0 &&
    fromValue <= selectedToken?.balance!;

  const launchFireworks = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 100 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.2, 0.8),
          y: Math.random() - 0.2,
        },
      });
    }, 200);
  };

  const handleSwap = () => {
    if (!selectedToken || !swappedToken || fromValue <= 0) return;
    setLoading(true);

    setTimeout(() => {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "[]");
      const fromAmountUsd = fromValue * selectedToken.priceUsd;
      const toAmount = fromAmountUsd / swappedToken.priceUsd;

      const updatedTokens = tokens.map((t: any) => {
        if (t.symbol === selectedToken.symbol) {
          return { ...t, balance: Math.max(0, t.balance - fromValue) };
        }
        if (t.symbol === swappedToken.symbol) {
          return { ...t, balance: t.balance + toAmount };
        }
        return t;
      });

      localStorage.setItem("tokens", JSON.stringify(updatedTokens));
      dispatch(setWalletTokens(updatedTokens));

      const updatedFrom = updatedTokens.find(
        (t: Token) => t.symbol === selectedToken.symbol
      );
      const updatedTo = updatedTokens.find(
        (t: Token) => t.symbol === swappedToken.symbol
      );

      if (updatedFrom) dispatch(setSelectedToken(updatedFrom));
      if (updatedTo) dispatch(setSwappedToken(updatedTo));
      dispatch(setFromValue(0));

      setLoading(false);
      setOpenDialog(true);
      launchFireworks();
    }, 3000);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 bg-muted/50 rounded-full flex items-center justify-center cursor-pointer">
            <ArrowLeftRight />
          </div>
          <p className="font-medium text-sm">Swap</p>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:min-w-full flex flex-col justify-center">
        <div className="py-4.5 space-y-8 px-4 mx-auto w-full">
          <SwapHeader />
          <div className="space-y-4 w-full max-w-md mx-auto">
            <SwapFromCard />
            <SwapButton />
            <SwapToCard />
            <SwapInfo />
            <Button
              disabled={!isValidable || loading}
              className="w-full rounded-full h-10 flex items-center justify-center gap-2"
              onClick={handleSwap}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap"
              )}
            </Button>
          </div>
        </div>
      </SheetContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col items-center justify-center text-center space-y-4 w-96 rounded-3xl pb-2 px-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Swap Successful!
            </DialogTitle>
            <DialogDescription className="text-center">
              You have successfully swapped your tokens. 🎊
            </DialogDescription>
          </DialogHeader>
          <div className="w-full space-y-3">
            <Button
              className="w-full rounded-full h-10"
              onClick={() => setOpenDialog(false)}
            >
              <ArrowLeftRight />
              Continue Swap
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};
