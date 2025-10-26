import type { Token } from "../entities/Token";

export interface ITokenRepository {
  getAllTokens(): Promise<Token[]>;
  getTokenPrice(symbol: string): Promise<number | null>;
}
