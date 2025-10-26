export const TokenHeader = ({ token }: any) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div className="flex items-center gap-1.5 sm:absolute left-12 top-4.5">
      <img
        src={token.image}
        alt={token.name}
        className="h-6 w-6 rounded-full"
      />
      <p className="text-lg font-semibold">{token.symbol}</p>
    </div>
    <div className="sm:pt-16 pt-8 text-center space-y-3">
      <p className="text-4xl font-semibold">
        ${token.priceUsd.toLocaleString()}
      </p>
      <p
        className={`font-medium ${
          token.changePercent >= 0 ? "text-[#378273]" : "text-red-500"
        }`}
      >
        {token.changeUsd >= 0 ? "+" : ""}${token.changeUsd.toFixed(2)} (
        {token.changePercent.toFixed(2)}%)
      </p>
    </div>
  </div>
);
