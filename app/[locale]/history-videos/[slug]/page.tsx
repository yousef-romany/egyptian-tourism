import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { historyVideos } from '@/lib/api/strapi'
import { VideoPlayer } from '@/components/video-player'
import { VideoInfo } from '@/components/video-info'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedVideos } from '@/components/related-videos'

interface VideoPageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: { 
  params: { locale: string; slug: string } 
}) {
  const t = await getTranslations({ locale, namespace: 'video' })
  
  try {
    const video = await historyVideos.getBySlug(slug)
    
    return {
      title: video.metaTitle || video.title,
      description: video.metaDescription || video.shortDescription || video.description,
      keywords: `${video.title}, Egyptian history, ${video.category}`,
      openGraph: {
        title: video.metaTitle || video.title,
        description: video.metaDescription || video.shortDescription || video.description,
        images: video.thumbnail ? [{
          url: video.thumbnail.url,
          width: video.thumbnail.width,
          height: video.thumbnail.height,
          alt: video.title,
        }] : [],
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: t('notFound.title'),
      description: t('notFound.description'),
    }
  }
}

export default async function VideoPage({ 
  params: { locale, slug } 
}: VideoPageProps) {
  const t = await getTranslations({ locale, namespace: 'video' })
  
  try {
    const video = await historyVideos.getBySlug(slug)
    
    // Increment video views
    await historyVideos.incrementViews(video.id)
    
    const breadcrumbItems = [
      { label: t('breadcrumb.home'), href: `/${locale}` },
      { label: t('breadcrumb.history'), href: `/${locale}/history` },
      { label: t('breadcrumb.videos'), href: `/${locale}/history-videos` },
      { label: video.title },
    ]

    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <VideoPlayer video={video} />
            <VideoInfo video={video} locale={locale} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <RelatedVideos 
                videoId={video.id} 
                category={video.category}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching video:', error)
    notFound()
  }
}