"use client"

import { useState, useEffect } from "react"
import type { Tour } from "@/lib/data/tours"

const WISHLIST_STORAGE_KEY = "egydise-wishlist"

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Tour[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setWishlist(parsed)
      }
      setIsLoaded(true)
    } catch (error) {
      console.error("Error loading wishlist:", error)
      setIsLoaded(true)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
      } catch (error) {
        console.error("Error saving wishlist:", error)
      }
    }
  }, [wishlist, isLoaded])

  const addToWishlist = (tour: Tour) => {
    setWishlist((prev) => {
      // Check if already in wishlist
      if (prev.some((t) => t.id === tour.id)) {
        return prev
      }
      return [...prev, tour]
    })
  }

  const removeFromWishlist = (tourId: number) => {
    setWishlist((prev) => prev.filter((t) => t.id !== tourId))
  }

  const toggleWishlist = (tour: Tour) => {
    if (isInWishlist(tour.id)) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist(tour)
    }
  }

  const isInWishlist = (tourId: number): boolean => {
    return wishlist.some((t) => t.id === tourId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    isLoaded,
  }
}
