export interface SwapRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface SwapResult {
  convertedAmount: number;
  rate: number;
}
