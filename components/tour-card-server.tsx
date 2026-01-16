import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WishlistButton } from "./wishlist-button"
import { CompareButton } from "./compare-button"
import { PriceDisplay } from "./currency/price-display"
import type { Tour } from "@/lib/data/tours"

interface TourCardServerProps {
  tour: Tour
}

export default function TourCardServer({ tour }: TourCardServerProps) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden group-hover:shadow-2xl transition-all duration-500 border-egyptian-gold/30 hover:border-egyptian-gold bg-card/50 backdrop-blur-sm group-hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            width={400}
            height={250}
            className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-egyptian-gold text-black font-bold text-base px-3 py-1 shadow-lg">
              <PriceDisplay priceUSD={Number(tour.price)} />
            </Badge>
          </div>
          <WishlistButton tour={tour} />
          {tour.category && (
            <Badge className="absolute bottom-3 left-3 z-20 bg-white/95 dark:bg-black/80 dark:text-white text-black backdrop-blur-sm border border-egyptian-gold/30 font-semibold">
              {tour.category}
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-egyptian-gold transition-colors duration-300">
            {tour.title}
          </h3>
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(tour.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{tour.rating}</span>
            <span className="text-muted-foreground text-sm">
              ({tour.reviews})
            </span>
          </div>
          <div className="space-y-2.5 mb-4">
            <div className="flex items-center gap-2.5 text-sm">
              <MapPin className="h-4 w-4 text-egyptian-gold flex-shrink-0" />
              <span className="text-muted-foreground">{tour.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="h-4 w-4 text-egyptian-gold flex-shrink-0" />
              <span className="text-muted-foreground">{tour.duration}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button className="flex-1 bg-gradient-to-r from-[#0c1e35] to-[#1a3a5f] hover:from-[#1a3a5f] hover:to-[#0c1e35] text-white shadow-md hover:shadow-lg transition-all duration-300">
              View Details
            </Button>
            <CompareButton tour={tour} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
