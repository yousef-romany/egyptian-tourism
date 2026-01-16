import { Metadata } from 'next'
import { HistoryVideosClient } from './history-videos-client'
import strapiAPI from '@/lib/api/strapi'

export const metadata: Metadata = {
  title: 'Egyptian History Videos | Educational Content',
  description:
    'Watch educational videos and documentaries about ancient Egypt, pharaohs, monuments, mythology, and Egyptian culture.',
  keywords:
    'Egyptian history, ancient Egypt videos, pharaohs, pyramids, documentaries, educational videos',
}

export const revalidate = 3600 // Revalidate every hour

export default async function HistoryVideosPage() {
  // Fetch initial videos
  const { data: videos } = await strapiAPI.historyVideos.getAll({
    pageSize: 12,
    sort: 'createdAt:desc',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0c1e35] to-[#1a3a5c] py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Egyptian History Videos
          </h1>
          <p className="text-lg text-gray-200">
            Explore the fascinating history of ancient Egypt through documentaries and educational content
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <HistoryVideosClient initialVideos={videos} />
    </div>
  )
}
