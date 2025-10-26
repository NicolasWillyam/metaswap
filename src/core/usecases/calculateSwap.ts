import type { SwapRequest, SwapResult } from "../entities/Swap";
import type { ITokenRepository } from "../repositories/ITokenRepository";

export async function calculateSwap(
  request: SwapRequest,
  tokenRepo: ITokenRepository
): Promise<SwapResult> {
  const fromPrice = await tokenRepo.getTokenPrice(request.fromCurrency);
  const toPrice = await tokenRepo.getTokenPrice(request.toCurrency);

  if (!fromPrice || !toPrice) {
    throw new Error("Invalid token selection.");
  }

  const rate = toPrice / fromPrice;
  const convertedAmount = request.amount * rate;

  return { convertedAmount, rate };
}
