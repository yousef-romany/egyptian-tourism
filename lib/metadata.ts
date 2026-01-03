import type { Metadata } from "next"

const siteUrl = "https://egydisetours.com"

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Egydise Tours - Experience the Magic of Egypt",
    template: "%s | Egydise Tours"
  },
  description:
    "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River. Expert guides, 5-star reviews.",
  keywords: [
    "Egypt tours",
    "Pyramids tour",
    "Nile cruise",
    "Cairo tours",
    "Luxor tours",
    "Egyptian tourism",
    "Egypt travel",
    "Valley of the Kings",
    "Egyptian history",
    "Aswan tours",
    "Red Sea diving",
    "Egyptian museums",
    "Sphinx tours",
    "Temple of Karnak",
  ],
  authors: [{ name: "Egydise Tours" }],
  creator: "Egydise Tours",
  publisher: "Egydise Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Egydise Tours",
    title: "Egydise Tours - Experience the Magic of Egypt",
    description:
      "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River. Expert guides, 5-star reviews.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Egydise Tours - Egyptian Tourism",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egydise Tours - Experience the Magic of Egypt",
    description:
      "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River. Expert guides, 5-star reviews.",
    images: ["/og-image.jpg"],
    creator: "@egydise",
    site: "@egydise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "travel",
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = "",
  image?: string
): Metadata {
  const url = `${siteUrl}${path}`
  const ogImage = image || "/og-image.jpg"

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Egydise Tours",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@egydise",
      site: "@egydise",
    },
  }
}
