import strapiAPI, { Review as StrapiReview } from '@/lib/api/strapi'
import { sampleReviews } from './sample-data'

// Frontend Review type
export interface Review {
  platform: "tripadvisor" | "viator" | "klook"
  name: string
  location: string
  date: string
  rating: number
  title: string
  content: string
  tourName: string
  avatar: string
}

/**
 * Convert Strapi Review to frontend Review type
 */
function convertStrapiReview(strapiReview: StrapiReview): Review {
  return {
    platform: strapiReview.platform,
    name: strapiReview.name,
    location: strapiReview.location,
    date: strapiReview.date,
    rating: strapiReview.rating,
    title: strapiReview.review.split('.')[0] || '', // Use first sentence as title
    content: strapiReview.review,
    tourName: strapiReview.tourName || strapiReview.tour?.title || '',
    avatar: strapiReview.avatar || '/placeholder.svg?height=40&width=40',
  }
}

/**
 * Get all reviews from Strapi
 */
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await strapiAPI.reviews.getAll()
    return response.data.map(convertStrapiReview)
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    // Return all sample reviews when backend is unavailable
    const allSampleReviews = [
      ...sampleReviews.tripadvisor,
      ...sampleReviews.viator,
      ...sampleReviews.klook
    ]
    return allSampleReviews.map(convertStrapiReview)
  }
}

/**
 * Get reviews by platform from Strapi
 */
export async function getReviewsByPlatform(
  platform: "tripadvisor" | "viator" | "klook"
): Promise<Review[]> {
  try {
    const strapiReviews = await strapiAPI.reviews.getByPlatform(platform)
    return strapiReviews.map(convertStrapiReview)
  } catch (error) {
    console.error(`Failed to fetch reviews for ${platform}:`, error)
    // Return sample data when backend is unavailable
    const sampleData = sampleReviews[platform] || []
    return sampleData.map(convertStrapiReview)
  }
}

/**
 * Get featured reviews from Strapi
 */
export async function getFeaturedReviews(limit: number = 9): Promise<Review[]> {
  try {
    const strapiReviews = await strapiAPI.reviews.getFeatured(limit)
    return strapiReviews.map(convertStrapiReview)
  } catch (error) {
    console.error('Failed to fetch featured reviews:', error)
    // Return sample featured reviews when backend is unavailable
    const allSampleReviews = [
      ...sampleReviews.tripadvisor.filter(r => r.featured),
      ...sampleReviews.viator.filter(r => r.featured),
      ...sampleReviews.klook.filter(r => r.featured)
    ]
    return allSampleReviews.slice(0, limit).map(convertStrapiReview)
  }
}
