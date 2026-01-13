"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency } from './types';
import { DEFAULT_EXCHANGE_RATES, CURRENCIES, CACHE_DURATION } from './constants';
import {
  formatPrice,
  convertPrice,
  fetchExchangeRates,
  loadCachedRates,
  saveCachedRates,
  loadSavedCurrency,
  saveCurrency,
} from './utils';

interface CurrencyContextType {
  currency: Currency;
  currencies: typeof CURRENCIES;
  rates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number) => string;
  updateRates: () => Promise<void>;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [rates, setRates] = useState(DEFAULT_EXCHANGE_RATES);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize currency and rates on mount
  useEffect(() => {
    // Load saved currency
    const savedCurrency = loadSavedCurrency();
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }

    // Load cached rates or fetch new ones
    const { rates: cachedRates, age } = loadCachedRates();
    
    if (cachedRates && age < CACHE_DURATION) {
      setRates(cachedRates);
    } else {
      // Fetch new rates
      updateRates();
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    saveCurrency(newCurrency);
  };

  const updateRates = async () => {
    setIsLoading(true);
    try {
      const newRates = await fetchExchangeRates();
      setRates(newRates);
      saveCachedRates(newRates);
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: CurrencyContextType = {
    currency,
    currencies: CURRENCIES,
    rates,
    setCurrency,
    convertPrice: (priceInUSD: number) => convertPrice(priceInUSD, currency, rates),
    formatPrice: (priceInUSD: number) => formatPrice(priceInUSD, currency, rates),
    updateRates,
    isLoading,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
