'use client'

import { useEffect, useState } from 'react'
import { HistoryVideo } from '@/lib/api/strapi'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, ThumbsUp, X } from 'lucide-react'
import strapiAPI from '@/lib/api/strapi'

interface VideoModalProps {
  video: HistoryVideo
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const [hasLiked, setHasLiked] = useState(false)
  const [localLikes, setLocalLikes] = useState(video.likes || 0)

  useEffect(() => {
    // Increment views when modal opens
    if (isOpen && video.id) {
      strapiAPI.historyVideos.incrementViews(video.id).catch((error) => {
        console.error('Failed to increment views:', error)
      })
    }
  }, [isOpen, video.id])

  const handleLike = async () => {
    if (hasLiked) return

    try {
      await strapiAPI.historyVideos.incrementLikes(video.id)
      setLocalLikes(localLikes + 1)
      setHasLiked(true)
    } catch (error) {
      console.error('Failed to like video:', error)
    }
  }

  // Extract video ID from URL
  const getVideoEmbedUrl = () => {
    const url = video.videoUrl

    if (video.videoType === 'youtube') {
      // Extract YouTube video ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      const match = url.match(youtubeRegex)
      return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url
    } else if (video.videoType === 'vimeo') {
      // Extract Vimeo video ID
      const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
      const match = url.match(vimeoRegex)
      return match ? `https://player.vimeo.com/video/${match[3]}?autoplay=1` : url
    }

    return url
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          {video.shortDescription && (
            <DialogDescription>{video.shortDescription}</DialogDescription>
          )}
        </DialogHeader>

        {/* Video Player */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          {video.videoType === 'youtube' || video.videoType === 'vimeo' ? (
            <iframe
              src={getVideoEmbedUrl()}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="h-full w-full"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Video Info */}
        <div className="space-y-4">
          {/* Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {(video.views || 0).toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {localLikes.toLocaleString()} likes
              </span>
            </div>

            <Button
              onClick={handleLike}
              disabled={hasLiked}
              variant={hasLiked ? 'secondary' : 'outline'}
              size="sm"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {hasLiked ? 'Liked' : 'Like'}
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{video.category.replace('-', ' ')}</Badge>
            {video.language && (
              <Badge variant="outline" className="uppercase">
                {video.language}
              </Badge>
            )}
            {video.ageRating && <Badge variant="outline">{video.ageRating}</Badge>}
            {video.historicalAccuracy && (
              <Badge variant="outline">
                {video.historicalAccuracy.replace('-', ' ')}
              </Badge>
            )}
            {video.duration && <Badge variant="outline">{video.duration}</Badge>}
          </div>

          {/* Description */}
          {video.description && (
            <div className="prose max-w-none text-sm text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: video.description }} />
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {video.producer && (
              <div>
                <span className="font-medium text-gray-700">Producer:</span>
                <span className="ml-2 text-gray-600">{video.producer}</span>
              </div>
            )}
            {video.narrator && (
              <div>
                <span className="font-medium text-gray-700">Narrator:</span>
                <span className="ml-2 text-gray-600">{video.narrator}</span>
              </div>
            )}
            {video.relatedPeriod && (
              <div>
                <span className="font-medium text-gray-700">Historical Period:</span>
                <span className="ml-2 text-gray-600">{video.relatedPeriod}</span>
              </div>
            )}
            {video.releaseDate && (
              <div>
                <span className="font-medium text-gray-700">Release Date:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(video.releaseDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-700">Tags:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
