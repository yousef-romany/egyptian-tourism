import { Currency } from './types';
import { CURRENCIES, DEFAULT_EXCHANGE_RATES, CACHE_DURATION } from './constants';

/**
 * Convert price from USD to target currency
 */
export function convertPrice(priceInUSD: number, currency: Currency, rates: Record<Currency, number>): number {
  const converted = priceInUSD * rates[currency];
  return Math.round(converted * 100) / 100;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  priceInUSD: number,
  currency: Currency,
  rates: Record<Currency, number>
): string {
  const converted = convertPrice(priceInUSD, currency, rates);
  const currencyInfo = CURRENCIES[currency];

  // Middle Eastern currencies don't use decimals
  if (currency === 'EGP' || currency === 'AED' || currency === 'SAR') {
    return `${currencyInfo.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${currencyInfo.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Parse price string to USD number
 */
export function parsePriceToUSD(priceString: string, currency: Currency, rates: Record<Currency, number>): number {
  // Remove currency symbols and commas
  const numericString = priceString.replace(/[^0-9.]/g, '');
  const price = parseFloat(numericString) || 0;
  
  // Convert back to USD
  return price / rates[currency];
}

/**
 * Fetch live exchange rates from free API
 */
export async function fetchExchangeRates(): Promise<Record<Currency, number>> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    if (data.rates) {
      return {
        USD: 1.0,
        EUR: data.rates.EUR || DEFAULT_EXCHANGE_RATES.EUR,
        GBP: data.rates.GBP || DEFAULT_EXCHANGE_RATES.GBP,
        EGP: data.rates.EGP || DEFAULT_EXCHANGE_RATES.EGP,
        AED: data.rates.AED || DEFAULT_EXCHANGE_RATES.AED,
        SAR: data.rates.SAR || DEFAULT_EXCHANGE_RATES.SAR,
      };
    }
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
  }

  return DEFAULT_EXCHANGE_RATES;
}

/**
 * Load cached exchange rates from localStorage
 */
export function loadCachedRates(): { rates: Record<Currency, number> | null; age: number } {
  if (typeof window === 'undefined') {
    return { rates: null, age: CACHE_DURATION + 1 };
  }

  try {
    const cached = localStorage.getItem('exchangeRates');
    if (cached) {
      const { rates, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      return { rates, age };
    }
  } catch (error) {
    console.error('Failed to load cached rates:', error);
  }

  return { rates: null, age: CACHE_DURATION + 1 };
}

/**
 * Save exchange rates to localStorage
 */
export function saveCachedRates(rates: Record<Currency, number>): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('exchangeRates', JSON.stringify({
      rates,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error('Failed to save cached rates:', error);
  }
}

/**
 * Load saved currency from localStorage
 */
export function loadSavedCurrency(): Currency | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem('selectedCurrency') as Currency;
    if (saved && saved in CURRENCIES) {
      return saved;
    }
  } catch (error) {
    console.error('Failed to load saved currency:', error);
  }

  return null;
}

/**
 * Save currency to localStorage
 */
export function saveCurrency(currency: Currency): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('selectedCurrency', currency);
}
