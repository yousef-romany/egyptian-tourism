"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { useCurrency } from '@/lib/currencies/provider';

export interface TourFilters {
  priceRange: [number, number];
  duration: string[];
  groupSize: string[];
  categories: string[];
  locations: string[];
  rating: number;
}

interface TourFiltersProps {
  filters: TourFilters;
  onFiltersChange: (filters: TourFilters) => void;
  onReset: () => void;
  tourCount?: number;
}

const DURATION_OPTIONS = [
  { value: 'half-day', label: 'Half Day (1-4 hours)' },
  { value: 'full-day', label: 'Full Day (5-8 hours)' },
  { value: 'multi-day', label: 'Multi Day (2+ days)' },
];

const GROUP_SIZE_OPTIONS = [
  { value: 'small', label: 'Small Group (1-10 people)' },
  { value: 'medium', label: 'Medium Group (11-25 people)' },
  { value: 'large', label: 'Large Group (26+ people)' },
  { value: 'private', label: 'Private Tour' },
];

const CATEGORY_OPTIONS = [
  { value: 'historical', label: 'Historical Sites' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'cruise', label: 'Nile Cruise' },
  { value: 'desert', label: 'Desert Safari' },
  { value: 'religious', label: 'Religious Tours' },
];

const LOCATION_OPTIONS = [
  { value: 'cairo', label: 'Cairo & Giza' },
  { value: 'luxor', label: 'Luxor & Aswan' },
  { value: 'alexandria', label: 'Alexandria' },
  { value: 'red-sea', label: 'Red Sea' },
  { value: 'sinai', label: 'Sinai Peninsula' },
  { value: 'oasis', label: 'Desert Oases' },
];

export function TourFilters({ filters, onFiltersChange, onReset, tourCount = 0 }: TourFiltersProps) {
  const { currency, formatPrice } = useCurrency();
  const [isExpanded, setIsExpanded] = useState(true);

  const updateFilter = <K extends keyof TourFilters>(
    key: K,
    value: TourFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <K extends keyof TourFilters>(
    key: K,
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, updatedArray as TourFilters[K]);
  };

  const hasActiveFilters =
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.duration.length > 0 ||
    filters.groupSize.length > 0 ||
    filters.categories.length > 0 ||
    filters.locations.length > 0 ||
    filters.rating > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-egyptian-gold" />
          <h3 className="font-semibold text-lg">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-0">
            <span className="font-medium">Price Range</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                updateFilter('priceRange', [value[0], value[1]] as [number, number])
              }
              min={0}
              max={1000}
              step={10}
              className="py-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{formatPrice(filters.priceRange[0])}</span>
              <span className="font-medium">{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Duration */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-0">
            <span className="font-medium">Duration</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4">
          {DURATION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`duration-${option.value}`}
                checked={filters.duration.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('duration', option.value)}
              />
              <Label
                htmlFor={`duration-${option.value}`}
                className="cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Group Size */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-0">
            <span className="font-medium">Group Size</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4">
          {GROUP_SIZE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`group-${option.value}`}
                checked={filters.groupSize.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('groupSize', option.value)}
              />
              <Label
                htmlFor={`group-${option.value}`}
                className="cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-0">
            <span className="font-medium">Categories</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4">
          {CATEGORY_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${option.value}`}
                checked={filters.categories.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('categories', option.value)}
              />
              <Label
                htmlFor={`category-${option.value}`}
                className="cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Locations */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-0">
            <span className="font-medium">Locations</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4">
          {LOCATION_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${option.value}`}
                checked={filters.locations.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('locations', option.value)}
              />
              <Label
                htmlFor={`location-${option.value}`}
                className="cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <div className="space-y-3">
        <Label className="font-medium">Minimum Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating >= rating ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
              className="flex-1"
            >
              {rating}+ ★
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            {tourCount} tour{tourCount !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
    </div>
  );
}
