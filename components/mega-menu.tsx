"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, MapPin, Star } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { getFeaturedTours, getTours } from "@/lib/data/tours"
import { useEffect, useState } from "react"
import type { Tour } from "@/lib/data/tours"
import { cn } from "@/lib/utils"

interface MegaMenuProps {
  isOpen: boolean
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  const locale = useLocale()
  const t = useTranslations("Navigation")
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [tourCategories, setTourCategories] = useState<{
    name: string
    items: { name: string; href: string }[]
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true)
        
        // Fetch featured tours for the showcase section
        const featured = await getFeaturedTours(3, locale)
        setFeaturedTours(featured)
        
        // Fetch all tours to create categories
        const allTours = await getTours(locale)
        
        // Group tours by category
        const categories = allTours.reduce((acc, tour) => {
          const category = tour.category || 'Other'
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push({
            name: tour.title,
            href: `/${locale}/tours/${tour.slug}`
          })
          return acc
        }, {} as Record<string, { name: string; href: string }[]>)
        
        // Convert to array and limit items per category
        const categoryArray = Object.entries(categories).map(([name, items]) => ({
          name,
          items: items.slice(0, 4) // Limit to 4 items per category
        }))
        
        setTourCategories(categoryArray)
      } catch (error) {
        console.error('Failed to fetch tour data:', error)
        // Set fallback data if API fails
        setFeaturedTours([])
        setTourCategories([
          {
            name: "Historical Tours",
            items: [
              { name: "Giza Pyramids & Sphinx", href: `/${locale}/tours/giza-pyramids-sphinx` },
              { name: "Egyptian Museum Tour", href: `/${locale}/tours/egyptian-museum-tour` },
              { name: "Karnak Temple Complex", href: `/${locale}/tours/karnak-temple-complex` },
              { name: "Abu Simbel Temples", href: `/${locale}/tours/abu-simbel-temples` },
            ],
          },
          {
            name: "Adventure Tours",
            items: [
              { name: "Luxor Hot Air Balloon", href: `/${locale}/tours/luxor-hot-air-balloon` },
              { name: "White Desert Safari", href: `/${locale}/tours/white-desert-safari` },
              { name: "Siwa Oasis Adventure", href: `/${locale}/tours/siwa-oasis-adventure` },
              { name: "Hurghada Snorkeling", href: `/${locale}/tours/hurghada-snorkeling-trip` },
            ],
          },
          {
            name: "Cultural Tours",
            items: [
              { name: "Nile Dinner Cruise", href: `/${locale}/tours/nile-dinner-cruise` },
              { name: "Cairo Food Tour", href: `/${locale}/tours/cairo-food-tour` },
              { name: "Islamic Cairo Walking Tour", href: `/${locale}/tours/islamic-cairo-walking-tour` },
              { name: "Coptic Cairo Tour", href: `/${locale}/tours/coptic-cairo-tour` },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    
    if (isOpen) {
      fetchTourData()
    }
  }, [isOpen, locale])

  const isRTL = locale === 'ar'

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-0 bg-background border-t border-b shadow-2xl"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Featured Tours */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              {t("featuredTours")}
            </h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-32 w-full"></div>
                    <div className="mt-2 h-4 bg-muted rounded w-3/4"></div>
                    <div className="mt-1 h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : featuredTours.length > 0 ? (
              <div className="space-y-4">
                {featuredTours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/${locale}/tours/${tour.slug}`}
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No featured tours available</p>
              </div>
            )}
          </div>

          {/* Tour Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              {t("browseByCategory")}
            </h3>
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 bg-muted rounded mb-3 w-1/2"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-4 bg-muted rounded w-3/4"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : tourCategories.length > 0 ? (
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
                            <ChevronRight 
                              className={cn(
                                "h-4 w-4 transition-opacity duration-200",
                                isRTL ? "opacity-0 group-hover:opacity-100 -mr-1" : "opacity-0 group-hover:opacity-100 -ml-1"
                              )} 
                            />
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tour categories available</p>
              </div>
            )}

            {/* View All Tours Button */}
            <div className="mt-6 pt-6 border-t">
              <Link
                href={`/${locale}/tours`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-egyptian-gold hover:text-egyptian-gold-dark transition-colors duration-200"
              >
                {t("viewAllTours")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
