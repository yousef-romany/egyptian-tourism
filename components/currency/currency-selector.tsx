"use client"

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrency } from '@/lib/currencies/provider';
import { ChevronDown } from 'lucide-react';

export function CurrencySelector() {
  const { currency, currencies, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span className="text-lg">{currencies[currency].flag}</span>
          <span className="hidden sm:inline">{currency}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.values(currencies).map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{curr.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{curr.code}</div>
              <div className="text-xs text-muted-foreground">{curr.name}</div>
            </div>
            {currency === curr.code && (
              <span className="text-egyptian-gold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
