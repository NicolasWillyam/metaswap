import type { Token } from "@/core/entities/Token";

export const getTotalValueUsd = (tokens: Token[]): number => {
  return tokens.reduce((acc, t) => acc + t.balance * t.priceUsd, 0);
};

export const getTotalChange = (tokens: Token[]) => {
  const totalValueUsd = getTotalValueUsd(tokens);
  const totalChangeUsd = tokens.reduce(
    (acc, t) => acc + t.balance * t.changeUsd,
    0
  );

  const totalChangePercent =
    totalValueUsd !== 0 ? (totalChangeUsd / totalValueUsd) * 100 : 0;

  return {
    totalValueUsd,
    totalChangeUsd,
    totalChangePercent,
  };
};
