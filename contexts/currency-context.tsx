'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Currency, convertCurrency, formatPrice, parsePrice } from '@/lib/currency'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (priceUSD: number | string) => number
  formatPrice: (priceUSD: number | string) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

interface CurrencyProviderProps {
  children: ReactNode
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>('USD')

  // Load saved currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency
    if (savedCurrency && ['USD', 'EUR', 'GBP', 'EGP', 'AED'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  // Save currency to localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  // Convert price from USD to current currency
  const convertPriceValue = (priceUSD: number | string): number => {
    const price = typeof priceUSD === 'string' ? parsePrice(priceUSD) : priceUSD
    return convertCurrency(price, currency)
  }

  // Format price with currency symbol
  const formatPriceValue = (priceUSD: number | string): string => {
    const price = typeof priceUSD === 'string' ? parsePrice(priceUSD) : priceUSD
    const converted = convertCurrency(price, currency)
    return formatPrice(converted, currency)
  }

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    convertPrice: convertPriceValue,
    formatPrice: formatPriceValue,
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}