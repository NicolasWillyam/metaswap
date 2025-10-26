import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { TokenSearchBar } from "./TokenSearchBar";
import { TokenList } from "./TokenList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/shared/store";
import { setSelectedToken, setSwappedToken } from "@/shared/store/tokenSlice";
import { useState } from "react";

interface Props {
  type: "from" | "to";
  setActivePercent: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TokenSelectDrawer = ({ type, setActivePercent }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) =>
    type === "from" ? state.token.selectedToken : state.token.swappedToken
  );

  const currentSymbol = token?.symbol || "";
  const currentSymbolImage = token?.image || "";

  const handleSelect = (t: any) => {
    if (type === "from") dispatch(setSelectedToken(t));
    else dispatch(setSwappedToken(t));

    setActivePercent(null);
    setOpen(false);
    setSearchValue(""); // clear search when close
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="cursor-pointer">
        <div className="p-1 pr-4 rounded-full bg-muted flex items-center gap-2">
          {currentSymbolImage && (
            <>
              <img
                src={currentSymbolImage}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </>
          )}

          {currentSymbol ? (
            <>
              <p className="mr-8">{currentSymbol}</p>
            </>
          ) : (
            <>
              <div className="h-8 pl-3 flex items-center">
                <p className="text-sm">Select</p>
              </div>
            </>
          )}
        </div>
      </DrawerTrigger>

      <DrawerContent className="h-[98vh] rounded-xl">
        <DrawerHeader className="max-w-md w-full h-full mx-auto">
          <TokenSearchBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          <TokenList onSelectToken={handleSelect} searchValue={searchValue} />
        </DrawerHeader>

        <DrawerFooter className="max-w-md w-full mx-auto pt-0">
          <DrawerClose asChild>
            <Button className="w-full rounded-full h-10 cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
