import strapiAPI, { Transportation as StrapiTransportation, Driver as StrapiDriver, getMediaUrl } from '@/lib/api/strapi'

// Frontend Transportation type
export interface Transportation {
  id: number
  name: string
  slug: string
  type: 'sedan' | 'suv' | 'van' | 'minivan' | 'coach' | 'luxury'
  capacity: string
  features: string[]
  pricePerDay: number
  pricePerHour: number
  priceDisplay: string
  image: string
  images?: string[]
  rating: number
  reviews: number
  featured: boolean
  description?: string
  included?: string[]
  excluded?: string[]
  faqs?: Array<{ question: string; answer: string }>
  metaTitle?: string
  metaDescription?: string
}

// Frontend Driver type
export interface Driver {
  id: number
  name: string
  photo: string
  experience: string
  languages: string[]
  specialties: string[]
  rating: number
  reviews: number
  verified: boolean
  bio?: string
  featured: boolean
}

/**
 * Convert Strapi Transportation to frontend Transportation type
 */
function convertStrapiTransportation(strapiTransportation: StrapiTransportation): Transportation {
  return {
    id: strapiTransportation.id,
    name: strapiTransportation.name,
    slug: strapiTransportation.slug,
    type: strapiTransportation.type,
    capacity: strapiTransportation.capacity,
    features: strapiTransportation.features || [],
    pricePerDay: strapiTransportation.pricePerDay,
    pricePerHour: strapiTransportation.pricePerHour,
    priceDisplay: strapiTransportation.priceDisplay || `$${strapiTransportation.pricePerDay}/day`,
    image: getMediaUrl(strapiTransportation.image || undefined),
    images: strapiTransportation.images?.map((img) => getMediaUrl(img)),
    rating: strapiTransportation.rating,
    reviews: strapiTransportation.reviews,
    featured: strapiTransportation.featured,
    description: strapiTransportation.description,
    included: strapiTransportation.included,
    excluded: strapiTransportation.excluded,
    faqs: strapiTransportation.faqs,
    metaTitle: strapiTransportation.metaTitle,
    metaDescription: strapiTransportation.metaDescription,
  }
}

/**
 * Convert Strapi Driver to frontend Driver type
 */
function convertStrapiDriver(strapiDriver: StrapiDriver): Driver {
  return {
    id: strapiDriver.id,
    name: strapiDriver.name,
    photo: getMediaUrl(strapiDriver.photo || undefined),
    experience: strapiDriver.experience,
    languages: strapiDriver.languages || [],
    specialties: strapiDriver.specialties || [],
    rating: strapiDriver.rating,
    reviews: strapiDriver.reviews,
    verified: strapiDriver.verified,
    bio: strapiDriver.bio,
    featured: strapiDriver.featured,
  }
}

/**
 * Get all transportation options from Strapi
 */
export async function getAllTransportation(): Promise<Transportation[]> {
  try {
    const response = await strapiAPI.transportation.getAll()
    return response.data.map(convertStrapiTransportation)
  } catch (error) {
    console.error('Failed to fetch transportation options:', error)
    return []
  }
}

/**
 * Get transportation by type from Strapi
 */
export async function getTransportationByType(type: string): Promise<Transportation[]> {
  try {
    const strapiTransportation = await strapiAPI.transportation.getByType(type)
    return strapiTransportation.map(convertStrapiTransportation)
  } catch (error) {
    console.error(`Failed to fetch transportation options for type ${type}:`, error)
    return []
  }
}

/**
 * Get featured transportation options from Strapi
 */
export async function getFeaturedTransportation(limit?: number): Promise<Transportation[]> {
  try {
    const strapiTransportation = await strapiAPI.transportation.getFeatured(limit)
    return strapiTransportation.map(convertStrapiTransportation)
  } catch (error) {
    console.error('Failed to fetch featured transportation options:', error)
    return []
  }
}

/**
 * Get transportation by slug from Strapi
 */
export async function getTransportationBySlug(slug: string): Promise<Transportation | undefined> {
  try {
    const strapiTransportation = await strapiAPI.transportation.getBySlug(slug)
    return convertStrapiTransportation(strapiTransportation)
  } catch (error) {
    console.error(`Failed to fetch transportation with slug ${slug}:`, error)
    return undefined
  }
}

/**
 * Get transportation by ID from Strapi
 */
export async function getTransportationById(id: number): Promise<Transportation | undefined> {
  try {
    const strapiTransportation = await strapiAPI.transportation.getById(id)
    return convertStrapiTransportation(strapiTransportation)
  } catch (error) {
    console.error(`Failed to fetch transportation with ID ${id}:`, error)
    return undefined
  }
}

/**
 * Get all drivers from Strapi
 */
export async function getAllDrivers(): Promise<Driver[]> {
  try {
    const response = await strapiAPI.drivers.getAll()
    return response.data.map(convertStrapiDriver)
  } catch (error) {
    console.error('Failed to fetch drivers:', error)
    return []
  }
}

/**
 * Get featured drivers from Strapi
 */
export async function getFeaturedDrivers(limit?: number): Promise<Driver[]> {
  try {
    const strapiDrivers = await strapiAPI.drivers.getFeatured(limit)
    return strapiDrivers.map(convertStrapiDriver)
  } catch (error) {
    console.error('Failed to fetch featured drivers:', error)
    return []
  }
}

/**
 * Get driver by ID from Strapi
 */
export async function getDriverById(id: number): Promise<Driver | undefined> {
  try {
    const strapiDriver = await strapiAPI.drivers.getById(id)
    return convertStrapiDriver(strapiDriver)
  } catch (error) {
    console.error(`Failed to fetch driver with ID ${id}:`, error)
    return undefined
  }
}