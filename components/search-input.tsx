"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchInputProps {
  isOpen: boolean
  onClose: () => void
  variant?: "desktop" | "mobile"
}

export function SearchInput({ isOpen, onClose, variant = "desktop" }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
      setSearchQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    } else if (e.key === "Escape") {
      onClose()
      setSearchQuery("")
    }
  }

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
        setSearchQuery("")
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (variant === "desktop") {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.form
            onSubmit={handleSearch}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tours, blogs..."
              className="w-full h-10 pl-3 pr-16 rounded-md border border-egyptian-gold/30 focus:border-egyptian-gold focus:outline-none bg-background"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="submit"
                className="text-egyptian-gold hover:text-egyptian-gold-dark transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  setSearchQuery("")
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    )
  }

  // Mobile variant
  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search tours, blogs..."
        className="w-full h-10 pl-9 pr-3 rounded-md border border-egyptian-gold/30 focus:border-egyptian-gold focus:outline-none bg-background"
      />
    </form>
  )
}
