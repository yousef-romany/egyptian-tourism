# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Egyptian tourism website built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. The project showcases tour packages, reviews from multiple platforms (TripAdvisor, Viator, Klook), Egyptian history, and transportation options.

**Server-Side Rendering (SSR) Architecture**: The application is optimized for performance and SEO by leveraging Next.js server components. Data is fetched server-side and only interactive elements use client components.

## Development Commands

```bash
# Install dependencies
npm install
# or using bun (bun.lock present)
bun install

# Development server
npm run dev
# Runs on http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture & Structure

### App Router Structure (Next.js 15)

- **`app/`** - Next.js App Router directory
  - `layout.tsx` - Root layout with Navbar, Footer, ThemeProvider, and Organization JSON-LD
  - `page.tsx` - Homepage (server component) with reviews, tours, history timeline
  - Route directories: `about/`, `contact/`, `faq/`, `tours/`, `reviews/`, `profile/`, `wishlist/`, `login/`, `forgot-password/`, `history/`, `transportation/`, `privacy-policy/`, `terms/`
  - **`tours/[slug]/page.tsx`** - Dynamic tour detail pages with:
    - Server-side data fetching
    - Static generation (`generateStaticParams`)
    - Dynamic metadata (`generateMetadata`)
    - JSON-LD structured data
    - Image gallery, tabs, related tours
  - `globals.css` - Global styles and Tailwind directives

### Component Organization

- **`components/`** - Custom application components
  - **Server components:**
    - `tour-card-server.tsx` - Tour card with server-rendered content
    - `tour-carousel-server.tsx` - Fetches tours server-side
    - `reviews-section.tsx` - Server-rendered reviews tabs
  - **Client components:**
    - `navbar.tsx` - Navigation with interactivity
    - `animated-hero.tsx` - Hero with animations
    - `tour-carousel-client.tsx` - Carousel controls
    - `tour-image-gallery.tsx` - Interactive image gallery
    - `wishlist-button.tsx` - Wishlist toggle
    - `ModeToggle.tsx` - Theme toggle
  - **Shared components:**
    - `footer.tsx`, `newsletter.tsx`, `review-card.tsx`
    - `egyptian-divider.tsx`, `hieroglyphic-divider.tsx`
    - `history-timeline.tsx`, `transportation-section.tsx`
    - `theme-provider.tsx`
  - **SEO components:**
    - `tour-json-ld.tsx` - JSON-LD structured data
  - **`ui/`** - shadcn/ui components (Radix UI primitives)

### Data Layer

- **`lib/data/`** - Server-side data sources
  - `tours.ts` - Tour data and helper functions:
    - `getTours()` - Get all tours
    - `getTourBySlug(slug)` - Find tour by slug
    - `getTourById(id)` - Find tour by ID
    - `getFeaturedTours(limit)` - Get featured tours
    - `getRelatedTours(slug, limit)` - Get related tours
    - `getAllTourSlugs()` - Get all slugs for static generation
  - `reviews.ts` - Review data and helper functions:
    - `getReviews()` - Get all reviews
    - `getReviewsByPlatform(platform)` - Filter by platform
    - `getFeaturedReviews(limit)` - Get featured reviews
- **`lib/metadata.ts`** - SEO metadata utilities
  - `defaultMetadata` - Default site metadata
  - `generatePageMetadata()` - Helper for page-specific metadata

### Shared Utilities

- **`lib/utils.ts`** - Utility functions (includes `cn()` for Tailwind class merging)
- **`hooks/`** - Custom React hooks
  - `use-mobile.tsx` - Mobile breakpoint detection
  - `use-toast.ts` - Toast notification hook

### Configuration

- **Path aliases** (configured in `tsconfig.json`):
  - `@/*` maps to project root
  - Import example: `import { Button } from "@/components/ui/button"`

- **shadcn/ui config** (`components.json`):
  - Style: `default`
  - Base color: `neutral`
  - CSS variables: enabled
  - Icon library: `lucide-react`

- **Tailwind customizations** (`tailwind.config.ts`):
  - Custom colors: `egyptian-gold` (#d4af37), `egyptian-gold-dark` (#c09c2c)
  - Font family: `font-heading` uses Inter variable font
  - Container centered with 2rem padding

### Key Technical Details

- **TypeScript**: Strict mode enabled
- **Next.js config**: ESLint and TypeScript errors ignored during build (see `next.config.mjs`)
- **Images**: Unoptimized (static export compatible)
- **Theme**: Supports light/dark mode via `next-themes`
- **Forms**: Uses `react-hook-form` with `zod` validation
- **UI Library**: shadcn/ui built on Radix UI primitives
- **Animations**: Framer Motion for complex animations, Tailwind classes for simple transitions

### Layout Pattern

All pages are wrapped in a consistent layout (defined in `app/layout.tsx`):
```tsx
<ThemeProvider>
  <Navbar />
  <main>{children}</main>
  <Footer />
</ThemeProvider>
```

### Review Platform Integration

The homepage displays reviews from three platforms (TripAdvisor, Viator, Klook) using a tabbed interface. Each platform has distinct branding colors applied to active tabs.

### Styling Conventions

- Primary brand color: Egyptian gold (#d4af37)
- Dark navy: #0c1e35 (used for CTAs and dark sections)
- Uses Tailwind's utility-first approach
- Responsive design with mobile-first breakpoints
- Custom Egyptian-themed decorative elements (dividers, background patterns)

## Component Patterns

### Server-First Architecture

The application follows a server-first approach for optimal performance and SEO:

**Server Components** (default - NO "use client" directive):
- `app/page.tsx` - Homepage (server component)
- `app/tours/page.tsx` - Tours listing page (server component)
- `tour-card-server.tsx` - Tour card with server-rendered content
- `tour-carousel-server.tsx` - Server wrapper that fetches tour data
- `reviews-section.tsx` - Server component for reviews tabs and data

**Client Components** ("use client" directive - used ONLY for interactivity):
- `navbar.tsx` - Navigation with dropdowns, scroll effects, search toggle
- `animated-hero.tsx` - Hero section with Framer Motion animations
- `tour-carousel-client.tsx` - Carousel controls and animations (receives data as props)
- `wishlist-button.tsx` - Interactive wishlist toggle (small, focused client component)
- `ModeToggle.tsx` - Theme switching button

### Component Composition Pattern

**Server → Client Data Flow**:
```tsx
// Server Component (fetches data)
export default function TourCarouselServer() {
  const tours = getFeaturedTours(7) // Server-side data fetch
  return <TourCarouselClient tours={tours} /> // Pass to client
}

// Client Component (handles interactivity)
export function TourCarouselClient({ tours }: { tours: Tour[] }) {
  // Client-side state and animations
}
```

This pattern ensures:
- Data fetching happens on the server
- Only interactive portions run on the client
- Smaller JavaScript bundle sizes
- Better SEO and initial page load performance

### Animation Patterns

**Framer Motion** is used for complex animations:
- Page transitions and scroll-based animations
- Staggered child animations (see `animated-hero.tsx` containerVariants)
- Floating/hover effects with infinite loops
- Dropdown menu animations (navbar)
- Carousel slide transitions

Common animation variants pattern:
```tsx
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }
  }
}
```

### Navigation Structure

**Navbar** (`components/navbar.tsx`):
- Sticky header with scroll-based background blur
- Desktop: Horizontal nav with dropdown menus (hover-based)
- Mobile: Sheet component (drawer) navigation
- Nested dropdowns for Tours and History sections
- Active route highlighting with animated underline
- Search functionality (animated expand/collapse)
- Theme toggle and auth buttons

**Active Route Detection**:
```tsx
const isActive = (path: string) => {
  if (path === "/") return pathname === "/"
  return pathname.startsWith(path)
}
```

### Tour Data Structure

Tours are centralized in `lib/data/tours.ts`:
```tsx
interface Tour {
  id: number
  title: string
  slug: string  // URL-friendly identifier
  image: string
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
  groupSize: string
}
```

**Data Access Functions**:
- `getTours()` - Returns all tours
- `getTourBySlug(slug)` - Find tour by URL slug
- `getTourById(id)` - Find tour by ID
- `getFeaturedTours(limit)` - Get limited number of tours for homepage

**Important**: Tours use pre-defined slugs (e.g., "giza-pyramids-sphinx") for SEO-friendly URLs:
- Routes: `/tours/[slug]` for dynamic tour detail pages
- Links: `/tours/${tour.slug}`
- Static generation at build time via `generateStaticParams()`

**Extended Tour Data** (optional fields for detail pages):
- `images` - Array of image URLs for gallery
- `highlights` - Array of tour highlights
- `itinerary` - Day-by-day tour plan
- `included` - What's included in the price
- `excluded` - What's not included
- `faqs` - Frequently asked questions
- `relatedTourSlugs` - Related tour slugs for recommendations

### Carousel Implementation

**TourCarousel** (`components/tour-carousel.tsx`):
- Responsive grid (1/2/3 columns based on screen width)
- Auto-advance every 5 seconds
- Manual navigation with prev/next buttons
- Dot indicators for current position
- Framer Motion spring animations for smooth transitions
- Calculates maxIndex dynamically based on items to show

### Review System

**ReviewCard** component displays reviews with platform-specific styling:
- Platform types: "tripadvisor", "viator", "klook"
- Each platform has distinct brand colors
- Star ratings (1-5 stars)
- User info: name, location, date
- Tour name association

**Tabs for Platform Switching**:
- Uses Radix UI Tabs component
- Active tab colors match platform branding
- Grid layout (1/2/3 columns) for review cards

### Theming System

**CSS Variables** (defined in `app/globals.css`):
- Light and dark mode color schemes
- Uses HSL color format for all theme colors
- Primary color set to egyptian-gold (#d4af37)
- Custom radius variable for consistent border-radius

**Theme Toggle**:
- Uses `next-themes` package
- ThemeProvider wraps entire app in layout
- Attribute-based theme switching (`attribute="class"`)
- Default theme: "light"
- System theme detection disabled (`enableSystem`)

### Image Handling

**Next.js Image Component**:
- Unoptimized mode enabled (for static export)
- Placeholder images used: `/placeholder.svg` with size parameters
- Logo stored in `/public/logo.png`
- Images use fill layout or explicit width/height
- Object-fit classes for proper scaling

### Form Patterns

The project uses:
- `react-hook-form` for form state management
- `zod` for schema validation
- `@hookform/resolvers` for integration
- Form components from shadcn/ui (Input, Label, Checkbox, etc.)

### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px (custom container max-width)

**Mobile-First Approach**:
- Base styles apply to mobile
- Use `md:`, `lg:` prefixes for larger screens
- Grid columns adjust per breakpoint: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### State Management

**Server-First Data Flow**:
- Data fetched in server components using data layer functions
- Passed as props to client components when interactivity is needed
- No global state library needed
- Client components manage only UI state (modals, toggles, animations)
- Wishlist state is local (logged to console, ready for API integration)

**Benefits**:
- Data fetching is fast (server-side)
- No loading spinners for initial data
- SEO-friendly (content rendered on server)
- Smaller client-side JavaScript bundle

### Icon System

**Lucide React**:
- Import icons individually: `import { Icon } from "lucide-react"`
- Common icons: Star, MapPin, Clock, ChevronRight, Heart, Menu, X, Search
- Consistent sizing: `h-4 w-4` (16px) or `h-6 w-6` (24px)

## Important Notes

### Adding New Tours
1. Add tour object to the `tours` array in `lib/data/tours.ts`
2. **Required fields**: id, title, slug, image, duration, location, price, rating, reviews, description, category, groupSize
3. **Optional fields for detail page**: images, highlights, itinerary, included, excluded, faqs, relatedTourSlugs
4. Generate SEO-friendly slug (lowercase, hyphen-separated): `"giza-pyramids-sphinx"`
5. Tour detail pages are automatically generated at build time via `generateStaticParams()`
6. Metadata is automatically generated via `generateMetadata()`
7. No need to update component files - they automatically fetch from the data layer

### Adding New UI Components
Use shadcn/ui CLI to add components:
```bash
npx shadcn@latest add [component-name]
```
Components install to `components/ui/` directory

### Commented Code
Several features are commented out in `app/tours/page.tsx`:
- Sidebar filters (search, categories, locations, duration, price range)
- Sorting dropdown
- Pagination controls

These can be uncommented and implemented when backend filtering/pagination is ready.

### Metadata Pattern
Each route can export metadata:
```tsx
export const metadata = {
  title: "Page Title - Egydise Tours",
  description: "Page description",
  generator: 'v0.dev'
}
```

### CSS Utilities
Use the `cn()` helper from `lib/utils.ts` to conditionally merge Tailwind classes:
```tsx
import { cn } from "@/lib/utils"
className={cn("base-classes", condition && "conditional-classes")}
```

## Performance & SEO Best Practices

### Server Components by Default
- Always create components as server components unless they need client-side interactivity
- Add "use client" only when necessary (state, effects, event handlers, browser APIs)
- Extract interactive portions into small, focused client components

### When to Use Client Components
Use client components ONLY when you need:
- `useState`, `useEffect`, or other React hooks
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, document)
- Third-party libraries that require client-side execution
- Animations with Framer Motion or similar libraries

### Data Fetching Strategy
- Fetch data in server components using data layer functions
- Pass data as props to client components
- No need for loading states on initial render (data is pre-fetched)
- Future: Replace data layer with database queries or API calls

### Component Splitting Example
```tsx
// ❌ BAD: Entire component is client-side
"use client"
export default function TourCard({ tour }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  return (
    <Card>
      {/* All content rendered client-side */}
      <button onClick={() => setIsWishlisted(!isWishlisted)}>
        Wishlist
      </button>
    </Card>
  )
}

