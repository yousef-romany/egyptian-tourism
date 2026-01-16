"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react"
import { getFAQCategories, getFAQsByCategory, FAQ } from "@/lib/data/faq"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function FAQAccordion() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const t = useTranslations('FAQ')

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [categoriesData, faqsData] = await Promise.all([
          getFAQCategories(),
          getFAQsByCategory(selectedCategory === "all" ? undefined : selectedCategory)
        ])
        
        setCategories(categoriesData)
        setFAQs(faqsData)
      } catch (error) {
        console.error("Failed to load FAQ data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedCategory, searchQuery])

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
    setExpandedItems(new Set())
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(6).fill(null).map((_, i) => (
          <div key={i} className="p-6 border border rounded-lg">
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
          onClick={() => setSelectedCategory("all")}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          {t('allCategories')}
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-2"
          >
            {t(`category.${category}`)}
          </Button>
        ))}
        {(selectedCategory !== "all" || searchQuery) && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            {t('clearFilters')}
          </Button>
        )}
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

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              {t('noResults')}
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <Collapsible
              key={faq.id}
              open={expandedItems.has(faq.id)}
              onOpenChange={() => toggleExpanded(faq.id)}
              className="border border-egyptian-gold/20 rounded-lg"
            >
              <CollapsibleTrigger className="hover:no-underline">
                <div className="flex items-center justify-between text-left">
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {t(`category.${faq.category}`)}
                    </Badge>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-6">
                <div 
                  className="prose prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>
    </div>
  )
}