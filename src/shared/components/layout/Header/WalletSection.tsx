import React from "react";
import DisconnectedMenu from "./DisconnectedMenu";
import ConnectedWalletMenu from "./ConnectedWalletMenu";

type WalletSectionProps = {
  wallet: {
    address: string;
    balance?: number;
  } | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  onDisconnect: () => void;
};

const WalletSection: React.FC<WalletSectionProps> = ({
  wallet,
  open,
  setOpen,
  onDisconnect,
}) => {
  return (
    <div className="flex items-center gap-2">
      {!wallet ? (
        <DisconnectedMenu open={open} setOpen={setOpen} />
      ) : (
        <ConnectedWalletMenu
          wallet={wallet}
          open={open}
          setOpen={setOpen}
          onDisconnect={onDisconnect}
        />
      )}
    </div>
  );
};

export default WalletSection;
