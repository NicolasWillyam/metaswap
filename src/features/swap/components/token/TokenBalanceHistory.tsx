export const TokenBalanceHistory = ({ token }: any) => (
  <div className="space-y-4">
    <div className="w-full flex gap-4">
      <p className="text-sm font-medium">My balance</p>
      <p className="text-sm font-medium text-muted-foreground">History</p>
    </div>
    <div className="p-3 pr-4 flex items-center justify-between bg-muted/50 rounded-2xl">
      <div className="flex gap-2 items-center">
        <img
          src={token.image}
          alt={token.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <p className="text-base font-medium">{token.name}</p>
          <p className="text-sm text-foreground/30">
            {token.balance.toFixed(4)} {token.symbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-base font-medium">
          ${token.priceUsd.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-[#2F7965]">
          +${token.changeUsd.toFixed(2)}
        </p>
      </div>
    </div>
  </div>
);
