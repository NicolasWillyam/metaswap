import { useState } from "react";

export const TokenChart = ({ token }: any) => {
  const [range, setRange] = useState("1D");

  const chartSrc = `/graph/${range}.svg`;

  const fallbackSrc = `/graph/${token.symbol.toLowerCase()}.svg`;

  const ranges = ["1H", "1D", "1W", "1M", "YTD", "ALL"];

  return (
    <div className="space-y-6">
      <img src={chartSrc || fallbackSrc} alt={token.name} className="w-full" />
      <div className="w-full grid grid-cols-6 gap-1 max-w-sm mx-auto">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`text-xs px-3 py-2 rounded-sm font-semibold text-center transition-colors cursor-pointer ${
              r === range
                ? "bg-muted text-foreground"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};
