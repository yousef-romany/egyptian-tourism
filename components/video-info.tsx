'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HistoryVideo } from '@/lib/api/strapi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  User, 
  Globe, 
  Film, 
  Tag,
  Info,
  Share2
} from 'lucide-react'

interface VideoInfoProps {
  video: HistoryVideo
  locale: string
}

export function VideoInfo({ video, locale }: VideoInfoProps) {
  const t = useTranslations('videoInfo')
  const [activeTab, setActiveTab] = useState('description')

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
  const likeCount = video.likes ? video.likes.toLocaleString() : '0'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.shortDescription || video.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Video Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
      
      {/* Video Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{viewCount} {t('views')}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span>{likeCount} {t('likes')}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(video.publishedAt)}</span>
        </div>
        
        {duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {/* Category and Language Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline">
          {t(`categories.${video.category}`)}
        </Badge>
        
        {video.language && (
          <Badge variant="outline">
            <Globe className="h-3 w-3 mr-1" />
            {t(`languages.${video.language}`)}
          </Badge>
        )}
        
        {video.hasSubtitles && (
          <Badge variant="outline">
            {t('subtitles')}
          </Badge>
        )}
        
        {video.ageRating && (
          <Badge variant="outline">
            {video.ageRating}
          </Badge>
        )}
        
        {video.featured && (
          <Badge className="bg-yellow-500 text-white">
            {t('featured')}
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          {t('share')}
        </Button>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">{t('tabs.description')}</TabsTrigger>
          <TabsTrigger value="details">{t('tabs.details')}</TabsTrigger>
          <TabsTrigger value="metadata">{t('tabs.metadata')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-4">
          <div className="prose max-w-none">
            <p>{video.description}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                {t('details.videoInfo')}
              </h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('details.category')}:</dt>
                  <dd>{t(`categories.${video.category}`)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('details.duration')}:</dt>
                  <dd>{duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('details.language')}:</dt>
                  <dd>{t(`languages.${video.language}`)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('details.videoType')}:</dt>
                  <dd>{t(`videoTypes.${video.videoType}`)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">{t('details.ageRating')}:</dt>
                  <dd>{video.ageRating || 'Not Rated'}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Film className="h-4 w-4" />
                {t('details.production')}
              </h4>
              <dl className="space-y-2 text-sm">
                {video.producer && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.producer')}:</dt>
                    <dd>{video.producer}</dd>
                  </div>
                )}
                
                {video.narrator && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.narrator')}:</dt>
                    <dd>{video.narrator}</dd>
                  </div>
                )}
                
                {video.releaseDate && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.releaseDate')}:</dt>
                    <dd>{formatDate(video.releaseDate)}</dd>
                  </div>
                )}
                
                {video.historicalAccuracy && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.historicalAccuracy')}:</dt>
                    <dd>{t(`accuracy.${video.historicalAccuracy}`)}</dd>
                  </div>
                )}
                
                {video.relatedPeriod && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.relatedPeriod')}:</dt>
                    <dd>{video.relatedPeriod}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="metadata" className="mt-4">
          <div className="space-y-6">
            {video.tags && video.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {t('details.tags')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {video.subtitleLanguages && video.subtitleLanguages.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t('details.subtitleLanguages')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {video.subtitleLanguages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}