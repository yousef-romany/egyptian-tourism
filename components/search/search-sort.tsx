"use client"

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown } from 'lucide-react';

export type SortOption =
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'duration'
  | 'popular';

interface SortOptionItem {
  value: SortOption;
  label: string;
}

const SORT_OPTIONS: SortOptionItem[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Duration (Shortest First)' },
  { value: 'popular', label: 'Most Popular' },
];

interface SearchSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultsCount?: number;
}

export function SearchSort({ value, onChange, resultsCount = 0 }: SearchSortProps) {
  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        {resultsCount} results
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort: {selectedOption?.label}</span>
            <span className="sm:hidden">Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={value === option.value ? 'bg-accent' : 'cursor-pointer'}
            >
              {option.label}
              {value === option.value && (
                <span className="ml-auto text-egyptian-gold">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
