"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, CheckCircle } from "lucide-react"
import { getMediaUrl } from "@/lib/api/strapi"

interface Testimonial {
  id: number
  customerName: string
  customerPhoto?: any
  customerLocation?: string
  story: string
  tourName?: string
  rating: number
  featured: boolean
  date: string
  tripDate?: string
  verified: boolean
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300">
      <CardContent className="p-6">
        {/* Customer Info */}
        <div className="flex items-start gap-4 mb-4">
          {testimonial.customerPhoto && (
            <img
              src={getMediaUrl(testimonial.customerPhoto)}
              alt={testimonial.customerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-egyptian-gold"
            />
          )}
          <div className="flex-1">
            <h4 className="font-bold text-lg">{testimonial.customerName}</h4>
            {testimonial.customerLocation && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {testimonial.customerLocation}
              </div>
            )}
          </div>
          {testimonial.verified && (
            <CheckCircle className="h-5 w-5 text-green-500" title="Verified Customer" />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>

        {/* Story */}
        <p className="text-sm leading-relaxed mb-4 line-clamp-6">
          {testimonial.story}
        </p>

        {/* Tour Info */}
        {testimonial.tourName && (
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="bg-egyptian-gold/10 text-egyptian-gold border-egyptian-gold/20">
              {testimonial.tourName}
            </Badge>
            {testimonial.tripDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(testimonial.tripDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
