"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, CheckCircle, Play } from "lucide-react"
import { getMediaUrl } from "@/lib/api/strapi"
import { useState } from "react"

interface Testimonial {
  id: number
  customerName: string
  customerPhoto?: any
  customerLocation?: string
  story: string
  tourName?: string
  rating: number
  featured: boolean
  date: string
  tripDate?: string
  verified: boolean
  videoUrl?: string
}

interface VideoTestimonialProps {
  testimonial: Testimonial
}

export function VideoTestimonial({ testimonial }: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Check if video URL is YouTube
  const isYouTube = testimonial.videoUrl?.includes('youtube.com') || testimonial.videoUrl?.includes('youtu.be')
  const videoId = isYouTube && testimonial.videoUrl ? getYouTubeId(testimonial.videoUrl) : null

  return (
    <Card className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300">
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          <>
            {/* Video Thumbnail */}
            {videoId && (
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={testimonial.customerName}
                className="w-full h-full object-cover"
              />
            )}
            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group bg-black/40 hover:bg-black/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-egyptian-gold/90 group-hover:bg-egyptian-gold flex items-center justify-center group-hover:scale-110 transition-all shadow-2xl">
                <Play className="h-10 w-10 text-white ml-1" />
              </div>
            </button>
          </>
        ) : (
          <>
            {/* YouTube Embed */}
            {videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={testimonial.customerName}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            {/* Fallback for other video URLs */}
            {!videoId && testimonial.videoUrl && (
              <video
                src={testimonial.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </>
        )}
      </div>

      <CardContent className="p-6">
        {/* Customer Info */}
        <div className="flex items-start gap-4 mb-4">
          {testimonial.customerPhoto && (
            <img
              src={getMediaUrl(testimonial.customerPhoto)}
              alt={testimonial.customerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-egyptian-gold"
            />
          )}
          <div className="flex-1">
            <h4 className="font-bold text-lg">{testimonial.customerName}</h4>
            {testimonial.customerLocation && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {testimonial.customerLocation}
              </div>
            )}
          </div>
          {testimonial.verified && (
            <CheckCircle className="h-5 w-5 text-green-500" title="Verified Customer" />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>

        {/* Story */}
        {testimonial.story && (
          <p className="text-sm leading-relaxed mb-4 line-clamp-4">
            {testimonial.story}
          </p>
        )}

        {/* Tour Info */}
        {testimonial.tourName && (
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="bg-egyptian-gold/10 text-egyptian-gold border-egyptian-gold/20">
              {testimonial.tourName}
            </Badge>
            {testimonial.tripDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(testimonial.tripDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
