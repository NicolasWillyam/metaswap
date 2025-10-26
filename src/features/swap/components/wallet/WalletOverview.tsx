import { TOKENS } from "@/shared/constants/tokens";
import { getTotalChange } from "@/shared/helpers/token.helpers";
import { NetworkSelect } from "../network/NetworkSelect";

export const WalletOverview = () => {
  const { totalValueUsd, totalChangeUsd, totalChangePercent } =
    getTotalChange(TOKENS);

  const isPositive = totalChangeUsd >= 0;

  return (
    <div className="space-y-8">
      <NetworkSelect />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="sm:text-5xl text-4xl font-semibold">
          $
          {totalValueUsd.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </p>

        <p
          className={`font-medium ${
            isPositive ? "text-[#378273]" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : "-"}$
          {Math.abs(totalChangeUsd).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          ({isPositive ? "+" : "-"}
          {Math.abs(totalChangePercent).toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};
