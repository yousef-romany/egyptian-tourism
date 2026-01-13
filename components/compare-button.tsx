"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GitCompare, Check } from "lucide-react"
import { useComparison } from "@/contexts/comparison-context"
import { useToast } from "@/hooks/use-toast"
import type { Tour } from "@/lib/data/tours"

interface CompareButtonProps {
  tour: Tour
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CompareButton({
  tour,
  variant = "outline",
  size = "sm",
  className = ""
}: CompareButtonProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useComparison()
  const { toast } = useToast()
  const [isAnimating, setIsAnimating] = useState(false)

  const inComparison = isInCompare(tour.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inComparison) {
      removeFromCompare(tour.id)
      toast({
        title: "Removed from Comparison",
        description: `${tour.title} was removed from comparison`,
      })
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)
    } else {
      const result = addToCompare(tour)

      // Show toast notification
      toast({
        title: result.success ? "Added to Comparison" : "Cannot Add",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })

      // Trigger animation
      if (result.success) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }
    }
  }

  return (
    <Button
      variant={inComparison ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={`
        ${inComparison ? "bg-egyptian-gold hover:bg-egyptian-gold-dark text-white" : ""}
        ${isAnimating ? "scale-110" : "scale-100"}
        transition-all duration-300
        ${className}
      `}
    >
      {inComparison ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          In Comparison
        </>
      ) : (
        <>
          <GitCompare className="h-4 w-4 mr-2" />
          Compare
        </>
      )}
    </Button>
  )
}
