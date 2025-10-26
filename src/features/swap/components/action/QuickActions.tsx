import { ScanLine, Send, Wallet } from "lucide-react";
import { SwapDrawer } from "../swap/SwapDrawer";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export const QuickActions = () => {
  const actions = [
    { icon: <Send />, label: "Send" },
    { icon: <ScanLine />, label: "Receive" },
    { icon: <Wallet />, label: "Buy" },
  ];

  return (
    <div className="flex items-center justify-center gap-6">
      {actions.map((a) => (
        <Tooltip>
          <TooltipTrigger>
            <div
              key={a.label}
              className="flex flex-col items-center gap-2 cursor-pointer opacity-30"
            >
              <div className="h-14 w-14 bg-muted/50  rounded-full flex items-center justify-center">
                {a.icon}
              </div>
              <p className="font-medium text-sm">{a.label}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming soon</p>
          </TooltipContent>
        </Tooltip>
      ))}
      <SwapDrawer />
    </div>
  );
};
