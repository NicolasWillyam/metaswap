import { Input } from "@/shared/components/ui/input";
import { NETWORKS } from "@/shared/constants/networks";
import { Search } from "lucide-react";

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const TokenSearchBar = ({ searchValue, onSearchChange }: Props) => (
  <>
    <div className="w-full rounded-full flex items-center bg-muted/50 py-1 h-10">
      <Search size={20} className="ml-3 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-none rounded-r-full text-sm font-normal bg-transparent focus-visible:ring-0 focus-visible:outline-none"
        placeholder="Search by name or symbol..."
      />
    </div>

    <div className="flex items-center gap-1 my-3 flex-wrap">
      {NETWORKS.map((chain) => (
        <div
          key={chain.id}
          onClick={() => onSearchChange(chain.name)}
          className="bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full text-xs cursor-pointer transition whitespace-nowrap"
        >
          {chain.name}
        </div>
      ))}
    </div>
  </>
);
