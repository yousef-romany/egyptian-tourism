"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import type { Tour } from "@/lib/data/tours"
import { useEffect, useState } from "react"

interface WishlistButtonProps {
  tour: Tour
}

export function WishlistButton({ tour }: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist, isLoaded } = useWishlist()
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      setIsWishlisted(isInWishlist(tour.id))
    }
  }, [isLoaded, isInWishlist, tour.id])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(tour)
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 z-10 group"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`h-4 w-4 transition-all duration-200 ${
          isWishlisted
            ? "fill-red-500 text-red-500 scale-110"
            : "text-gray-600 dark:text-gray-300 group-hover:text-red-500"
        }`}
      />
    </button>
  )
}
