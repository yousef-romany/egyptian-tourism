'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Product } from '@/lib/api/strapi'
import { getMediaUrl } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  Minus,
  Plus,
  Package
} from 'lucide-react'

interface ProductDetailProps {
  product: Product
  locale: string
}

export function ProductDetail({ product, locale }: ProductDetailProps) {
  const t = useTranslations('productDetail')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  const isOutOfStock = !product.inStock || product.stock === 0
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  
  const mainImage = product.images?.[selectedImageIndex]
  const imageUrl = mainImage ? getMediaUrl(mainImage) : '/placeholder.svg'
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(product.stock, prev + 1))
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-yellow-500 text-white">
                {t('featured')}
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="destructive">
                -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                {t('outOfStock')}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Thumbnail Images */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index 
                    ? 'border-blue-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={getMediaUrl(image)}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        {/* Title and Category */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              {t(`categories.${product.category}`)}
            </Badge>
            {product.sku && (
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount} {t('reviews')})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xl text-gray-500 line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          <span className={`font-medium ${
            isOutOfStock ? 'text-red-600' : 'text-green-600'
          }`}>
            {isOutOfStock ? t('outOfStock') : t('inStock', { count: product.stock })}
          </span>
        </div>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-gray-600">{product.shortDescription}</p>
        )}

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">{t('quantity')}:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isOutOfStock ? t('outOfStock') : t('addToCart')}
            </Button>
            
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" onClick={shareProduct}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>{t('freeShipping')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>{t('securePayment')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4" />
            <span>{t('easyReturns')}</span>
          </div>
        </div>

        <Separator />

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t('tabs.description')}</TabsTrigger>
            <TabsTrigger value="details">{t('tabs.details')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('tabs.reviews')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">{t('details.productInfo')}</h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.category')}:</dt>
                    <dd>{t(`categories.${product.category}`)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{t('details.sku')}:</dt>
                    <dd>{product.sku}</dd>
                  </div>
                  {product.material && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">{t('details.material')}:</dt>
                      <dd>{product.material}</dd>
                    </div>
                  )}
                  {product.origin && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">{t('details.origin')}:</dt>
                      <dd>{product.origin}</dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">{t('details.weight')}:</dt>
                      <dd>{product.weight}g</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">{t('details.tags')}</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="text-center py-8">
              <p className="text-gray-600">{t('reviews.comingSoon')}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}