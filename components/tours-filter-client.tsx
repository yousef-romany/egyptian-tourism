"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Search, SlidersHorizontal } from "lucide-react"
import type { Tour } from "@/lib/data/tours"
import TourCardServer from "@/components/tour-card-server"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ToursFilterClientProps {
  tours: Tour[]
}

export default function ToursFilterClient({ tours }: ToursFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 })
  const [sortBy, setSortBy] = useState("popularity")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Extract unique values for filters
  const categories = useMemo(() => {
    const unique = Array.from(new Set(tours.map(tour => tour.category)))
    return unique.sort()
  }, [tours])

  const locations = useMemo(() => {
    const unique = Array.from(new Set(tours.map(tour => tour.location)))
    return unique.sort()
  }, [tours])

  const durations = ["1-3 hours", "4-6 hours", "7-12 hours", "Full day", "Multi-day"]

  const getDurationCategory = (duration: string) => {
    const hours = parseInt(duration)
    if (hours <= 3) return "1-3 hours"
    if (hours <= 6) return "4-6 hours"
    if (hours <= 12) return "7-12 hours"
    return "Multi-day"
  }

  const getPriceValue = (priceStr: string) => {
    return parseInt(priceStr.replace("$", ""))
  }

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours.filter(tour => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          tour.title.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(tour.category)) {
        return false
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(tour.location)) {
        return false
      }

      // Duration filter
      if (selectedDurations.length > 0) {
        const tourDuration = getDurationCategory(tour.duration)
        if (!selectedDurations.includes(tourDuration)) {
          return false
        }
      }

      // Price filter
      const price = getPriceValue(tour.price)
      if (price < priceRange.min || price > priceRange.max) {
        return false
      }

      return true
    })

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return getPriceValue(a.price) - getPriceValue(b.price)
        case "price-high":
          return getPriceValue(b.price) - getPriceValue(a.price)
        case "duration":
          return parseInt(a.duration) - parseInt(b.duration)
        case "rating":
          return b.rating - a.rating
        case "popularity":
        default:
          return b.reviews - a.reviews
      }
    })

    return filtered
  }, [tours, searchQuery, selectedCategories, selectedLocations, selectedDurations, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTours.length / itemsPerPage)
  const paginatedTours = filteredAndSortedTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
    setCurrentPage(1)
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
    setCurrentPage(1)
  }

  const handleDurationToggle = (duration: string) => {
    setSelectedDurations(prev =>
      prev.includes(duration)
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    )
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedLocations([])
    setSelectedDurations([])
    setPriceRange({ min: 0, max: 500 })
    setSortBy("popularity")
    setCurrentPage(1)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedLocations.length +
    selectedDurations.length +
    (searchQuery ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 500 ? 1 : 0)

  return (
    <div className="grid lg:grid-cols-4 gap-12">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-muted p-6 rounded-lg h-fit sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="text-xl font-bold">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="bg-egyptian-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm"
              onClick={handleReset}
              disabled={activeFiltersCount === 0}
            >
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tours..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Tour Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.toLowerCase()}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label
                      htmlFor={`category-${category.toLowerCase()}`}
                      className="cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Locations */}
            <div>
              <h3 className="font-medium mb-3">Locations</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location.toLowerCase()}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                    />
                    <Label
                      htmlFor={`location-${location.toLowerCase()}`}
                      className="cursor-pointer"
                    >
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Duration */}
            <div>
              <h3 className="font-medium mb-3">Duration</h3>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <div key={duration} className="flex items-center space-x-2">
                    <Checkbox
                      id={`duration-${duration.toLowerCase().replace(/\s+/g, "-")}`}
                      checked={selectedDurations.includes(duration)}
                      onCheckedChange={() => handleDurationToggle(duration)}
                    />
                    <Label
                      htmlFor={`duration-${duration.toLowerCase().replace(/\s+/g, "-")}`}
                      className="cursor-pointer"
                    >
                      {duration}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Price Range</h3>
                <span className="text-sm text-muted-foreground">
                  ${priceRange.min} - ${priceRange.max}
                </span>
              </div>
              <div className="space-y-3">
                <Input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange.max}
                  onChange={(e) => {
                    setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                    setCurrentPage(1)
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {filteredAndSortedTours.length === tours.length
                ? "All Tours"
                : `${filteredAndSortedTours.length} Tour${filteredAndSortedTours.length !== 1 ? 's' : ''} Found`}
            </h2>
            <p className="text-muted-foreground">
              Showing {paginatedTours.length} of {filteredAndSortedTours.length} tours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={(value) => {
              setSortBy(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {paginatedTours.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTours.map((tour) => (
                <TourCardServer key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)

                    if (!showPage && page === currentPage - 2) {
                      return <span key={page} className="px-2">...</span>
                    }
                    if (!showPage && page === currentPage + 2) {
                      return <span key={page} className="px-2">...</span>
                    }
                    if (!showPage) {
                      return null
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className={currentPage === page ? "bg-egyptian-gold text-black hover:bg-egyptian-gold-dark" : ""}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No tours match your current filters
            </p>
            <Button onClick={handleReset} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
