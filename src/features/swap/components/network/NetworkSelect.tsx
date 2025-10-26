import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { NETWORKS } from "@/shared/constants/networks";
import type { RootState } from "@/shared/store";
import { setSelectedNetwork } from "@/shared/store/networkSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function NetworkSelect() {
  const dispatch = useDispatch();
  const selectedNetwork = useSelector(
    (state: RootState) => state.network.selectedNetwork
  );

  useEffect(() => {
    if (!selectedNetwork) dispatch(setSelectedNetwork("All"));
  }, [selectedNetwork, dispatch]);

  return (
    <Select
      value={selectedNetwork ?? "All"}
      onValueChange={(value) => dispatch(setSelectedNetwork(value))}
    >
      <SelectTrigger className="w-fit mx-auto rounded-full cursor-pointer">
        <SelectValue placeholder="Select network" />
      </SelectTrigger>

      <SelectContent className="rounded-xl">
        <SelectItem
          key="all"
          value="All"
          className="h-9 rounded-lg cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span>All Networks</span>
          </div>
        </SelectItem>

        {NETWORKS.map((net) => (
          <SelectItem
            key={net.id}
            value={net.name}
            className="h-9 rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img src={net.icon} alt={net.name} className="w-4 h-4" />
              <span>{net.name}</span>
              <div
                className="w-2 h-2 rounded-full ml-auto"
                style={{ backgroundColor: net.color }}
              />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
