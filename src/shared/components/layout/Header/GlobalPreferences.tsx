import { ChevronRight } from "lucide-react";
import { ModeToggle } from "@/shared/components/ModeToggle";

const GlobalPreferences = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground font-medium">Theme</p>
        <ModeToggle />
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground font-medium">Language</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">English</p>
          <ChevronRight />
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground font-medium">Currency</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">USD</p>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default GlobalPreferences;
