'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HistoryVideo } from '@/lib/api/strapi'
import { getMediaUrl } from '@/lib/api/strapi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Eye, Heart, Clock } from 'lucide-react'

interface VideoCardProps {
  video: HistoryVideo
  locale: string
}

export function VideoCard({ video, locale }: VideoCardProps) {
  const t = useTranslations('videoCard')

  const thumbnailUrl = getMediaUrl(video.thumbnail)
  
  // Format duration from seconds or use the duration string
  const formatDuration = (duration?: string, durationSeconds?: number) => {
    if (duration) return duration
    
    if (durationSeconds) {
      const hours = Math.floor(durationSeconds / 3600)
      const minutes = Math.floor((durationSeconds % 3600) / 60)
      const seconds = durationSeconds % 60
      
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    
    return '0:00'
  }

  const duration = formatDuration(video.duration, video.durationSeconds)
  const viewCount = video.views.toLocaleString()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/${locale}/history-videos/${video.slug}`}>
          <div className="relative aspect-video">
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full p-3">
                <Play className="h-6 w-6 text-gray-900 ml-1" />
              </div>
            </div>
            
            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
            
            {/* Featured badge */}
            {video.featured && (
              <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                {t('featured')}
              </Badge>
            )}
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {t(`categories.${video.category}`)}
          </Badge>
          
          {video.language && (
            <Badge variant="outline" className="text-xs">
              {t(`languages.${video.language}`)}
            </Badge>
          )}
          
          {video.hasSubtitles && (
            <Badge variant="outline" className="text-xs">
              {t('subtitles')}
            </Badge>
          )}
        </div>

        <Link href={`/${locale}/history-videos/${video.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {video.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {video.shortDescription || video.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{viewCount}</span>
            </div>
            
            {video.likes && (
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{video.likes.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {video.ageRating && (
            <Badge variant="outline" className="text-xs">
              {video.ageRating}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            className="flex-1"
          >
            <Link href={`/${locale}/history-videos/${video.slug}`}>
              {t('watchNow')}
            </Link>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="p-2"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}