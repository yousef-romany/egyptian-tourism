'use client'

import React from 'react'
import { useCurrency } from '@/lib/currencies/provider'
import { Currency } from '@/lib/currency'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency()

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[120px] h-9">
        <SelectValue>
          <span className="flex items-center gap-1">
            <span>{currencies[currency].symbol}</span>
            <span className="hidden sm:inline">{currency}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(currencies).map(([code, { symbol, name }]) => (
          <SelectItem key={code} value={code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{symbol}</span>
              <span>{code}</span>
              <span className="text-muted-foreground text-sm">- {name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}