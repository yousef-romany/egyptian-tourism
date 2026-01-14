'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { historyVideos } from '@/lib/api/strapi'
import { HistoryVideo } from '@/lib/api/strapi'
import { getMediaUrl } from '@/lib/api/strapi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Eye, Clock } from 'lucide-react'

interface RelatedVideosProps {
  videoId: number
  category: string
  locale: string
}

export function RelatedVideos({ videoId, category, locale }: RelatedVideosProps) {
  const t = useTranslations('relatedVideos')
  const [relatedVideos, setRelatedVideos] = useState<HistoryVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        // Fetch videos from the same category, excluding the current video
        const { data } = await historyVideos.getByCategory(category, 1, 5)
        
        // Filter out the current video
        const filtered = data.filter(video => video.id !== videoId)
        setRelatedVideos(filtered.slice(0, 4)) // Take only 4 videos
      } catch (error) {
        console.error('Error fetching related videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedVideos()
  }, [videoId, category])

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="bg-gray-200 w-40 h-24 rounded-md flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedVideos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <p className="text-gray-600">{t('noVideos')}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
      <div className="space-y-4">
        {relatedVideos.map((video) => {
          const thumbnailUrl = getMediaUrl(video.thumbnail)
          const duration = formatDuration(video.duration, video.durationSeconds)
          const viewCount = video.views.toLocaleString()
          
          return (
            <div key={video.id} className="flex gap-3 group cursor-pointer">
              <Link href={`/${locale}/history-videos/${video.slug}`} className="flex gap-3 w-full">
                <div className="relative w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {duration}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-1.5">
                      <Play className="h-3 w-3 text-gray-900 ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h4>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{viewCount}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      {t(`categories.${video.category}`)}
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/${locale}/history-videos?category=${category}`}>
            {t('viewMore')}
          </Link>
        </Button>
      </div>
    </div>
  )
}