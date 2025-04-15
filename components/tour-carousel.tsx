"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Tour {
  title: string
  image: string
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
}

export default function TourCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  const tours = [
    {
      title: "Giza Pyramids & Sphinx",
      image: "/placeholder.svg?height=300&width=400",
      duration: "8 hours",
      location: "Cairo",
      price: "$89",
      rating: 4.9,
      reviews: 245,
    },
    {
      title: "Luxor Valley of Kings",
      image: "/placeholder.svg?height=300&width=400",
      duration: "10 hours",
      location: "Luxor",
      price: "$120",
      rating: 4.8,
      reviews: 189,
    },
    {
      title: "Nile Dinner Cruise",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Cairo",
      price: "$65",
      rating: 4.7,
      reviews: 312,
    },
    {
      title: "Alexandria Day Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Alexandria",
      price: "$95",
      rating: 4.6,
      reviews: 178,
    },
    {
      title: "Abu Simbel Temples",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Aswan",
      price: "$140",
      rating: 4.9,
      reviews: 156,
    },
    {
      title: "Luxor Hot Air Balloon",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Luxor",
      price: "$120",
      rating: 4.9,
      reviews: 203,
    },
    {
      title: "Hurghada Snorkeling Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "7 hours",
      location: "Hurghada",
      price: "$75",
      rating: 4.7,
      reviews: 289,
    },
  ]

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
          ref={carousel}
          className="flex"
          animate={{ x: `calc(-${currentIndex * 100}% / ${tours.length} * ${itemsToShow})` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {tours.map((tour, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
              <Link href={`/tours/${tour.title.toLowerCase().replace(/\s+/g, "-")}`} className="group block h-full">
                <Card className="h-full overflow-hidden group-hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      width={400}
                      height={250}
                      className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">{tour.price}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{tour.title}</h3>
                    <div className="flex items-center gap-1 mt-2 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{tour.rating}</span>
                      <span className="text-muted-foreground text-sm">({tour.reviews} reviews)</span>
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
                    <Button className="w-full mt-4 bg-[#0c1e35] hover:bg-[#1a3a5f]">View Details</Button>
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

