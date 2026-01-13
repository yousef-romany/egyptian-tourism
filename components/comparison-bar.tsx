"use client"

import { useComparison } from "@/contexts/comparison-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scale, X } from "lucide-react"
import Link from "next/link"

export function ComparisonBar() {
  const { compareList, clearCompare } = useComparison()

  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-egyptian-gold text-black shadow-lg z-50 border-t-2 border-black/10 animate-in slide-in-from-bottom">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Scale className="h-5 w-5" />
            <span className="font-semibold">
              {compareList.length} tour{compareList.length > 1 ? 's' : ''} selected
            </span>
            <Badge variant="secondary" className="bg-black/10">
              {compareList.length}/4
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/compare?tours=${compareList.join(',')}`}>
              <Button
                size="sm"
                className="bg-black text-white hover:bg-black/80"
              >
                Compare Now
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearCompare}
              className="text-black hover:bg-black/10"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
