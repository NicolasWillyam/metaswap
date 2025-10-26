import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/components/ui/dropdown-menu";
import { shortenAddress } from "@/shared/lib/utils";
import { Check, Copy, Wallet as WalletIcon } from "lucide-react";
import { getTotalChange } from "@/shared/helpers/token.helpers";
import { TOKENS } from "@/shared/constants/tokens";
import GlobalPreferences from "./GlobalPreferences";
import { useNavigate } from "react-router-dom";

type ConnectedWalletMenuProps = {
  wallet: any;
  open: boolean;
  setOpen: (value: boolean) => void;
  onDisconnect: () => void;
};

const ConnectedWalletMenu: React.FC<ConnectedWalletMenuProps> = ({
  wallet,
  open,
  setOpen,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { totalValueUsd } = getTotalChange(TOKENS);

  const handleCopy = async () => {
    if (!wallet?.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="rounded-full pl-2">
          <div className="w-6 h-6 rounded-full bg-emerald-300"></div>
          {shortenAddress(wallet.address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-2 w-64 rounded-3xl p-3 space-y-3"
      >
        <p className="text-xs text-muted-foreground">Connected wallet:</p>
        <div className="flex items-center justify-between px-3 bg-blue-500/10 text-blue-500 h-9 rounded-md">
          <p className="text-sm font-medium truncate">
            {shortenAddress(wallet.address)}
          </p>
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy
              size={16}
              className="cursor-pointer hover:text-blue-400"
              onClick={handleCopy}
            />
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Wallet Balance:</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              $
              {totalValueUsd.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => navigate("/wallet")}
            >
              <WalletIcon />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">System preferences:</p>
        <GlobalPreferences />

        <Button
          size="sm"
          variant="destructive"
          className="w-full mt-2 rounded-full"
          onClick={onDisconnect}
        >
          Disconnect
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectedWalletMenu;
