import { SheetContent } from "@/shared/components/ui/sheet";
import { TokenHeader } from "./TokenHeader";
import { TokenChart } from "./TokenChart";

import { TokenBalanceHistory } from "./TokenBalanceHistory";
import { TokenStats } from "./TokenStats";
import { QuickActions } from "../action/QuickActions";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store";

export const TokenSheet = () => {
  const token = useSelector((state: RootState) => state.token.selectedToken);
  return (
    <SheetContent className="min-w-full min-h-screen overflow-y-scroll pb-12">
      <div className="py-4 space-y-8 px-4 max-w-md w-full mx-auto">
        <TokenHeader token={token} />
        <TokenChart token={token} />
        <QuickActions />
        <TokenBalanceHistory token={token} />
        <TokenStats token={token!} />
      </div>
    </SheetContent>
  );
};
