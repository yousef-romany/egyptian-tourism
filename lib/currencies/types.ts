export type Currency = 'USD' | 'EUR' | 'GBP' | 'EGP' | 'AED' | 'SAR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
  rate: number;
}

export interface ExchangeRates {
  rates: Record<Currency, number>;
  timestamp: number;
}
