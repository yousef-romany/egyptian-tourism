'use client'

import { useCurrency } from '@/contexts/currency-context'

interface PriceDisplayProps {
  price: number | string
  className?: string
}

/**
 * Client component for displaying prices with currency conversion
 * Can be used in server components
 */
export function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  const { formatPrice } = useCurrency()

  return <span className={className}>{formatPrice(price)}</span>
}