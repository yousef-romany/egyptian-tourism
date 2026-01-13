"use client"

import { useCurrency } from '@/lib/currencies/provider';
import { Loader2 } from 'lucide-react';

interface PriceDisplayProps {
  priceUSD: number;
  className?: string;
  showOriginal?: boolean;
}

export function PriceDisplay({ priceUSD, className = '', showOriginal = false }: PriceDisplayProps) {
  const { formatPrice, currency, currencies, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <span className="font-bold text-egyptian-gold">
        {formatPrice(priceUSD)}
      </span>
      {showOriginal && currency !== 'USD' && (
        <span className="text-sm text-muted-foreground ml-2">
          (${priceUSD.toLocaleString()})
        </span>
      )}
      {currency !== 'USD' && (
        <span className="text-xs text-muted-foreground ml-1">
          {currencies[currency].flag}
        </span>
      )}
    </div>
  );
}
