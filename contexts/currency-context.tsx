'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Currency = 'USD' | 'EUR' | 'GBP' | 'EGP'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number | string) => string
  convertPrice: (price: number, fromCurrency?: Currency) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Exchange rates relative to USD (example rates, should be updated from API)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  EGP: 30.9,
}

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  EGP: 'E£',
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  // Load currency preference from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency') as Currency
    if (savedCurrency && exchangeRates[savedCurrency]) {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-currency', currency)
  }, [currency])

  const convertPrice = (price: number, fromCurrency: Currency = 'USD'): number => {
    // Convert from source currency to USD, then to target currency
    const priceInUSD = price / exchangeRates[fromCurrency]
    return priceInUSD * exchangeRates[currency]
  }

  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price

    if (isNaN(numericPrice)) {
      return price.toString()
    }

    const convertedPrice = convertPrice(numericPrice)
    const symbol = currencySymbols[currency]

    return `${symbol}${convertedPrice.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
