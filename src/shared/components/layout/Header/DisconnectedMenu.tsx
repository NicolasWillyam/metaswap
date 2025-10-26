import React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import WalletConnectMenu from "@/shared/components/ui/wallet/WalletConnectMenu";
import GlobalPreferences from "./GlobalPreferences";

type DisconnectedMenuProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const DisconnectedMenu: React.FC<DisconnectedMenuProps> = ({
  open,
  setOpen,
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Global Preferences */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="mt-2 mr-4 w-64 rounded-2xl p-3 space-y-2"
        >
          <GlobalPreferences />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Connect Wallet */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Button size="sm" className="rounded-full">
            Connect
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-3 rounded-2xl">
          <WalletConnectMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DisconnectedMenu;
