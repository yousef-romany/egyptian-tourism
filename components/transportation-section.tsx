"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, ChevronRight, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function TransportationSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const transportOptions = [
    {
      id: 1,
      type: "Standard Sedan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-3 passengers",
      pricePerDay: "$60",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      type: "Premium Sedan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-3 passengers",
      pricePerDay: "$90",
      rating: 4.9,
      reviews: 124,
    },
    {
      id: 3,
      type: "SUV",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-5 passengers",
      pricePerDay: "$100",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 4,
      type: "Minivan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-7 passengers",
      pricePerDay: "$120",
      rating: 4.8,
      reviews: 87,
    },
  ]

  // Calculate how many options to show based on screen size
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const [itemsToShow, setItemsToShow] = useState(3)

  const maxIndex = transportOptions.length - itemsToShow

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  return (
    <section className="bg-muted py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="car-bg" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="none" />
            <path d="M0,0 L20,20 M20,0 L0,20" stroke="#d4af37" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#car-bg)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Transportation & Drivers</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Reliable transportation options with professional drivers for a seamless Egyptian experience
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `calc(-${currentIndex * 100}% / ${transportOptions.length} * ${itemsToShow})` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {transportOptions.map((option) => (
                <div key={option.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
                  <Card className="h-full overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.type}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                        From {option.pricePerDay}/day
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2">{option.type}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= Math.floor(option.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{option.rating}</span>
                        <span className="text-xs text-muted-foreground">({option.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Users className="h-4 w-4" />
                        <span>{option.capacity}</span>
                      </div>
                      <Button asChild className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                        <Link href="/transportation">View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center z-10 hover:bg-white transition-colors"
            aria-label="Previous option"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center z-10 hover:bg-white transition-colors"
            aria-label="Next option"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-6 bg-egyptian-gold" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-[#0c1e35] hover:bg-[#1a3a5f]">
            <Link href="/transportation">
              View All Transportation Options
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

