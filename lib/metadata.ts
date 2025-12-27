import type { Metadata } from "next"

export const defaultMetadata: Metadata = {
  title: "Egydise Tours - Experience the Magic of Egypt",
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
  ],
  authors: [{ name: "Egydise Tours" }],
  creator: "Egydise Tours",
  publisher: "Egydise Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://egydise-tours.com",
    siteName: "Egydise Tours",
    title: "Egydise Tours - Experience the Magic of Egypt",
    description:
      "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River.",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
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
      "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River.",
    images: ["/placeholder.svg?height=630&width=1200"],
    creator: "@egydise",
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
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = ""
): Metadata {
  return {
    title: `${title} - Egydise Tours`,
    description,
    openGraph: {
      title: `${title} - Egydise Tours`,
      description,
      url: `https://egydise-tours.com${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Egydise Tours`,
      description,
    },
  }
}
