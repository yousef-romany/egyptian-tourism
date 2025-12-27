import strapiAPI, { Tour as StrapiTour, getMediaUrl } from '@/lib/api/strapi'

// Re-export Tour type from API for backward compatibility
export type Tour = {
  id: number
  title: string
  slug: string
  image: string
  images?: string[]
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
  groupSize: string
  highlights?: string[]
  itinerary?: {
    day: number
    title: string
    description: string
    meals: string[]
    accommodation?: string
  }[]
  included?: string[]
  excluded?: string[]
  faqs?: {
    question: string
    answer: string
  }[]
  relatedTourSlugs?: string[]
}

/**
 * Convert Strapi Tour to frontend Tour type
 */
function convertStrapiTour(strapiTour: StrapiTour): Tour {
  return {
    id: strapiTour.id,
    title: strapiTour.title,
    slug: strapiTour.slug,
    image: getMediaUrl(strapiTour.image),
    images: strapiTour.images?.map((img) => getMediaUrl(img)),
    duration: strapiTour.duration,
    location: strapiTour.location,
    price: strapiTour.priceDisplay || `$${strapiTour.price}`,
    rating: strapiTour.rating,
    reviews: strapiTour.reviews,
    description: strapiTour.description,
    category: strapiTour.category,
    groupSize: strapiTour.groupSize,
    highlights: strapiTour.highlights,
    itinerary: strapiTour.itinerary,
    included: strapiTour.included,
    excluded: strapiTour.excluded,
    faqs: strapiTour.faqs,
    relatedTourSlugs: strapiTour.relatedTours?.map((t) => t.slug),
  }
}

/**
 * Get all tours from Strapi
 */
export async function getTours(): Promise<Tour[]> {
  try {
    const response = await strapiAPI.tours.getAll()
    return response.data.map(convertStrapiTour)
  } catch (error) {
    console.error('Failed to fetch tours:', error)
    return []
  }
}

/**
 * Get tour by slug from Strapi
 */
export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  try {
    const strapiTour = await strapiAPI.tours.getBySlug(slug)
    return convertStrapiTour(strapiTour)
  } catch (error) {
    console.error(`Failed to fetch tour with slug ${slug}:`, error)
    return undefined
  }
}

/**
 * Get tour by ID from Strapi
 */
export async function getTourById(id: number): Promise<Tour | undefined> {
  try {
    const strapiTour = await strapiAPI.tours.getById(id)
    return convertStrapiTour(strapiTour)
  } catch (error) {
    console.error(`Failed to fetch tour with ID ${id}:`, error)
    return undefined
  }
}

/**
 * Get featured tours from Strapi
 */
export async function getFeaturedTours(limit: number = 7): Promise<Tour[]> {
  try {
    const strapiTours = await strapiAPI.tours.getFeatured(limit)
    return strapiTours.map(convertStrapiTour)
  } catch (error) {
    console.error('Failed to fetch featured tours:', error)
    return []
  }
}

/**
 * Get related tours
 * Note: This function now needs to fetch the tour first to get related tour slugs
 */
export async function getRelatedTours(slug: string, limit: number = 3): Promise<Tour[]> {
  try {
    const tour = await getTourBySlug(slug)
    if (!tour || !tour.relatedTourSlugs || tour.relatedTourSlugs.length === 0) {
      // Return random tours if no related tours specified
      const allTours = await getTours()
      return allTours.filter((t) => t.slug !== slug).slice(0, limit)
    }

    // Fetch related tours by their slugs
    const relatedToursPromises = tour.relatedTourSlugs.map((relatedSlug) =>
      getTourBySlug(relatedSlug)
    )
    const relatedTours = (await Promise.all(relatedToursPromises))
      .filter((t): t is Tour => t !== undefined)
      .slice(0, limit)

    // If we don't have enough related tours, fill with random ones
    if (relatedTours.length < limit) {
      const allTours = await getTours()
      const additionalTours = allTours
        .filter(
          (t) =>
            t.slug !== slug && !relatedTours.some((rt) => rt.slug === t.slug)
        )
        .slice(0, limit - relatedTours.length)
      return [...relatedTours, ...additionalTours]
    }

    return relatedTours
  } catch (error) {
    console.error(`Failed to fetch related tours for ${slug}:`, error)
    return []
  }
}

/**
 * Get all tour slugs for static generation
 */
export async function getAllTourSlugs(): Promise<string[]> {
  try {
    const tours = await getTours()
    return tours.map((tour) => tour.slug)
  } catch (error) {
    console.error('Failed to fetch tour slugs:', error)
    return []
  }
}
