import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Egydise Tours'

/**
 * Generate enhanced metadata with Open Graph and Twitter Cards
 */
export function generateEnhancedMetadata(options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  noindex?: boolean
  canonical?: string
}): Metadata {
  const {
    title,
    description,
    image = '/og-image.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    noindex = false,
    canonical,
  } = options

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}`

  return {
    title: fullTitle,
    description,
    ...(noindex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
  }
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogPostMetadata(post: {
  title: string
  description: string
  image: string
  slug: string
  publishedAt: string
  updatedAt: string
  author?: string
  category?: string
  tags?: string[]
}): Metadata {
  return generateEnhancedMetadata({
    title: post.title,
    description: post.description,
    image: post.image,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: post.author ? [post.author] : undefined,
    section: post.category,
    tags: post.tags,
    canonical: `/blog/${post.slug}`,
  })
}

/**
 * Generate metadata for tours
 */
export function generateTourMetadata(tour: {
  title: string
  description: string
  image: string
  slug: string
  location?: string
  category?: string
  price?: string
}): Metadata {
  const description = tour.description || `Book your ${tour.title} adventure with Egydise Tours. Experience the best of Egypt with our expert guides.`

  return generateEnhancedMetadata({
    title: tour.title,
    description,
    image: tour.image,
    type: 'website',
    tags: tour.category ? [tour.category, tour.location || 'Egypt', 'Tours'] : ['Egypt', 'Tours'],
    canonical: `/tours/${tour.slug}`,
  })
}

/**
 * Generate metadata with hreflang tags for multi-language
 */
export function generateHreflangMetadata(
  path: string,
  locales: { locale: string; url: string }[]
): Metadata {
  const languages: Record<string, string> = {}

  locales.forEach((locale) => {
    languages[locale.locale] = `${SITE_URL}${locale.url}`
  })

  return {
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages,
    },
  }
}

/**
 * Generate JSON-LD structured data
 */
export function generateJsonLd(type: string, data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }
}

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationJsonLd() {
  return generateJsonLd('Organization', {
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.facebook.com/egydisetours',
      'https://www.instagram.com/egydisetours',
      'https://www.twitter.com/egydisetours',
      'https://www.tripadvisor.com/EGydiseTours',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-123-456-789',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic', 'French'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Pyramids Road',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo',
      postalCode: '11511',
      addressCountry: 'EG',
    },
  })
}

/**
 * Generate Tour JSON-LD
 */
export function generateTourJsonLd(tour: {
  name: string
  description: string
  image: string
  price: string
  url: string
  location?: string
  duration?: string
}) {
  return generateJsonLd('TouristTrip', {
    name: tour.name,
    description: tour.description,
    image: tour.image,
    url: `${SITE_URL}${tour.url}`,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    touristType: 'Cultural tourism',
    ...(tour.location && {
      location: {
        '@type': 'Place',
        name: tour.location,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'EG',
        },
      },
    }),
  })
}

/**
 * Generate Blog Post JSON-LD
 */
export function generateBlogPostJsonLd(post: {
  title: string
  description: string
  image: string
  publishedAt: string
  modifiedAt: string
  url: string
  author?: string
}) {
  return generateJsonLd('BlogPosting', {
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    url: `${SITE_URL}${post.url}`,
    author: {
      '@type': 'Person',
      name: post.author || 'Egydise Tours Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  })
}

/**
 * Generate Breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  }))

  return generateJsonLd('BreadcrumbList', {
    itemListElement,
  })
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return generateJsonLd('FAQPage', {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}
