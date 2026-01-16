"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown, ChevronUp, HelpCircle, ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import { getFAQCategories, getFAQsByCategory, FAQ } from "@/lib/data/faq"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FAQAccordionEnhancedProps {
  initialCategory?: string
  itemsPerPage?: number
}

export function FAQAccordionEnhanced({ 
  initialCategory = "all", 
  itemsPerPage = 10 
}: FAQAccordionEnhancedProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [allFAQs, setAllFAQs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [viewHistory, setViewHistory] = useState<Set<string>>(new Set())
  const t = useTranslations('FAQ')

  // Client-side caching
  const cache = useMemo(() => new Map<string, FAQ[]>(), [])

  const loadFAQs = useCallback(async (category?: string, page: number = 1) => {
    const cacheKey = `faqs-${category || 'all'}-page-${page}`
    
    // Check cache first
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) || []
    }

    try {
      setIsLoading(true)
      const [categoriesData, faqsData] = await Promise.all([
        getFAQCategories(),
        getFAQsByCategory(category)
      ])
      
      // Cache the results
      cache.set(cacheKey, faqsData)
      
      if (page === 1) {
        setCategories(categoriesData)
        setAllFAQs(faqsData)
      }
      
      return faqsData
    } catch (error) {
      console.error("Failed to load FAQ data:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory, searchQuery])

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs.filter(faq => {
      const matchesSearch = searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort by views and helpful count
    return filtered.sort((a, b) => {
      // First show featured FAQs
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then sort by views (descending)
      return (b.views || 0) - (a.views || 0)
    })
  }, [allFAQs, searchQuery, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredFAQs.length / (itemsPerPage || 10))
  const startIndex = (currentPage - 1) * (itemsPerPage || 10)
  const endIndex = Math.min(startIndex + (itemsPerPage || 10), filteredFAQs.length)
  const currentFAQs = filteredFAQs.slice(startIndex, endIndex)

  const toggleExpanded = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setExpandedItems(new Set())
  }

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
    setCurrentPage(1)
    setExpandedItems(new Set())
  }

  const incrementView = useCallback((id: string) => {
    setViewHistory(prev => new Set(prev).add(id))
    
    // Update the FAQ in cached data
    setAllFAQs(prev => prev.map(faq => 
      faq.id === id ? { ...faq, views: (faq.views || 0) + 1 } : faq
    ))
  }, [])

  const markHelpful = useCallback(async (id: string, helpful: boolean) => {
    try {
      const response = await fetch('/api/faq/helpful', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, helpful })
      })

      if (response.ok) {
        // Update local state
        setAllFAQs(prev => prev.map(faq => 
          faq.id === id ? { ...faq, helpful: helpful ? (faq.helpful || 0) + 1 : (faq.helpful || 0) - 1 } : faq
        ))
      }
    } catch (error) {
      console.error("Failed to mark FAQ as helpful:", error)
    }
  }, [])

  // Load initial data
  useEffect(() => {
    loadFAQs(initialCategory, 1)
  }, [initialCategory])

  if (isLoading && allFAQs.length === 0) {
    return (
      <div className="space-y-4">
        {Array(6).fill(null).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => handleCategoryChange("all")}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          {t('allCategories')}
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryChange(category)}
            className="flex items-center gap-2"
          >
            {t(`category.${category}`)}
          </Button>
        ))}
        {(selectedCategory !== "all" || searchQuery) && (
          <Button variant="ghost" onClick={handleClearFilters} className="text-sm">
            {t('clearFilters')}
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="max-w-md"
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {selectedCategory === "all" 
            ? t('allFAQs') 
            : t('categoryFAQs', { category: t(`category.${selectedCategory}`) })
          } 
          <span className="text-muted-foreground ml-2">
            ({filteredFAQs.length} {t('questions')})
          </span>
        </h2>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronUp className="h-4 w-4" />
            {t('previous')}
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {t('pageInfo', { 
              current: currentPage, 
              total: totalPages 
            })}
          </span>
          
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            {t('next')}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {currentFAQs.map((faq, index) => (
          <Collapsible
            key={faq.id}
            open={expandedItems.has(faq.id)}
            onOpenChange={() => toggleExpanded(faq.id)}
            className="border border-egyptian-gold/20 rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="hover:no-underline w-full">
              <div className="flex items-center justify-between text-left p-4">
                <div className="flex-1 pr-8">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {t(`category.${faq.category}`)}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{faq.views || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {viewHistory.has(faq.id) ? (
                    <span className="text-xs text-muted-foreground">
                      {t('viewed')}
                    </span>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementView(faq.id);
                        }}
                        className="p-1 h-8"
                        title={t('markHelpful')}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markHelpful(faq.id, true);
                        }}
                        className="p-1 h-8"
                        title={t('markHelpful')}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    {t('helpfulCount', { count: faq.helpful || 0 })}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className="prose prose max-w-none p-4"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}