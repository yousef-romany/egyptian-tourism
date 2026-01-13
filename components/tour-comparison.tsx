"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Check } from "lucide-react"

interface Tour {
  id: number
  title: string
  slug: string
  image: string
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
  groupSize: string
  highlights?: string[]
  included?: string[]
}

interface TourComparisonProps {
  tours: Tour[]
  onRemove: (tourId: number) => void
}

export function TourComparison({ tours, onRemove }: TourComparisonProps) {
  const [loading, setLoading] = useState(false)

  if (tours.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No tours selected for comparison</p>
        <Button onClick={() => window.location.href = '/tours'} className="mt-4">
          Browse Tours
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Compare Tours</h2>
        <p className="text-muted-foreground">Comparing {tours.length} tour{tours.length > 1 ? 's' : ''}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left font-semibold">Feature</th>
              {tours.map((tour) => (
                <th key={tour.id} className="p-4 text-center min-w-[250px]">
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-bold text-lg">{tour.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(tour.id)}
                      className="mt-2"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Price</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  <span className="text-2xl font-bold text-egyptian-gold">
                    {tour.price}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Duration</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  {tour.duration}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Location</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  {tour.location}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Rating</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">{tour.rating}</span>
                    <span className="text-muted-foreground">({tour.reviews})</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Group Size</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  {tour.groupSize}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">Category</td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  <Badge>{tour.category}</Badge>
                </td>
              ))}
            </tr>

            {/* Highlights Comparison */}
            {tours.some(t => t.highlights) && (
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium" valign="top">Highlights</td>
                {tours.map((tour) => (
                  <td key={tour.id} className="p-4">
                    {tour.highlights && tour.highlights.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {tour.highlights.slice(0, 5).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* What's Included Comparison */}
            {tours.some(t => t.included) && (
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium" valign="top">What's Included</td>
                {tours.map((tour) => (
                  <td key={tour.id} className="p-4">
                    {tour.included && tour.included.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {tour.included.slice(0, 5).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* Action Buttons */}
            <tr className="border-b">
              <td className="p-4"></td>
              {tours.map((tour) => (
                <td key={tour.id} className="p-4 text-center">
                  <Button asChild className="w-full">
                    <a href={`/tours/${tour.slug}`}>View Tour</a>
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommendation */}
      <Card className="bg-gradient-to-r from-egyptian-gold/10 to-transparent p-6">
        <CardContent className="pt-6">
          <h3 className="font-bold text-xl mb-3">💡 Recommendation</h3>
          <p className="text-muted-foreground">
            Based on price and rating, we recommend <strong>{tours.sort((a, b) => b.rating - a.rating)[0]?.title}</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
