"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, MapPin, Loader2 } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import strapiAPI, { getMediaUrl } from "@/lib/api/strapi"
import type { Gallery } from "@/lib/api/strapi"

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ value: string; label: string; count: number }[]>([])

  useEffect(() => {
    fetchGalleryData()
  }, [])

  const fetchGalleryData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [galleriesData, categoriesData] = await Promise.all([
        strapiAPI.galleries.getAll({ populate: 'images', sort: 'displayOrder:asc' }),
        strapiAPI.galleries.getCategories(),
      ])

      setGalleries(galleriesData.data)

      // Build categories with counts
      const allCount = galleriesData.data.reduce((sum, g) => sum + g.images.length, 0)
      const formattedCategories = [
        { value: "all", label: "All Photos", count: allCount },
        ...categoriesData.map(cat => ({
          value: cat.name,
          label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
          count: cat.count
        }))
      ]

      setCategories(formattedCategories)
    } catch (err) {
      console.error("Failed to fetch gallery data:", err)
      setError("Unable to load gallery. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Flatten galleries into individual images with metadata
  const allImages = galleries.flatMap((gallery) =>
    gallery.images.map((image, index) => ({
      id: `${gallery.id}-${index}`,
      src: getMediaUrl(image),
      title: gallery.title,
      location: gallery.location,
      category: gallery.category,
      description: gallery.description || "",
    }))
  )

  const filteredImages = selectedCategory === "all"
    ? allImages
    : allImages.filter(img => img.category === selectedCategory)

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Photo Gallery
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Explore Egypt in Pictures
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              A visual journey through Egypt's most iconic landmarks, from ancient pyramids to vibrant bazaars
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container py-16 md:py-20">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-egyptian-gold mx-auto mb-4" />
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchGalleryData}
              className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white px-6 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Content */}
        {!isLoading && !error && (
          <>
            {/* Filter Tabs */}
            <div className="mb-12">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="inline-flex h-auto p-1 bg-muted/50 flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-egyptian-gold data-[state=active]:text-white px-6 py-2.5 rounded-md transition-all hover:bg-egyptian-gold/10 font-semibold"
                    >
                      {category.label}
                      <span className="ml-2 text-xs opacity-70">({category.count})</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Gallery Grid */}
            {filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images found in this category.</p>
              </div>
            ) : (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer bg-muted"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <MapPin className="h-3 w-3" />
                          {image.location}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-egyptian-gold text-white p-2 rounded-full">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-egyptian-gold transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              disabled={selectedImageIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-egyptian-gold transition-colors p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              disabled={selectedImageIndex === filteredImages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-egyptian-gold transition-colors p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={filteredImages[selectedImageIndex].src}
                  alt={filteredImages[selectedImageIndex].title}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain rounded-lg"
                />

                <div className="mt-4 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {filteredImages[selectedImageIndex].title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-egyptian-gold mb-2">
                    <MapPin className="h-4 w-4" />
                    {filteredImages[selectedImageIndex].location}
                  </div>
                  {filteredImages[selectedImageIndex].description && (
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      {filteredImages[selectedImageIndex].description}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
