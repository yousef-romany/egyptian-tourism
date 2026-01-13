"use client"

import { createContext, useContext, useState, useEffect } from 'react'

interface Tour {
  id: number
  title: string
  slug: string
  image: string
  price: string
  duration: string
  location: string
  rating: number
  reviews: number
}

interface ComparisonContextType {
  compareList: Tour[]
  addToCompare: (tour: Tour) => void
  removeFromCompare: (tourId: number) => void
  clearCompare: () => void
  isInCompare: (tourId: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

const MAX_COMPARE = 3

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
      alert('You can only compare up to 3 tours at a time')
      return
    }

    if (compareList.some(t => t.id === tour.id)) {
      alert('This tour is already in your comparison list')
      return
    }

    setCompareList([...compareList, tour])
  }

  const removeFromCompare = (tourId: number) => {
    setCompareList(compareList.filter(t => t.id !== tourId))
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const isInCompare = (tourId: number) => {
    return compareList.some(t => t.id === tourId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
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
