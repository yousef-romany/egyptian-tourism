"use client"

import { Button } from "@/components/ui/button"
import { useComparison } from "@/contexts/comparison-context"
import { useToast } from "@/hooks/use-toast"
import { Scale } from "lucide-react"
import { useEffect, useState } from "react"

interface CompareButtonProps {
  tourId: number
  tourTitle: string
}

export function CompareButton({ tourId, tourTitle }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useComparison()
  const { toast } = useToast()
  const [isComparing, setIsComparing] = useState(false)

  useEffect(() => {
    setIsComparing(isInCompare(tourId))
  }, [tourId, isInCompare])

  const handleToggle = () => {
    if (isComparing) {
      removeFromCompare(tourId)
      setIsComparing(false)
      toast({
        title: "Removed from comparison",
        description: `${tourTitle} has been removed from your comparison list.`,
      })
    } else {
      const success = addToCompare(tourId, 4)
      if (success) {
        setIsComparing(true)
        toast({
          title: "Added to comparison",
          description: `${tourTitle} has been added to your comparison list.`,
        })
      } else {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 4 tours at once. Remove one first.",
          variant: "destructive"
        })
      }
    }
  }

  return (
    <Button
      variant={isComparing ? "secondary" : "outline"}
      size="sm"
      onClick={handleToggle}
      className="gap-2"
    >
      <Scale className="h-4 w-4" />
      {isComparing ? "Comparing" : "Compare"}
    </Button>
  )
}
