"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Heart, Share2, Filter, Search, X } from "lucide-react"
import { motion } from "framer-motion"

export default function WishlistClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const wishlistItems = [
    {
      id: 1,
      title: "Giza Pyramids & Sphinx",
      image: "/placeholder.svg?height=300&width=400",
      duration: "8 hours",
      location: "Cairo",
      price: "$89",
      rating: 4.9,
      reviews: 245,
      category: "Historical",
      dateAdded: "2 weeks ago",
    },
    {
      id: 2,
      title: "Luxor Hot Air Balloon",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Luxor",
      price: "$120",
      rating: 4.9,
      reviews: 203,
      category: "Adventure",
      dateAdded: "1 month ago",
    },
    {
      id: 3,
      title: "Abu Simbel Temples",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Aswan",
      price: "$140",
      rating: 4.9,
      reviews: 156,
      category: "Historical",
      dateAdded: "3 weeks ago",
    },
    {
      id: 4,
      title: "Nile Dinner Cruise",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Cairo",
      price: "$65",
      rating: 4.7,
      reviews: 312,
      category: "Cultural",
      dateAdded: "2 days ago",
    },
    {
      id: 5,
      title: "Alexandria Day Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Alexandria",
      price: "$95",
      rating: 4.6,
      reviews: 178,
      category: "Historical",
      dateAdded: "1 week ago",
    },
    {
      id: 6,
      title: "Hurghada Snorkeling Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "7 hours",
      location: "Hurghada",
      price: "$75",
      rating: 4.7,
      reviews: 289,
      category: "Adventure",
      dateAdded: "5 days ago",
    },
  ]

  const filteredItems = wishlistItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const removeFromWishlist = (id: number) => {
    // In a real app, this would call an API to remove the item
    console.log(`Removing item ${id} from wishlist`)
  }

  return (
    <div className="min-h-screen bg-muted pb-16">
      <div className="relative bg-[#0c1e35] text-white py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">My Wishlist</h1>
            <p className="text-lg text-white/80 mb-6">Your saved tours and experiences for future adventures</p>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All ({wishlistItems.length})</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
              <TabsTrigger value="adventure">Adventure</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            {showSearch ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                className="relative flex items-center"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-md border border-input"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setShowSearch(false)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </motion.div>
            ) : (
              <>
                <Button variant="outline" size="icon" onClick={() => setShowSearch(true)}>
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold transition-colors"
              >
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">{item.price}</Badge>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/80 text-black text-xs">Added {item.dateAdded}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link href={`/tours/${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <h3 className="text-lg font-bold group-hover:text-egyptian-gold transition-colors">{item.title}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-2 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-muted-foreground text-sm">({item.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button asChild className="flex-1 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                      <Link href={`/tours/${item.title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href={`/book-now?tour=${item.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No matching items found</h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? `We couldn't find any wishlist items matching "${searchQuery}"`
                : "Your wishlist is empty. Start exploring tours to add some!"}
            </p>
            <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
              <Link href="/tours">Explore Tours</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

