"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, MapPin, Star } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  const featuredTours = [
    {
      id: 1,
      title: "Giza Pyramids & Sphinx",
      slug: "giza-pyramids-sphinx",
      image: "/placeholder.svg?height=200&width=300",
      price: "$89",
      rating: 4.9,
      location: "Cairo",
      category: "Historical",
    },
    {
      id: 6,
      title: "Luxor Hot Air Balloon",
      slug: "luxor-hot-air-balloon",
      image: "/placeholder.svg?height=200&width=300",
      price: "$120",
      rating: 4.9,
      location: "Luxor",
      category: "Adventure",
    },
    {
      id: 3,
      title: "Nile Dinner Cruise",
      slug: "nile-dinner-cruise",
      image: "/placeholder.svg?height=200&width=300",
      price: "$65",
      rating: 4.7,
      location: "Cairo",
      category: "Cultural",
    },
  ]

  const tourCategories = [
    {
      name: "Historical Tours",
      items: [
        { name: "Giza Pyramids & Sphinx", href: "/tours/giza-pyramids-sphinx" },
        { name: "Egyptian Museum Tour", href: "/tours/egyptian-museum-tour" },
        { name: "Karnak Temple Complex", href: "/tours/karnak-temple-complex" },
        { name: "Abu Simbel Temples", href: "/tours/abu-simbel-temples" },
      ],
    },
    {
      name: "Adventure Tours",
      items: [
        { name: "Luxor Hot Air Balloon", href: "/tours/luxor-hot-air-balloon" },
        { name: "White Desert Safari", href: "/tours/white-desert-safari" },
        { name: "Siwa Oasis Adventure", href: "/tours/siwa-oasis-adventure" },
        { name: "Hurghada Snorkeling", href: "/tours/hurghada-snorkeling-trip" },
      ],
    },
    {
      name: "Cultural Tours",
      items: [
        { name: "Nile Dinner Cruise", href: "/tours/nile-dinner-cruise" },
        { name: "Cairo Food Tour", href: "/tours/cairo-food-tour" },
        { name: "Islamic Cairo Walking Tour", href: "/tours/islamic-cairo-walking-tour" },
        { name: "Coptic Cairo Tour", href: "/tours/coptic-cairo-tour" },
      ],
    },
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-0 bg-background border-t border-b shadow-2xl"
    >
      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Featured Tours */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Featured Tours
            </h3>
            <div className="space-y-4">
              {featuredTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <Badge className="bg-egyptian-gold text-black text-xs font-bold mb-2">
                        {tour.price}
                      </Badge>
                      <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                        {tour.title}
                      </h4>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{tour.location}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-auto" />
                        <span>{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tour Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Browse by Category
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {tourCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="font-bold text-base mb-3 text-foreground">
                    {category.name}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-egyptian-gold transition-colors duration-200"
                        >
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -ml-1" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* View All Tours Button */}
            <div className="mt-6 pt-6 border-t">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 text-sm font-semibold text-egyptian-gold hover:text-egyptian-gold-dark transition-colors duration-200"
              >
                View All Tours
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
