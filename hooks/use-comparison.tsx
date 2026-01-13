"use client"

import { useState, useEffect } from "react"
import type { Tour } from "@/lib/data/tours"

const COMPARISON_STORAGE_KEY = "wonderlandegypt-comparison"
const MAX_COMPARISON_TOURS = 4

export function useComparison() {
  const [comparisonList, setComparisonList] = useState<Tour[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load comparison list on mount from localStorage
  useEffect(() => {
    const loadComparison = () => {
      try {
        const stored = localStorage.getItem(COMPARISON_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setComparisonList(parsed)
        }
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading comparison list:", error)
        setIsLoaded(true)
      }
    }

    loadComparison()
  }, [])

  // Save comparison list to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonList))
      } catch (error) {
        console.error("Error saving comparison list to localStorage:", error)
      }
    }
  }, [comparisonList, isLoaded])

  const addToComparison = (tour: Tour) => {
    // Check if already in comparison list
    if (comparisonList.some((t) => t.id === tour.id)) {
      return { success: false, message: "Tour is already in comparison list" }
    }

    // Check if max limit reached
    if (comparisonList.length >= MAX_COMPARISON_TOURS) {
      return {
        success: false,
        message: `You can only compare up to ${MAX_COMPARISON_TOURS} tours at once`
      }
    }

    // Add to comparison list
    setComparisonList((prev) => [...prev, tour])

    // Track comparison add in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_comparison', {
        item_id: tour.id,
        item_name: tour.title,
        item_category: tour.category,
        price: tour.price,
      })
    }

    return { success: true, message: "Tour added to comparison" }
  }

  const removeFromComparison = (tourId: number) => {
    // Find the tour before removing for analytics
    const tour = comparisonList.find((t) => t.id === tourId)

    // Remove from comparison list
    setComparisonList((prev) => prev.filter((t) => t.id !== tourId))

    // Track comparison remove in Google Analytics
    if (typeof window !== 'undefined' && window.gtag && tour) {
      window.gtag('event', 'remove_from_comparison', {
        item_id: tourId,
        item_name: tour.title,
        item_category: tour.category,
      })
    }
  }

  const toggleComparison = (tour: Tour) => {
    if (isInComparison(tour.id)) {
      removeFromComparison(tour.id)
      return { success: true, message: "Tour removed from comparison" }
    } else {
      return addToComparison(tour)
    }
  }

  const isInComparison = (tourId: number): boolean => {
    return comparisonList.some((t) => t.id === tourId)
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  const canAddMore = (): boolean => {
    return comparisonList.length < MAX_COMPARISON_TOURS
  }

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    isInComparison,
    clearComparison,
    canAddMore,
    isLoaded,
    maxTours: MAX_COMPARISON_TOURS,
  }
}
