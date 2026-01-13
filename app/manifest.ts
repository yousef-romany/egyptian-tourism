import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Egydise Tours - Discover the Wonders of Egypt',
    short_name: 'Egydise Tours',
    description: 'Experience unforgettable Egyptian adventures with expert-guided tours to pyramids, temples, and Nile cruises.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c1e35',
    theme_color: '#d4af37',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['travel', 'tourism', 'travel agency'],
    shortcuts: [
      {
        name: 'Browse Tours',
        short_name: 'Tours',
        description: 'View all available tours',
        url: '/tours',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Book Now',
        short_name: 'Book',
        description: 'Book your Egyptian adventure',
        url: '/book-now',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read travel guides and tips',
        url: '/blog',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  }
}
