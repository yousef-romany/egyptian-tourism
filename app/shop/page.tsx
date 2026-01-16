import { Metadata } from 'next'
import { ShopClient } from './shop-client'
import strapiAPI from '@/lib/api/strapi'

export const metadata: Metadata = {
  title: 'Egyptian Souvenirs & Gifts | Shop',
  description:
    'Discover authentic Egyptian souvenirs, papyrus art, handcrafted jewelry, statues, and traditional crafts. Shop unique gifts from Egypt.',
  keywords:
    'Egyptian souvenirs, papyrus, jewelry, statues, Egyptian crafts, gifts from Egypt',
}

export const revalidate = 3600 // Revalidate every hour

export default async function ShopPage() {
  // Fetch initial products
  const { data: products } = await strapiAPI.products.getAll({
    pageSize: 12,
    sort: 'createdAt:desc',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0c1e35] to-[#1a3a5c] py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Egyptian Souvenirs & Gifts
          </h1>
          <p className="text-lg text-gray-200">
            Discover authentic handcrafted treasures from the land of pharaohs
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ShopClient initialProducts={products} />
    </div>
  )
}
