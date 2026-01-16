'use client'

import { useState, useEffect } from 'react'
import { Product, getMediaUrl } from '@/lib/api/strapi'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'souvenirs', label: 'Souvenirs' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'papyrus', label: 'Papyrus Art' },
  { value: 'statues', label: 'Statues' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'art', label: 'Art' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
]

interface ShopClientProps {
  initialProducts: Product[]
}

export function ShopClient({ initialProducts }: ShopClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const { addItem } = useCart()

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.shortDescription?.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, sortBy, searchQuery])

  const handleAddToCart = async (product: Product) => {
    await addItem(product, 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">No products found</p>
          <Button
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            variant="outline"
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
              {/* Product Image */}
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={getMediaUrl(product.images?.[0])}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.featured && (
                    <Badge className="absolute left-2 top-2 bg-[#d4af37]">Featured</Badge>
                  )}
                  {!product.inStock && (
                    <Badge className="absolute right-2 top-2 bg-red-500">Out of Stock</Badge>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge className="absolute right-2 top-2 bg-green-500">Sale</Badge>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <CardHeader className="pb-3">
                <Link href={`/shop/${product.slug}`}>
                  <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#d4af37]">
                    {product.name}
                  </h3>
                </Link>
                {product.shortDescription && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {product.shortDescription}
                  </p>
                )}
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{product.currency}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full"
                  variant={product.inStock ? 'default' : 'secondary'}
                >
                  {product.inStock ? (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Show count */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}
