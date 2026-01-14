import strapiAPI, { BlogPost as StrapiBlogPost, getMediaUrl } from '@/lib/api/strapi'
import { sampleBlogPosts } from './sample-data'

// Frontend BlogPost type
export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
}

/**
 * Convert Strapi BlogPost to frontend BlogPost type
 */
function convertStrapiBlogPost(strapiBlogPost: StrapiBlogPost): BlogPost {
  return {
    id: strapiBlogPost.id,
    slug: strapiBlogPost.slug,
    title: strapiBlogPost.title,
    excerpt: strapiBlogPost.excerpt,
    content: strapiBlogPost.content,
    image: getMediaUrl(strapiBlogPost.image),
    author: {
      name: strapiBlogPost.author?.name || 'Anonymous',
      avatar: strapiBlogPost.author?.avatar || '/placeholder.svg?height=100&width=100',
      role: strapiBlogPost.author?.role || 'Writer',
    },
    category: strapiBlogPost.category,
    tags: strapiBlogPost.tags || [],
    publishedAt: strapiBlogPost.publishedDate,
    readTime: `${strapiBlogPost.readTime} min read`,
    featured: strapiBlogPost.featured,
  }
}

/**
 * Get all blog posts from Strapi (sorted by date)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await strapiAPI.blog.getAll({ sort: 'publishedDate:desc' })
    return response.data.map(convertStrapiBlogPost)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

/**
 * Get featured blog posts from Strapi
 */
export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const strapiBlogPosts = await strapiAPI.blog.getFeatured(limit)
    return strapiBlogPosts.map(convertStrapiBlogPost)
  } catch (error) {
    console.error('Failed to fetch featured blog posts:', error)
    // Return sample data when backend is unavailable
    return limit ? sampleBlogPosts.slice(0, limit) : sampleBlogPosts
  }
}

/**
 * Get blog post by slug from Strapi
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const strapiBlogPost = await strapiAPI.blog.getBySlug(slug)
    return convertStrapiBlogPost(strapiBlogPost)
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error)
    return undefined
  }
}

/**
 * Get blog posts by category from Strapi
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const strapiBlogPosts = await strapiAPI.blog.getByCategory(category)
    return strapiBlogPosts.map(convertStrapiBlogPost)
  } catch (error) {
    console.error(`Failed to fetch blog posts for category ${category}:`, error)
    return []
  }
}

/**
 * Get blog posts by tag
 * Note: This requires fetching all posts and filtering client-side
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts()
    return allPosts.filter(post =>
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
  } catch (error) {
    console.error(`Failed to fetch blog posts for tag ${tag}:`, error)
    return []
  }
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts()
    return [...new Set(allPosts.map(post => post.category))]
  } catch (error) {
    console.error('Failed to fetch blog categories:', error)
    return []
  }
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts()
    const allTags = allPosts.flatMap(post => post.tags)
    return [...new Set(allTags)]
  } catch (error) {
    console.error('Failed to fetch blog tags:', error)
    return []
  }
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  try {
    const currentPost = await getPostBySlug(slug)
    if (!currentPost) return []

    const allPosts = await getAllPosts()

    // Find posts with matching tags or category
    const related = allPosts
      .filter(post => post.slug !== slug)
      .map(post => {
        let score = 0
        if (post.category === currentPost.category) score += 3
        const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
        score += commonTags.length
        return { post, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post)

    return related
  } catch (error) {
    console.error(`Failed to fetch related posts for ${slug}:`, error)
    return []
  }
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts()
    return allPosts.map(post => post.slug)
  } catch (error) {
    console.error('Failed to fetch blog post slugs:', error)
    return []
  }
}
