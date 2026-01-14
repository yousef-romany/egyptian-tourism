import { getTranslations } from 'next-intl/server'
import { products } from '@/lib/api/strapi'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'
import { Pagination } from '@/components/pagination'
import { Breadcrumb } from '@/components/breadcrumb'
import { Suspense } from 'react'

interface ProductsPageProps {
  params: { locale: string }
  searchParams: {
    page?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    featured?: string
  }
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'products' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      type: 'website',
    },
  }
}

export default async function ProductsPage({ 
  params: { locale }, 
  searchParams 
}: ProductsPageProps) {
  const t = await getTranslations({ locale, namespace: 'products' })
  
  // Parse search params
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined
  const sort = searchParams.sort || 'name:asc'
  const featured = searchParams.featured === 'true'

  try {
    // Fetch products with filters
    const { data: productsData, meta } = await products.getAll({
      category,
      minPrice,
      maxPrice,
      featured,
      sort,
      page,
      pageSize: 12,
    })

    const breadcrumbItems = [
      { label: t('breadcrumb.home'), href: `/${locale}` },
      { label: t('breadcrumb.products') },
    ]

    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              currentCategory={category}
              currentMinPrice={minPrice}
              currentMaxPrice={maxPrice}
              currentSort={sort}
              currentFeatured={featured}
              locale={locale}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {t('results', { 
                  count: meta?.pagination?.total || 0,
                  start: ((page - 1) * 12) + 1,
                  end: Math.min(page * 12, meta?.pagination?.total || 0)
                })}
              </p>
            </div>

            <Suspense fallback={<div>Loading products...</div>}>
              {productsData.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {productsData.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        locale={locale}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {meta?.pagination && meta.pagination.pageCount > 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={page}
                        totalPages={meta.pagination.pageCount}
                        baseUrl={`/${locale}/products`}
                        searchParams={searchParams}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🛍️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('noProducts.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('noProducts.description')}
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('error.title')}
          </h3>
          <p className="text-gray-600">
            {t('error.description')}
          </p>
        </div>
      </div>
    )
  }
}