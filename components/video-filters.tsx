'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, X } from 'lucide-react'

interface VideoFiltersProps {
  currentCategory?: string
  currentLanguage?: string
  currentSort?: string
  currentFeatured?: boolean
  locale: string
}

const categories = [
  'ancient-egypt',
  'pharaohs',
  'gods-mythology',
  'temples-monuments',
  'daily-life',
  'discoveries',
  'documentaries'
]

const languages = [
  'en',
  'ar',
  'fr',
  'de',
  'es',
  'it',
  'zh',
  'ja'
]

const sortOptions = [
  { value: 'createdAt:desc', label: 'Newest First' },
  { value: 'createdAt:asc', label: 'Oldest First' },
  { value: 'title:asc', label: 'Title (A-Z)' },
  { value: 'title:desc', label: 'Title (Z-A)' },
  { value: 'views:desc', label: 'Most Viewed' },
  { value: 'likes:desc', label: 'Most Liked' }
]

export function VideoFilters({
  currentCategory,
  currentLanguage,
  currentSort = 'createdAt:desc',
  currentFeatured = false,
  locale
}: VideoFiltersProps) {
  const t = useTranslations('videoFilters')
  const [isExpanded, setIsExpanded] = useState(false)

  const buildUrl = (params: Record<string, string | boolean | undefined>) => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== false) {
        searchParams.set(key, String(value))
      }
    })
    
    const queryString = searchParams.toString()
    return queryString ? `/${locale}/history-videos?${queryString}` : `/${locale}/history-videos`
  }

  const clearAllFilters = () => {
    window.location.href = `/${locale}/history-videos`
  }

  const hasActiveFilters = currentCategory || currentLanguage || currentFeatured

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full mt-2"
          >
            {t('clearAll')}
          </Button>
        )}
      </CardHeader>
      
      <CardContent className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Featured Filter */}
        <div>
          <Label className="text-base font-medium mb-3 block">{t('featured')}</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={currentFeatured}
                onCheckedChange={(checked) => {
                  if (checked) {
                    window.location.href = buildUrl({
                      category: currentCategory,
                      language: currentLanguage,
                      featured: true,
                      sort: currentSort
                    })
                  } else {
                    window.location.href = buildUrl({
                      category: currentCategory,
                      language: currentLanguage,
                      sort: currentSort
                    })
                  }
                }}
              />
              <Label htmlFor="featured" className="text-sm font-normal">
                {t('featuredOnly')}
              </Label>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <Label className="text-base font-medium mb-3 block">{t('category')}</Label>
          <div className="space-y-2">
            <Button
              variant={!currentCategory ? "default" : "outline"}
              size="sm"
              onClick={() => {
                window.location.href = buildUrl({
                  language: currentLanguage,
                  featured: currentFeatured,
                  sort: currentSort
                })
              }}
              className="justify-start"
            >
              {t('allCategories')}
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={currentCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  window.location.href = buildUrl({
                    category,
                    language: currentLanguage,
                    featured: currentFeatured,
                    sort: currentSort
                  })
                }}
                className="justify-start"
              >
                {t(`categories.${category}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div>
          <Label className="text-base font-medium mb-3 block">{t('language')}</Label>
          <div className="space-y-2">
            <Button
              variant={!currentLanguage ? "default" : "outline"}
              size="sm"
              onClick={() => {
                window.location.href = buildUrl({
                  category: currentCategory,
                  featured: currentFeatured,
                  sort: currentSort
                })
              }}
              className="justify-start"
            >
              {t('allLanguages')}
            </Button>
            
            {languages.map((language) => (
              <Button
                key={language}
                variant={currentLanguage === language ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  window.location.href = buildUrl({
                    category: currentCategory,
                    language,
                    featured: currentFeatured,
                    sort: currentSort
                  })
                }}
                className="justify-start"
              >
                {t(`languages.${language}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <Label className="text-base font-medium mb-3 block">{t('sortBy')}</Label>
          <Select
            value={currentSort}
            onValueChange={(value) => {
              window.location.href = buildUrl({
                category: currentCategory,
                language: currentLanguage,
                featured: currentFeatured,
                sort: value
              })
            }}
          >
            <SelectTrigger>
              <SelectValue />
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

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">{t('activeFilters')}</p>
            <div className="flex flex-wrap gap-2">
              {currentFeatured && (
                <Badge variant="secondary" className="gap-1">
                  {t('featured')}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      window.location.href = buildUrl({
                        category: currentCategory,
                        language: currentLanguage,
                        sort: currentSort
                      })
                    }}
                  />
                </Badge>
              )}
              
              {currentCategory && (
                <Badge variant="secondary" className="gap-1">
                  {t(`categories.${currentCategory}`)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      window.location.href = buildUrl({
                        language: currentLanguage,
                        featured: currentFeatured,
                        sort: currentSort
                      })
                    }}
                  />
                </Badge>
              )}
              
              {currentLanguage && (
                <Badge variant="secondary" className="gap-1">
                  {t(`languages.${currentLanguage}`)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      window.location.href = buildUrl({
                        category: currentCategory,
                        featured: currentFeatured,
                        sort: currentSort
                      })
                    }}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}