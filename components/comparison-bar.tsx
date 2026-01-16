"use client"

import { useState } from "react"
import { useComparison } from "@/contexts/comparison-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, GitCompare, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function ComparisonBar() {
  const { compareList, removeFromCompare, clearCompare } = useComparison()
  const [isMinimized, setIsMinimized] = useState(false)

  // Don't show if comparison list is empty
  if (compareList.length === 0) {
    return null
  }

  // Generate comparison URL with tour IDs
  const comparisonUrl = `/compare?tours=${compareList.map(t => t.id).join(',')}`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
      >
        <Card className="border-2 border-egyptian-gold bg-card/95 backdrop-blur-md shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                <GitCompare className="h-5 w-5 text-egyptian-gold" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tour Comparison</h3>
                <p className="text-sm text-muted-foreground">
                  {compareList.length} of 4 tours selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearCompare}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tour Cards - Collapsible */}
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Tour Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {compareList.map((tour) => (
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative group"
                  >
                    <Card className="overflow-hidden border-egyptian-gold/30 hover:border-egyptian-gold transition-colors">
                      <div className="relative h-32">
                        <Image
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromCompare(tour.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                          {tour.title}
                        </h4>
                        <Badge className="bg-egyptian-gold text-white text-xs">
                          {tour.price}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {/* Empty slots */}
                {[...Array(4 - compareList.length)].map((_, i) => (
                  <Card
                    key={`empty-${i}`}
                    className="border-dashed border-2 border-muted-foreground/20 bg-muted/10"
                  >
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Empty slot</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground text-center">
                        Add more tours to compare
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={clearCompare}
                >
                  Clear All
                </Button>
                <Link href={comparisonUrl}>
                  <Button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare Tours
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Minimized State - Just show count and button */}
          {isMinimized && (
            <div className="px-4 py-3 flex items-center justify-between">
              <p className="text-sm font-medium">
                {compareList.length} tours ready to compare
              </p>
              <Link href={comparisonUrl}>
                <Button size="sm" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white">
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare Now
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
