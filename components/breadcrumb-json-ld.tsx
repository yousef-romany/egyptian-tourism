"use client"

import { usePathname } from "next/navigation"

interface BreadcrumbJsonLdProps {
  baseUrl?: string
}

export function BreadcrumbJsonLd({ baseUrl = "https://egydisetours.com" }: BreadcrumbJsonLdProps) {
  const pathname = usePathname()

  // Don't add structured data for home page
  if (pathname === "/" || !pathname) return null

  const pathSegments = pathname.split("/").filter((segment) => segment)

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    ...pathSegments.map((segment, index) => {
      const href = `${baseUrl}/${pathSegments.slice(0, index + 1).join("/")}`
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        "@type": "ListItem",
        position: index + 2,
        name: label,
        item: href,
      }
    }),
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}