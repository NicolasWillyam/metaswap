import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/shared/components/ui/alert-dialog";
import WalletConnectMenu from "@/shared/components/ui/wallet/WalletConnectMenu";

type ConnectWalletDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ConnectWalletDialog = ({ open, setOpen }: ConnectWalletDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer w-full h-full">
        Connect Wallet
      </AlertDialogTrigger>

      <AlertDialogContent className="p-1 rounded-3xl sm:w-fit">
        <WalletConnectMenu />
        <AlertDialogFooter className="p-1">
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="w-full rounded-full"
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectWalletDialog;
