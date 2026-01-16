import strapiAPI from '@/lib/api/strapi'

// Frontend FAQ type
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags?: string[]
  helpful?: number
  views?: number
  lastUpdated?: string
  featured?: boolean
}

/**
 * Convert Strapi FAQ to frontend FAQ type
 */
function convertStrapiFAQ(strapiFAQ: any): FAQ {
  return {
    id: strapiFAQ.id?.toString() || '',
    question: strapiFAQ.question || '',
    answer: strapiFAQ.answer || '',
    category: strapiFAQ.category || 'general',
    tags: strapiFAQ.tags || [],
    helpful: strapiFAQ.helpful || 0,
    views: strapiFAQ.views || 0,
    lastUpdated: strapiFAQ.updatedAt || strapiFAQ.createdAt,
    featured: strapiFAQ.featured || false
  }
}

/**
 * Get all FAQ categories
 */
export async function getFAQCategories(): Promise<string[]> {
  try {
    const response = await strapiAPI.faqs.getCategories()
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch FAQ categories:', error)
    return []
  }
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(category?: string): Promise<FAQ[]> {
  try {
    const strapiFAQs = await strapiAPI.faqs.getByCategory(category)
    return strapiFAQs.map(convertStrapiFAQ)
  } catch (error) {
    console.error(`Failed to fetch FAQs for category ${category}:`, error)
    return []
  }
}

/**
 * Search FAQs
 */
export async function searchFAQs(query: string, category?: string): Promise<FAQ[]> {
  try {
    const strapiFAQs = await strapiAPI.faqs.search(query, category)
    return strapiFAQs.map(convertStrapiFAQ)
  } catch (error) {
    console.error(`Failed to search FAQs:`, error)
    return []
  }
}

/**
 * Get featured FAQs
 */
export async function getFeaturedFAQs(limit: number = 10): Promise<FAQ[]> {
  try {
    const strapiFAQs = await strapiAPI.faqs.getFeatured(limit)
    return strapiFAQs.map(convertStrapiFAQ)
  } catch (error) {
    console.error('Failed to fetch featured FAQs:', error)
    return []
  }
}

/**
 * Increment FAQ view count
 */
export async function incrementFAQView(id: string): Promise<void> {
  try {
    await strapiAPI.faqs.incrementView(id)
  } catch (error) {
    console.error(`Failed to increment FAQ view count:`, error)
  }
}

/**
 * Mark FAQ as helpful
 */
export async function markFAQHelpful(id: string, helpful: boolean): Promise<void> {
  try {
    await strapiAPI.faqs.markHelpful(id, helpful)
  } catch (error) {
    console.error(`Failed to mark FAQ as helpful:`, error)
  }
}