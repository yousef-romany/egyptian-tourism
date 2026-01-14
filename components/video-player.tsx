'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HistoryVideo } from '@/lib/api/strapi'
import { getMediaUrl } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Volume2, Maximize, Heart, Share2 } from 'lucide-react'

interface VideoPlayerProps {
  video: HistoryVideo
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const t = useTranslations('videoPlayer')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  const thumbnailUrl = getMediaUrl(video.thumbnail)
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Here you would also call the API to increment likes
    // historyVideos.incrementLikes(video.id)
  }

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

  const handleFullscreen = () => {
    const videoElement = document.getElementById('video-player') as HTMLVideoElement
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen()
      }
    }
  }

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

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* Video Thumbnail/Player */}
      <div className="relative aspect-video">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button
                size="lg"
                onClick={handlePlayPause}
                className="bg-white/90 hover:bg-white text-black rounded-full p-4"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-white text-xl font-bold mb-2">{video.title}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {t(`categories.${video.category}`)}
                </Badge>
                
                {video.language && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {t(`languages.${video.language}`)}
                  </Badge>
                )}
                
                {video.hasSubtitles && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {t('subtitles')}
                  </Badge>
                )}
                
                <span className="text-white text-sm">{duration}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Video player placeholder - in a real implementation, this would be an actual video player */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="mb-4">
                  {video.videoType === 'youtube' && (
                    <div className="bg-red-600 rounded-lg p-4 inline-block">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                  )}
                  
                  {video.videoType === 'vimeo' && (
                    <div className="bg-blue-600 rounded-lg p-4 inline-block">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.977 6.197c-.105 2.302-1.723 4.866-4.848 7.694-3.231 2.983-5.972 4.477-8.224 4.477-1.389 0-2.562-.575-3.519-1.724l-1.916-3.504c-.637-1.181-.956-2.322-.956-3.425 0-1.59.848-2.931 2.544-4.022 1.696-1.091 3.653-1.637 5.871-1.637.848 0 1.696.085 2.544.255 1.807.383 3.023 1.212 3.648 2.393.064.149.106.319.106.51 0 .426-.234.809-.702 1.149l-1.916 1.403c-.447.319-.744.574-.891.765-.148.191-.234.404-.234.639 0 .362.191.723.574 1.085l1.916 2.608c.426.574.956.861 1.593.861 1.807 0 3.874-1.724 6.202-5.172 2.328-3.447 3.544-6.202 3.544-8.265 0-1.389-.447-2.43-1.34-3.123-.894-.693-2.094-1.04-3.602-1.04-2.117 0-4.35.723-6.698 2.168C2.449 7.395 1.275 9.289 1.275 11.639c0 1.389.319 2.842.956 4.357l1.807 4.022c.426.956.894 1.435 1.403 1.435.447 0 1.275-.617 2.48-1.85 1.206-1.233 2.433-2.842 3.681-4.826 1.248-1.983 1.916-3.602 1.916-4.857 0-.574-.149-1.04-.447-1.389-.298-.349-.702-.523-1.212-.523-.426 0-.914.128-1.464.383l-1.485.765c-.574.298-1.04.447-1.403.447-.447 0-.851-.191-1.212-.574l-1.916-2.608c-.426-.574-.639-1.212-.639-1.915 0-.894.383-1.788 1.149-2.682.766-.894 1.788-1.703 3.067-2.426 1.279-.723 2.565-1.085 3.857-1.085 1.485 0 2.73.511 3.734 1.531 1.004 1.021 1.506 2.329 1.506 3.925z"/>
                      </svg>
                    </div>
                  )}
                  
                  {video.videoType === 'local' && (
                    <div className="bg-gray-700 rounded-lg p-4 inline-block">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                  
                  {video.videoType === 'external' && (
                    <div className="bg-purple-600 rounded-lg p-4 inline-block">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <p className="text-lg mb-2">{video.title}</p>
                <p className="text-sm opacity-75">Video Player Placeholder</p>
              </div>
            </div>
            
            {/* Video Controls */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMute}
                      className="text-white hover:bg-white/20"
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                    
                    <span className="text-white text-sm">{duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`text-white hover:bg-white/20 ${isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="text-white hover:bg-white/20"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}