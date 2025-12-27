"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, MapPin } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800",
      title: "Great Pyramid of Giza",
      location: "Giza",
      category: "pyramids",
      description: "The last remaining wonder of the ancient world",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800",
      title: "Sphinx at Sunset",
      location: "Giza",
      category: "pyramids",
      description: "The majestic guardian of the pyramids",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800",
      title: "Valley of the Kings",
      location: "Luxor",
      category: "temples",
      description: "Ancient burial ground of pharaohs",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800",
      title: "Karnak Temple Complex",
      location: "Luxor",
      category: "temples",
      description: "The largest ancient religious site in the world",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800",
      title: "Abu Simbel Temples",
      location: "Aswan",
      category: "temples",
      description: "Colossal monuments of Ramses II",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800",
      title: "Nile River at Dawn",
      location: "Aswan",
      category: "landscape",
      description: "The lifeblood of ancient Egypt",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=600&width=800",
      title: "Hot Air Balloon Over Luxor",
      location: "Luxor",
      category: "landscape",
      description: "Sunrise view from above the temples",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=600&width=800",
      title: "White Desert Formations",
      location: "Bahariya Oasis",
      category: "desert",
      description: "Surreal chalk rock formations",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=600&width=800",
      title: "Tutankhamun's Golden Mask",
      location: "Egyptian Museum",
      category: "museums",
      description: "The iconic treasure of King Tut",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=600&width=800",
      title: "Khan El-Khalili Bazaar",
      location: "Cairo",
      category: "culture",
      description: "Historic marketplace in Islamic Cairo",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=600&width=800",
      title: "Red Sea Coral Reef",
      location: "Hurghada",
      category: "landscape",
      description: "Vibrant underwater paradise",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=600&width=800",
      title: "Siwa Oasis",
      location: "Siwa",
      category: "desert",
      description: "Egypt's most remote and beautiful oasis",
    },
    {
      id: 13,
      src: "/placeholder.svg?height=600&width=800",
      title: "Felucca on the Nile",
      location: "Aswan",
      category: "culture",
      description: "Traditional sailing boats at sunset",
    },
    {
      id: 14,
      src: "/placeholder.svg?height=600&width=800",
      title: "Hatshepsut Temple",
      location: "Luxor",
      category: "temples",
      description: "Mortuary temple carved into cliffs",
    },
    {
      id: 15,
      src: "/placeholder.svg?height=600&width=800",
      title: "Luxor Temple at Night",
      location: "Luxor",
      category: "temples",
      description: "Ancient temple beautifully illuminated",
    },
  ]

  const categories = [
    { value: "all", label: "All Photos", count: galleryImages.length },
    { value: "pyramids", label: "Pyramids", count: galleryImages.filter(img => img.category === "pyramids").length },
    { value: "temples", label: "Temples", count: galleryImages.filter(img => img.category === "temples").length },
    { value: "desert", label: "Desert", count: galleryImages.filter(img => img.category === "desert").length },
    { value: "landscape", label: "Landscapes", count: galleryImages.filter(img => img.category === "landscape").length },
    { value: "culture", label: "Culture", count: galleryImages.filter(img => img.category === "culture").length },
    { value: "museums", label: "Museums", count: galleryImages.filter(img => img.category === "museums").length },
  ]

  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

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
        {/* Filter Tabs */}
        <div className="mb-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="inline-flex h-auto p-1 bg-muted/50 flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-egyptian-gold data-[state=active]:text-black font-semibold px-6 py-3 rounded-lg"
                >
                  {cat.label} ({cat.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-muted"
                onClick={() => setSelectedImage(image.id)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{image.location}</span>
                    </div>
                    <p className="text-white/70 text-sm">{image.description}</p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-egyptian-gold text-black font-bold capitalize">
                  {image.category}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No images found in this category</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {galleryImages.find(img => img.id === selectedImage) && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full mb-6">
                  <Image
                    src={galleryImages.find(img => img.id === selectedImage)!.src}
                    alt={galleryImages.find(img => img.id === selectedImage)!.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-3">
                    {galleryImages.find(img => img.id === selectedImage)!.title}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-white/70 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{galleryImages.find(img => img.id === selectedImage)!.location}</span>
                    </div>
                    <Badge variant="outline" className="text-white border-white/30 capitalize">
                      {galleryImages.find(img => img.id === selectedImage)!.category}
                    </Badge>
                  </div>
                  <p className="text-lg text-white/80">
                    {galleryImages.find(img => img.id === selectedImage)!.description}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
