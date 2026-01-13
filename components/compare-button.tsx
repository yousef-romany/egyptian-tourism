"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/contexts/comparison-context"
import { GitCompare } from "lucide-react"

interface CompareButtonProps {
  tour: {
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
}

export function CompareButton({ tour }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useComparison()
  const [isAdding, setIsAdding] = useState(false)

  const handleClick = () => {
    if (isInCompare(tour.id)) {
      removeFromCompare(tour.id)
    } else {
      setIsAdding(true)
      addToCompare(tour)
      setTimeout(() => setIsAdding(false), 500)
    }
  }

  return (
    <Button
      variant={isInCompare(tour.id) ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      className={isInCompare(tour.id) ? "bg-egyptian-gold hover:bg-egyptian-gold-dark" : ""}
    >
      <GitCompare className="h-4 w-4 mr-2" />
      {isInCompare(tour.id) ? 'Comparing' : 'Compare'}
    </Button>
  )
}
