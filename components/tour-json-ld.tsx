import type { Tour } from "@/lib/data/tours"

interface TourJsonLdProps {
  tour: Tour
}

export function TourJsonLd({ tour }: TourJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.description,
    image: tour.images || [tour.image],
    address: {
      "@type": "Place",
      name: tour.location,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: tour.price.replace("$", ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationJsonLdProps {
  url?: string
}

export function OrganizationJsonLd({ url = "https://wonderlandegypt.com" }: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "WanderLand Egypt",
    description: "Award-winning Egyptian tour operator offering expert-guided tours to Egypt's most iconic destinations.",
    url: url,
    logo: `${url}/logo.png`,
    image: `${url}/placeholder.svg?height=630&width=1200`,
    telephone: "+20-100-123-4567", // TODO: Update with actual business phone number
    email: "info@wonderlandegypt.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Egypt",
      addressLocality: "Cairo",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 1200,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [
      "https://www.facebook.com/wanderlandegypt",
      "https://www.instagram.com/wanderlandegypt",
      "https://twitter.com/wanderlandegypt",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