// ✅ GOOD: Split into server + small client component
// tour-card-server.tsx (Server Component)
export default function TourCardServer({ tour }) {
  return (
    <Card>
      {/* Server-rendered content */}
      <WishlistButton tourId={tour.id} />
    </Card>
  )
}

// wishlist-button.tsx (Client Component)
"use client"
export function WishlistButton({ tourId }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  return (
    <button onClick={() => setIsWishlisted(!isWishlisted)}>
      Wishlist
    </button>
  )
}
```

## SEO & Performance Features

### Dynamic Metadata Generation
Every tour detail page automatically generates optimized metadata:
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const tour = getTourBySlug(params.slug)
  return {
    title: `${tour.title} - Egydise Tours`,
    description: tour.description,
    openGraph: { /* Open Graph tags */ },
    twitter: { /* Twitter Card tags */ },
  }
}
```

### Static Site Generation (SSG)
Tours are pre-rendered at build time for maximum performance:
```tsx
export async function generateStaticParams() {
  const slugs = getAllTourSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

Benefits:
- Pages are generated at build time
- No server-side rendering delay
- Better SEO (content is in HTML)
- Faster page loads

### JSON-LD Structured Data
All tour pages include Schema.org structured data for rich search results:
- `TourJsonLd` - Tour-specific structured data
- `OrganizationJsonLd` - Site-wide organization data (in root layout)

This helps search engines understand:
- Tour details (name, description, location, price)
- Ratings and reviews
- Business information
- Offers and availability

### Open Graph & Twitter Cards
Automatic social media preview cards:
- Custom title and description per page
- Tour images for visual previews
- Optimized for Facebook, Twitter, LinkedIn

### SEO Best Practices Implemented
- ✅ Server-side rendering for all content
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (h1 → h6)
- ✅ Alt text for all images
- ✅ Descriptive URLs (slug-based routing)
- ✅ Meta descriptions for all pages
- ✅ Breadcrumb navigation
- ✅ Internal linking structure
- ✅ Mobile-responsive design
- ✅ Fast page loads (server components)

## Build & Deployment

### Build Process
```bash
npm run build
```

This will:
1. Generate static pages for all tours (`generateStaticParams`)
2. Optimize images and assets
3. Create production bundles
4. Generate metadata for all pages

### Performance Optimizations
- Server components by default (smaller JS bundles)
- Static generation for tour pages
- Image optimization with Next.js Image
- Code splitting (automatic)
- CSS optimization (Tailwind + purging)
