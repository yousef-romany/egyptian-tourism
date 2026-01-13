"use client"

import { useState, useEffect } from "react"
import type { Tour } from "@/lib/data/tours"
import { useAuth } from "@/contexts/auth-context"

const WISHLIST_STORAGE_KEY = "wonderlandegypt-wishlist"

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Tour[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { isAuthenticated, user } = useAuth()

  // Load wishlist on mount - from Strapi if authenticated, from localStorage otherwise
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (isAuthenticated) {
          // Load from Strapi API
          const strapiAPI = (await import('@/lib/api/strapi')).default
          const { getTourById } = await import('@/lib/data/tours')

          const wishlistItems = await strapiAPI.wishlist.get()

          // Convert wishlist items to Tour objects
          const tours = await Promise.all(
            wishlistItems.map(async (item) => {
              const tour = await getTourById(item.tour.id)
              return tour
            })
          )

          // Filter out any undefined tours
          const validTours = tours.filter((t): t is Tour => t !== undefined)
          setWishlist(validTours)
        } else {
          // Load from localStorage for non-authenticated users
          const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
          if (stored) {
            const parsed = JSON.parse(stored)
            setWishlist(parsed)
          }
        }
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading wishlist:", error)
        // Fallback to localStorage on error
        try {
          const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
          if (stored) {
            const parsed = JSON.parse(stored)
            setWishlist(parsed)
          }
        } catch (e) {
          console.error("Error loading from localStorage:", e)
        }
        setIsLoaded(true)
      }
    }

    loadWishlist()
  }, [isAuthenticated, user])

  // Save wishlist to localStorage for non-authenticated users
  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error)
      }
    }
  }, [wishlist, isLoaded, isAuthenticated])

  const addToWishlist = async (tour: Tour) => {
    // Check if already in wishlist
    if (wishlist.some((t) => t.id === tour.id)) {
      return
    }

    if (isAuthenticated) {
      try {
        // Add to Strapi
        const strapiAPI = (await import('@/lib/api/strapi')).default
        await strapiAPI.wishlist.add(tour.id)

        // Update local state
        setWishlist((prev) => [...prev, tour])
      } catch (error) {
        console.error("Error adding to wishlist:", error)
        // Fallback to localStorage
        setWishlist((prev) => [...prev, tour])
      }
    } else {
      // Add to localStorage for non-authenticated users
      setWishlist((prev) => [...prev, tour])
    }

    // Track wishlist add in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_wishlist', {
        item_id: tour.id,
        item_name: tour.title,
        item_category: tour.category,
        price: tour.price,
        is_authenticated: isAuthenticated
      })
    }
  }

  const removeFromWishlist = async (tourId: number) => {
    // Find the tour before removing for analytics
    const tour = wishlist.find((t) => t.id === tourId)

    if (isAuthenticated) {
      try {
        // Remove from Strapi
        const strapiAPI = (await import('@/lib/api/strapi')).default
        await strapiAPI.wishlist.remove(tourId)

        // Update local state
        setWishlist((prev) => prev.filter((t) => t.id !== tourId))
      } catch (error) {
        console.error("Error removing from wishlist:", error)
        // Still update local state
        setWishlist((prev) => prev.filter((t) => t.id !== tourId))
      }
    } else {
      // Remove from localStorage for non-authenticated users
      setWishlist((prev) => prev.filter((t) => t.id !== tourId))
    }

    // Track wishlist remove in Google Analytics
    if (typeof window !== 'undefined' && window.gtag && tour) {
      window.gtag('event', 'remove_from_wishlist', {
        item_id: tourId,
        item_name: tour.title,
        item_category: tour.category,
        is_authenticated: isAuthenticated
      })
    }
  }

  const toggleWishlist = async (tour: Tour) => {
    if (isInWishlist(tour.id)) {
      await removeFromWishlist(tour.id)
    } else {
      await addToWishlist(tour)
    }
  }

  const isInWishlist = (tourId: number): boolean => {
    return wishlist.some((t) => t.id === tourId)
  }

  const clearWishlist = async () => {
    if (isAuthenticated) {
      try {
        // Clear from Strapi (remove all items)
        const strapiAPI = (await import('@/lib/api/strapi')).default
        await Promise.all(
          wishlist.map((tour) => strapiAPI.wishlist.remove(tour.id))
        )
      } catch (error) {
        console.error("Error clearing wishlist:", error)
      }
    }

    // Always clear local state
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
    isAuthenticated, // Expose this so components can show login prompts
  }
}
