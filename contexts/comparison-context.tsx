"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import type { Tour } from '@/lib/data/tours'

interface ComparisonContextType {
  compareList: Tour[]
  addToCompare: (tour: Tour) => { success: boolean; message: string }
  removeFromCompare: (tourId: number) => void
  clearCompare: () => void
  isInCompare: (tourId: number) => boolean
  canAddMore: () => boolean
  maxTours: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

const MAX_COMPARE = 4

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareListState] = useState<Tour[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('compareList')
    if (saved) {
      try {
        setCompareListState(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load compare list:', error)
      }
    }
  }, [])

  const setCompareList = (tours: Tour[]) => {
    setCompareListState(tours)
    if (tours.length === 0) {
      localStorage.removeItem('compareList')
    } else {
      localStorage.setItem('compareList', JSON.stringify(tours))
    }
  }

  const addToCompare = (tour: Tour) => {
    if (compareList.length >= MAX_COMPARE) {
      return {
        success: false,
        message: `You can only compare up to ${MAX_COMPARE} tours at once`
      }
    }

    if (compareList.some(t => t.id === tour.id)) {
      return {
        success: false,
        message: 'This tour is already in your comparison list'
      }
    }

    setCompareList([...compareList, tour])

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_comparison', {
        item_id: tour.id,
        item_name: tour.title,
        item_category: tour.category,
        price: tour.price,
      })
    }

    return {
      success: true,
      message: 'Tour added to comparison'
    }
  }

  const removeFromCompare = (tourId: number) => {
    const tour = compareList.find(t => t.id === tourId)
    setCompareList(compareList.filter(t => t.id !== tourId))

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag && tour) {
      window.gtag('event', 'remove_from_comparison', {
        item_id: tourId,
        item_name: tour.title,
        item_category: tour.category,
      })
    }
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const isInCompare = (tourId: number) => {
    return compareList.some(t => t.id === tourId)
  }

  const canAddMore = () => {
    return compareList.length < MAX_COMPARE
  }

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore,
        maxTours: MAX_COMPARE,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
