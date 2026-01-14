"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Tour } from "@/lib/data/tours"

interface TourCarouselClientProps {
  tours: Tour[]
}

export function TourCarouselClient({ tours }: TourCarouselClientProps) {
  // If no tours, show a message
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-2xl mx-auto p-8 bg-muted/30 rounded-2xl border border-egyptian-gold/20">
          <h3 className="text-2xl font-bold mb-4">Featured Tours Coming Soon</h3>
          <p className="text-muted-foreground text-lg">
            We're preparing amazing tour experiences for you. Check back soon to explore our curated Egyptian adventures!
          </p>
          <Button className="mt-6 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
            Explore All Tours
          </Button>
        </div>
      </div>
    )
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Calculate how many tours to show based on screen size
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const [itemsToShow, setItemsToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow())
    }

    handleResize() // Set initial value

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = tours.length - itemsToShow

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, maxIndex])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `calc(-${currentIndex * 100}% / ${tours.length} * ${itemsToShow})`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {tours.map((tour, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4"
            >
              <Link
                href={`/tours/${tour.slug}`}
                className="group block h-full"
              >
                <Card className="h-full overflow-hidden group-hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      width={400}
                      height={250}
                      className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                      {tour.price}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{tour.title}</h3>
                    <div className="flex items-center gap-1 mt-2 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{tour.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({tour.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-[#0c1e35] hover:bg-[#1a3a5f]">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center z-10 hover:bg-white transition-colors"
        aria-label="Previous tour"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center z-10 hover:bg-white transition-colors"
        aria-label="Next tour"
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
  )
}
