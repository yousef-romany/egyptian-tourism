'use client'

import { useState, useEffect } from 'react'
import { HistoryVideo, getMediaUrl } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Search, Filter, Eye, ThumbsUp, Clock } from 'lucide-react'
import Image from 'next/image'
import { VideoModal } from '@/components/video-modal'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'pharaohs', label: 'Pharaohs' },
  { value: 'monuments', label: 'Monuments' },
  { value: 'legends', label: 'Legends' },
  { value: 'ancient-egypt', label: 'Ancient Egypt' },
  { value: 'islamic-egypt', label: 'Islamic Egypt' },
  { value: 'modern-egypt', label: 'Modern Egypt' },
  { value: 'culture', label: 'Culture' },
  { value: 'archaeology', label: 'Archaeology' },
  { value: 'mythology', label: 'Mythology' },
  { value: 'documentaries', label: 'Documentaries' },
  { value: 'cartoons', label: 'Cartoons' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'mostLiked', label: 'Most Liked' },
  { value: 'name', label: 'Name: A-Z' },
]

interface HistoryVideosClientProps {
  initialVideos: HistoryVideo[]
}

export function HistoryVideosClient({ initialVideos }: HistoryVideosClientProps) {
  const [videos, setVideos] = useState<HistoryVideo[]>(initialVideos)
  const [filteredVideos, setFilteredVideos] = useState<HistoryVideo[]>(initialVideos)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<HistoryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter and sort videos
  useEffect(() => {
    let filtered = [...videos]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((v) => v.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.description?.toLowerCase().includes(query) ||
          v.shortDescription?.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'mostLiked':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredVideos(filtered)
  }, [videos, selectedCategory, sortBy, searchQuery])

  const handleVideoClick = (video: HistoryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No videos found</p>
            <Button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                onClick={() => handleVideoClick(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={getMediaUrl(video.thumbnail)}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-4">
                      <Play className="h-8 w-8 text-[#0c1e35]" fill="currentColor" />
                    </div>
                  </div>
                  {video.featured && (
                    <Badge className="absolute left-2 top-2 bg-[#d4af37]">Featured</Badge>
                  )}
                  {video.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      <Clock className="mr-1 h-3 w-3" />
                      {video.duration}
                    </Badge>
                  )}
                </div>

                {/* Video Info */}
                <CardContent className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#d4af37]">
                    {video.title}
                  </h3>
                  {video.shortDescription && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                      {video.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {video.likes?.toLocaleString() || 0}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {video.category.replace('-', ' ')}
                    </Badge>
                    {video.language && (
                      <Badge variant="outline" className="text-xs uppercase">
                        {video.language}
                      </Badge>
                    )}
                    {video.ageRating && (
                      <Badge variant="outline" className="text-xs">
                        {video.ageRating}
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Show count */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredVideos.length} of {videos.length} videos
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedVideo(null)
          }}
        />
      )}
    </>
  )
}
