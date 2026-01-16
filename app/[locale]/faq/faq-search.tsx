"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FAQSearchProps {
  onSearch: (query: string) => void
}

export function FAQSearch({ onSearch }: FAQSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const t = useTranslations('FAQ')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      onSearch(query)
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="pl-10 pr-20"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2"
            aria-label={t('clearSearch')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" className="sr-only">
        {t('search')}
      </Button>
    </form>
  )
}