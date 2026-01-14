'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/api/strapi'
import { Product } from '@/lib/api/strapi'
import { getMediaUrl } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart } from 'lucide-react'

interface ProductRecommendationsProps {
  productId: number
  category: string
  locale: string
}

export function ProductRecommendations({ productId, category, locale }: ProductRecommendationsProps) {
  const t = useTranslations('productRecommendations')
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetch products from the same category, excluding the current product
        const { data } = await products.getByCategory(category, 1, 4)
        
        // Filter out the current product
        const filtered = data.filter(product => product.id !== productId)
        setRecommendedProducts(filtered.slice(0, 3)) // Take only 3 products
      } catch (error) {
        console.error('Error fetching product recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [productId, category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (recommendedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{t('noRecommendations')}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recommendedProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative">
            <Link href={`/${locale}/products/${product.slug}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={product.images?.[0] ? getMediaUrl(product.images[0]) : '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            </Link>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.featured && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  {t('featured')}
                </Badge>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge variant="destructive">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                  {t('outOfStock')}
                </Badge>
              )}
            </div>

            {/* Wishlist button */}
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label={t('addToWishlist')}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs">
                {t(`categories.${product.category}`)}
              </Badge>
            </div>

            <Link href={`/${locale}/products/${product.slug}`}>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center mb-3">
              {product.rating && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                asChild
                className="flex-1"
                disabled={!product.inStock}
              >
                <Link href={`/${locale}/products/${product.slug}`}>
                  {t('viewDetails')}
                </Link>
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                disabled={!product.inStock}
                className="p-2"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}