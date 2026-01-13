import { Currency, CurrencyInfo } from './types';

// Base exchange rates (USD as base)
export const DEFAULT_EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  EGP: 48.5,  // Egyptian Pound
  AED: 3.67,  // UAE Dirham
  SAR: 3.75,  // Saudi Riyal
};

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rate: DEFAULT_EXCHANGE_RATES.USD,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    rate: DEFAULT_EXCHANGE_RATES.EUR,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    rate: DEFAULT_EXCHANGE_RATES.GBP,
  },
  EGP: {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    flag: '🇪🇬',
    rate: DEFAULT_EXCHANGE_RATES.EGP,
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    flag: '🇦🇪',
    rate: DEFAULT_EXCHANGE_RATES.AED,
  },
  SAR: {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'Saudi Riyal',
    flag: '🇸🇦',
    rate: DEFAULT_EXCHANGE_RATES.SAR,
  },
};

// Cache duration: 1 hour
export const CACHE_DURATION = 60 * 60 * 1000;
