/**
 * Currency conversion utilities
 * Exchange rates are approximate and should be updated regularly
 * For production, consider using a currency API service
 */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'EGP' | 'AED'

export const CURRENCIES: Record<Currency, { symbol: string; name: string }> = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  EGP: { symbol: 'E£', name: 'Egyptian Pound' },
  AED: { symbol: 'AED', name: 'UAE Dirham' },
}

// Base exchange rates (USD as base currency)
// These are approximate rates - update regularly or use a real API
export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92, // 1 USD = 0.92 EUR (approximate)
  GBP: 0.79, // 1 USD = 0.79 GBP (approximate)
  EGP: 30.9, // 1 USD = 30.9 EGP (approximate)
  AED: 3.67, // 1 USD = 3.67 AED (approximate)
}

/**
 * Convert price from USD to target currency
 */
export function convertCurrency(priceUSD: number, targetCurrency: Currency): number {
  const rate = EXCHANGE_RATES[targetCurrency]
  return priceUSD * rate
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: Currency): string {
  const { symbol } = CURRENCIES[currency]
  
  if (currency === 'EGP' || currency === 'AED') {
    // No decimals for EGP and AED
    return `${symbol} ${Math.round(amount).toLocaleString()}`
  }
  
  // 2 decimals for USD, EUR, GBP
  return `${symbol}${amount.toFixed(2)}`
}

/**
 * Parse price string (e.g., "$89" or "$89.00") and return number
 */
export function parsePrice(priceString: string): number {
  // Remove currency symbols and extract number
  const cleaned = priceString.replace(/[$€£E£AED,]/g, '').trim()
  return parseFloat(cleaned) || 0
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES[currency].symbol
}