import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { products } from '@/lib/api/strapi'
import { ProductDetail } from '@/components/product-detail'
import { Breadcrumb } from '@/components/breadcrumb'
import { ProductRecommendations } from '@/components/product-recommendations'

interface ProductPageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: { 
  params: { locale: string; slug: string } 
}) {
  const t = await getTranslations({ locale, namespace: 'product' })
  
  try {
    const product = await products.getBySlug(slug)
    
    return {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || product.description,
      keywords: product.metaKeywords || `${product.name}, Egyptian ${product.category}, souvenirs`,
      openGraph: {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.shortDescription || product.description,
        images: product.images?.[0] ? [{
          url: product.images[0].url,
          width: product.images[0].width,
          height: product.images[0].height,
          alt: product.name,
        }] : [],
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: t('notFound.title'),
      description: t('notFound.description'),
    }
  }
}

export default async function ProductPage({ 
  params: { locale, slug } 
}: ProductPageProps) {
  const t = await getTranslations({ locale, namespace: 'product' })
  
  try {
    const product = await products.getBySlug(slug)
    
    // Increment product views
    await products.incrementViews(product.id)
    
    const breadcrumbItems = [
      { label: t('breadcrumb.home'), href: `/${locale}` },
      { label: t('breadcrumb.products'), href: `/${locale}/products` },
      { label: product.name },
    ]

    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <ProductDetail product={product} locale={locale} />
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('relatedProducts')}
          </h2>
          <ProductRecommendations 
            productId={product.id} 
            category={product.category}
            locale={locale}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    notFound()
  }
}