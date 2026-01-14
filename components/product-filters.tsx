'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  currentCategory?: string
  currentMinPrice?: number
  currentMaxPrice?: number
  currentSort?: string
  currentFeatured?: boolean
  locale: string
}

export function ProductFilters({
  currentCategory,
  currentMinPrice,
  currentMaxPrice,
  currentSort,
  currentFeatured,
  locale
}: ProductFiltersProps) {
  const t = useTranslations('productFilters')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [category, setCategory] = useState(currentCategory || '')
  const [priceRange, setPriceRange] = useState([currentMinPrice || 0, currentMaxPrice || 500])
  const [sort, setSort] = useState(currentSort || 'name:asc')
  const [featured, setFeatured] = useState(currentFeatured || false)

  const categories = [
    { value: 'souvenirs', label: t('categories.souvenirs') },
    { value: 'jewelry', label: t('categories.jewelry') },
    { value: 'papyrus', label: t('categories.papyrus') },
    { value: 'statues', label: t('categories.statues') },
    { value: 'textiles', label: t('categories.textiles') },
    { value: 'home-decor', label: t('categories.homeDecor') },
    { value: 'clothing', label: t('categories.clothing') },
    { value: 'books', label: t('categories.books') },
    { value: 'art', label: t('categories.art') },
    { value: 'other', label: t('categories.other') },
  ]

  const sortOptions = [
    { value: 'name:asc', label: t('sort.nameAsc') },
    { value: 'name:desc', label: t('sort.nameDesc') },
    { value: 'price:asc', label: t('sort.priceAsc') },
    { value: 'price:desc', label: t('sort.priceDesc') },
    { value: 'createdAt:desc', label: t('sort.newest') },
    { value: 'createdAt:asc', label: t('sort.oldest') },
    { value: 'views:desc', label: t('sort.popular') },
  ]

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Update or remove parameters
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString())
    } else {
      params.delete('minPrice')
    }
    
    if (priceRange[1] < 500) {
      params.set('maxPrice', priceRange[1].toString())
    } else {
      params.delete('maxPrice')
    }
    
    if (sort !== 'name:asc') {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }
    
    if (featured) {
      params.set('featured', 'true')
    } else {
      params.delete('featured')
    }
    
    // Reset to first page when filters change
    params.delete('page')
    
    router.push(`/${locale}/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setCategory('')
    setPriceRange([0, 500])
    setSort('name:asc')
    setFeatured(false)
    
    // Keep only locale in URL
    router.push(`/${locale}/products`)
  }

  const hasActiveFilters = category || priceRange[0] > 0 || priceRange[1] < 500 || featured

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t('title')}</CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            {t('clear')}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label htmlFor="category" className="text-sm font-medium">
            {t('category')}
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium">
            {t('priceRange')}
          </Label>
          <div className="mt-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={0}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div>
          <Label htmlFor="sort" className="text-sm font-medium">
            {t('sortBy')}
          </Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t('selectSort')} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(checked as boolean)}
          />
          <Label htmlFor="featured" className="text-sm font-medium">
            {t('featuredOnly')}
          </Label>
        </div>

        {/* Apply Button */}
        <Button 
          onClick={applyFilters} 
          className="w-full"
          disabled={!hasActiveFilters && sort === 'name:asc'}
        >
          {t('applyFilters')}
        </Button>
      </CardContent>
    </Card>
  )
}