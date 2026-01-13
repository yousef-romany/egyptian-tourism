"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ComparisonContextType {
  compareList: number[]
  addToCompare: (tourId: number, maxItems?: number) => boolean
  removeFromCompare: (tourId: number) => void
  clearCompare: () => void
  isInCompare: (tourId: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<number[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tourCompareList')
    if (saved) {
      try {
        setCompareList(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse compare list from localStorage:', error)
        localStorage.removeItem('tourCompareList')
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('tourCompareList', JSON.stringify(compareList))
  }, [compareList])

  const addToCompare = (tourId: number, maxItems: number = 4): boolean => {
    if (compareList.includes(tourId)) return true
    if (compareList.length >= maxItems) return false

    setCompareList([...compareList, tourId])
    return true
  }

  const removeFromCompare = (tourId: number) => {
    setCompareList(compareList.filter(id => id !== tourId))
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const isInCompare = (tourId: number): boolean => {
    return compareList.includes(tourId)
  }

  return (
    <ComparisonContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider')
  }
  return context
}
