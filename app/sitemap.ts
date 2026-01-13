import { MetadataRoute } from 'next'
import strapiAPI from '@/lib/api/strapi'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all tours
    const toursResponse = await strapiAPI.tours.getAll()
    const tours = toursResponse.data || []

    // Fetch all blog posts
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts?populate=*`, {
      cache: 'no-store',
    })
    const blogData = await blogResponse.json()
    const blogPosts = blogData.data || []

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/tours`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/reviews`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${SITE_URL}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/book-now`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/login`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/history`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/transportation`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${SITE_URL}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${SITE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ]

    // Dynamic tour routes
    const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
      url: `${SITE_URL}/tours/${tour.slug}`,
      lastModified: new Date(tour.updatedAt || tour.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Dynamic blog post routes
    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Combine all routes
    return [...staticRoutes, ...tourRoutes, ...blogRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return fallback sitemap
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${SITE_URL}/tours`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  }
}
