import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ShopClient } from './shop-client'
import strapiAPI from '@/lib/api/strapi'

export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Shop')
  
  return {
    title: `${t('title')} | WanderLand Egypt`,
    description: t('subtitle'),
    keywords: 'Egyptian souvenirs, papyrus, jewelry, statues, Egyptian crafts, gifts from Egypt',
  }
}

export default async function ShopPage() {
  // Fetch initial products with error handling for build time
  let products: any[] = []

  try {
    const response = await strapiAPI.products.getAll({
      pageSize: 12,
      sort: 'createdAt:desc',
    })
    products = response.data || []
  } catch (error) {
    console.log('Failed to fetch products during build, will use empty state:', error)
    // Return empty products array - client component will handle empty state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0c1e35] to-[#1a3a5c] py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Egyptian Souvenirs & Gifts
          </h1>
          <p className="text-lg text-gray-200">
            Discover authentic handcrafted treasures from land of pharaohs
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ShopClient initialProducts={products} />
    </div>
  )
}
