import { getTranslations } from 'next-intl/server'
import { historyVideos } from '@/lib/api/strapi'
import { Pagination } from '@/components/pagination'
import { Breadcrumb } from '@/components/breadcrumb'
import { Suspense } from 'react'
import { VideoFilters } from '@/components/video-filters'
import { VideoCard } from '@/components/video-card'

interface HistoryVideosPageProps {
  params: { locale: string }
  searchParams: {
    page?: string
    category?: string
    language?: string
    sort?: string
    featured?: string
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'historyVideos' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      type: 'website',
    },
  }
}

export default async function HistoryVideosPage({
  params,
  searchParams
}: HistoryVideosPageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const t = await getTranslations({ locale, namespace: 'historyVideos' })
  
  // Parse search params
  const page = parseInt(resolvedSearchParams.page || '1')
  const category = resolvedSearchParams.category
  const language = resolvedSearchParams.language
  const sort = resolvedSearchParams.sort || 'createdAt:desc'
  const featured = resolvedSearchParams.featured === 'true'

  try {
    // Fetch videos with filters
    const { data: videosData, meta } = await historyVideos.getAll({
      category,
      language,
      featured,
      sort,
      page,
      pageSize: 12,
    })

    const breadcrumbItems = [
      { label: t('breadcrumb.home'), href: `/${locale}` },
      { label: t('breadcrumb.history'), href: `/${locale}/history` },
      { label: t('breadcrumb.videos') },
    ]

    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <VideoFilters
              currentCategory={category}
              currentLanguage={language}
              currentSort={sort}
              currentFeatured={featured}
              locale={locale}
            />
          </div>

          {/* Videos Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {t('results', { 
                  count: meta?.pagination?.total || 0,
                  start: ((page - 1) * 12) + 1,
                  end: Math.min(page * 12, meta?.pagination?.total || 0)
                })}
              </p>
            </div>

            <Suspense fallback={<div>Loading videos...</div>}>
              {videosData.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {videosData.map((video) => (
                      <VideoCard
                        key={video.id} 
                        video={video} 
                        locale={locale}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {meta?.pagination && meta.pagination.pageCount > 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={page}
                        totalPages={meta.pagination.pageCount}
                        baseUrl={`/${locale}/history-videos`}
                        searchParams={resolvedSearchParams}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📹</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('noVideos.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('noVideos.description')}
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching history videos:', error)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('error.title')}
          </h3>
          <p className="text-gray-600">
            {t('error.description')}
          </p>
        </div>
      </div>
    )
  }
}