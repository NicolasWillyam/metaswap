import type { Token } from "@/core/entities/Token";
import { NETWORKS } from "@/shared/constants/networks";
import type { RootState } from "@/shared/store";
import { useSelector } from "react-redux";

type TokenItemProps = {
  token: Token;
  onClick?: () => void;
};

export const TokenItem = ({ token, onClick }: TokenItemProps) => {
  const wallet = useSelector((state: RootState) => state.auth);
  const isWallet = !!wallet.wallet;

  // 🔍 Lấy thông tin network tương ứng
  const network = NETWORKS.find((n) => n.name === token.network);

  return (
    <div
      className="p-3 pr-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-3 items-center">
        <div className="relative">
          {/* Token icon */}
          <img
            src={token.image}
            alt={token.name}
            className="h-10 w-10 rounded-full"
          />

          {/* Network icon (hiển thị dưới góc phải) */}
          {network && (
            <img
              src={network.icon}
              alt={network.name}
              title={network.name}
              className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border border-background"
              style={{
                backgroundColor: network.color + "20", // nền mờ theo màu mạng
              }}
            />
          )}
        </div>

        {/* Thông tin token */}
        <div className="text-left">
          <p className="text-base font-medium">{token.name}</p>
          {isWallet ? (
            <p className="text-sm text-foreground/30">
              {token.balance.toFixed(4)} {token.symbol}
            </p>
          ) : (
            <p className="text-sm text-foreground/30">
              ${token.priceUsd.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
