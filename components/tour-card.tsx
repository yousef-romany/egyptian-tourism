"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock, Heart } from "lucide-react"

interface TourCardProps {
  id: number
  title: string
  image: string
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  category?: string
}

export default function TourCard({
  id,
  title,
  image,
  duration,
  location,
  price,
  rating,
  reviews,
  category,
}: TourCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)

    // In a real app, this would call an API to add/remove from wishlist
  }

  return (
    <Link href={`/tours/${title.toLowerCase().replace(/\s+/g, "-")}`} className="group block h-full">
      <Card className="h-full overflow-hidden group-hover:shadow-lg transition-all duration-300 border-egyptian-gold/20 hover:border-egyptian-gold/50">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">{price}</Badge>
          <button
            onClick={toggleWishlist}
            className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          {category && <Badge className="absolute bottom-3 left-3 bg-white/80 text-black">{category}</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="flex items-center gap-1 mt-2 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{rating}</span>
            <span className="text-muted-foreground text-sm">({reviews} reviews)</span>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-[#0c1e35] hover:bg-[#1a3a5f]">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  )
}

