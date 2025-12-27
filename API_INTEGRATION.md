# Frontend-Backend API Integration Reference

This document explains how the frontend connects to the Strapi backend.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                      │
│                   http://localhost:3000                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────┐      │
│  │ Pages (app/)                                       │      │
│  │ - page.tsx (Homepage)                             │      │
│  │ - tours/page.tsx (Tours listing)                  │      │
│  │ - tours/[slug]/page.tsx (Tour details)            │      │
│  └─────────────────────┬─────────────────────────────┘      │
│                        │                                     │
│                        ▼                                     │
│  ┌───────────────────────────────────────────────────┐      │
│  │ Data Layer (lib/data/)                            │      │
│  │ - tours.ts → getTours(), getTourBySlug()         │      │
│  │ - reviews.ts → getReviews(), getByPlatform()     │      │
│  └─────────────────────┬─────────────────────────────┘      │
│                        │                                     │
│                        ▼                                     │
│  ┌───────────────────────────────────────────────────┐      │
│  │ API Client (lib/api/strapi.ts)                    │      │
│  │ - strapiAPI.tours.getAll()                        │      │
│  │ - strapiAPI.reviews.getByPlatform()               │      │
│  │ - strapiAPI.newsletter.subscribe()                │      │
│  └─────────────────────┬─────────────────────────────┘      │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │ (fetch API)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Strapi CMS)                       │
│                   http://localhost:1337                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────┐      │
│  │ REST API Endpoints (/api)                         │      │
│  │ - GET /api/tours?populate=*                       │      │
│  │ - GET /api/tours/featured                         │      │
│  │ - GET /api/tours/:slug?populate=*                 │      │
│  │ - GET /api/reviews/platform/:platform             │      │
│  │ - POST /api/newsletter-subscriptions/subscribe    │      │
│  └─────────────────────┬─────────────────────────────┘      │
│                        │                                     │
│                        ▼                                     │
│  ┌───────────────────────────────────────────────────┐      │
│  │ Content Types (src/api/)                          │      │
│  │ - tour/                                           │      │
│  │ - review/                                         │      │
│  │ - blog-post/                                      │      │
│  │ - booking/                                        │      │
│  │ - newsletter-subscription/                        │      │
│  │ - contact-submission/                             │      │
│  │ - wishlist/                                       │      │
│  └─────────────────────┬─────────────────────────────┘      │
│                        │                                     │
│                        ▼                                     │
│  ┌───────────────────────────────────────────────────┐      │
│  │ Database (SQLite - Development)                   │      │
│  │ Location: database/.tmp/data.db                   │      │
│  └───────────────────────────────────────────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Egydise Tours
```

### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
CLIENT_URL=http://localhost:3000
```

---

## Data Flow Examples

### Example 1: Fetching Tours on Homepage

**1. User visits homepage**
```
http://localhost:3000
```

**2. Homepage component calls data layer**
```typescript
// app/page.tsx
import { getFeaturedTours } from '@/lib/data/tours'

export default async function HomePage() {
  const tours = await getFeaturedTours(7)
  // ... render tours
}
```

**3. Data layer calls API client**
```typescript
// lib/data/tours.ts
export async function getFeaturedTours(limit: number = 7): Promise<Tour[]> {
  const strapiTours = await strapiAPI.tours.getFeatured(limit)
  return strapiTours.map(convertStrapiTour)
}
```

**4. API client makes HTTP request**
```typescript
// lib/api/strapi.ts
async getFeatured(limit?: number): Promise<Tour[]> {
  const query = limit ? `?limit=${limit}` : ''
  const response = await apiFetch<StrapiResponse<Tour[]>>(`/tours/featured${query}`)
  return response.data
}
```

**5. Strapi returns data**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Giza Pyramids & Sphinx",
        "slug": "giza-pyramids-sphinx",
        "price": 89,
        "rating": 4.9,
        "image": { "url": "/uploads/pyramid.jpg" },
        ...
      }
    }
  ]
}
```

**6. Data is converted and rendered**
- Image URLs are converted to full URLs
- Price is formatted
- Tour cards are displayed on the homepage

---

### Example 2: Getting Reviews by Platform

**1. User clicks TripAdvisor tab on homepage**

**2. Reviews section fetches TripAdvisor reviews**
```typescript
// components/reviews-section.tsx (server component)
import { getReviewsByPlatform } from '@/lib/data/reviews'

const tripadvisorReviews = await getReviewsByPlatform('tripadvisor')
```

**3. API request is made**
```
GET http://localhost:1337/api/reviews/platform/tripadvisor
```

**4. Reviews are displayed**

---

### Example 3: Newsletter Subscription

**1. User enters email and clicks subscribe**

**2. Client component handles submission**
```typescript
// components/newsletter.tsx
"use client"

const handleSubmit = async (email: string) => {
  try {
    await strapiAPI.newsletter.subscribe(email, 'website')
    // Show success message
  } catch (error) {
    // Show error message
  }
}
```

**3. API client posts to backend**
```typescript
// lib/api/strapi.ts
async subscribe(email: string, source?: string) {
  const response = await apiFetch('/newsletter-subscriptions/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, source })
  })
  return response.data
}
```

**4. Backend saves subscription**
```
POST http://localhost:1337/api/newsletter-subscriptions/subscribe
Body: { "email": "user@example.com", "source": "website" }
```

---

## Key Files Reference

### Frontend

#### API Client
- **Location**: `lib/api/strapi.ts`
- **Purpose**: Central API client with all backend communication logic
- **Exports**:
  - `strapiAPI.tours.*` - Tours operations
  - `strapiAPI.reviews.*` - Reviews operations
  - `strapiAPI.blog.*` - Blog operations
  - `strapiAPI.bookings.*` - Booking operations
  - `strapiAPI.newsletter.*` - Newsletter operations
  - `strapiAPI.contact.*` - Contact form operations
  - `strapiAPI.wishlist.*` - Wishlist operations
  - `strapiAPI.auth.*` - Authentication operations
  - `strapiAPI.profile.*` - User profile operations

#### Data Layer
- **Location**: `lib/data/`
- **Files**:
  - `tours.ts` - Tour data functions
  - `reviews.ts` - Review data functions
  - `blog.ts` - Blog data functions (if exists)
- **Purpose**: Converts Strapi responses to frontend types

#### Components Using API
- `app/page.tsx` - Homepage (tours, reviews)
- `app/tours/page.tsx` - Tours listing page
- `app/tours/[slug]/page.tsx` - Tour detail page
- `components/newsletter.tsx` - Newsletter subscription
- `components/reviews-section.tsx` - Reviews display

### Backend

#### Content Types
- **Location**: `src/api/*/content-types/*/schema.json`
- **Files**:
  - `tour/schema.json` - Tour content type
  - `review/schema.json` - Review content type
  - `blog-post/schema.json` - Blog post content type
  - `booking/schema.json` - Booking content type
  - `newsletter-subscription/schema.json` - Newsletter content type
  - `contact-submission/schema.json` - Contact content type
  - `wishlist/schema.json` - Wishlist content type

#### Custom Routes/Controllers
- **Location**: `src/api/*/routes/*.js` and `src/api/*/controllers/*.js`
- Custom endpoints like `/tours/featured` and `/reviews/platform/:platform`

---

## Common API Endpoints

### Tours
```
GET    /api/tours?populate=*                          - Get all tours
GET    /api/tours/:slug?populate=*                    - Get tour by slug
GET    /api/tours/featured?populate=*                 - Get featured tours
```

### Reviews
```
GET    /api/reviews                                   - Get all reviews
GET    /api/reviews/platform/:platform                - Get by platform
GET    /api/reviews/featured                          - Get featured reviews
GET    /api/reviews/stats                             - Get review stats
```

### Blog Posts
```
GET    /api/blog-posts?populate=*                     - Get all posts
GET    /api/blog-posts/:slug?populate=*               - Get post by slug
GET    /api/blog-posts/featured                       - Get featured posts
GET    /api/blog-posts/category/:category             - Get by category
```

### Bookings
```
POST   /api/bookings                                  - Create booking
GET    /api/bookings/reference/:reference             - Get by reference
PUT    /api/bookings/:id/status                       - Update status (admin)
```

### Newsletter
```
POST   /api/newsletter-subscriptions/subscribe        - Subscribe
POST   /api/newsletter-subscriptions/unsubscribe      - Unsubscribe
```

### Contact
```
POST   /api/contact-submissions                       - Submit contact form
```

### Wishlist (Authenticated)
```
GET    /api/wishlist?populate=*                       - Get user wishlist
POST   /api/wishlist                                  - Add to wishlist
DELETE /api/wishlist/:tourId                          - Remove from wishlist
GET    /api/wishlist/check/:tourId                    - Check if in wishlist
```

### Authentication
```
POST   /api/auth/local/register                       - Register user
POST   /api/auth/local                                - Login user
POST   /api/auth/forgot-password                      - Request password reset
POST   /api/auth/reset-password                       - Reset password
GET    /api/users/me                                  - Get current user
```

---

## Type Definitions

All TypeScript types are defined in `lib/api/strapi.ts`:

- `Tour` - Tour content type
- `Review` - Review content type
- `BlogPost` - Blog post content type
- `Booking` - Booking content type
- `User` - User type
- `WishlistItem` - Wishlist item type
- `NewsletterSubscription` - Newsletter subscription type
- `ContactSubmission` - Contact submission type
- `StrapiResponse<T>` - Generic Strapi response wrapper
- `StrapiMedia` - Media/image type
- `StrapiError` - Error response type

---

## Image Handling

### Getting Image URLs

Use the `getMediaUrl()` helper function:

```typescript
import { getMediaUrl } from '@/lib/api/strapi'

// For Strapi media objects
const imageUrl = getMediaUrl(tour.image)

// For image arrays
const galleryUrls = tour.images?.map(img => getMediaUrl(img))

// Result: http://localhost:1337/uploads/filename.jpg
```

### Image Upload in Strapi
1. Images are stored in `egyptian-tourism-backend/public/uploads/`
2. Strapi serves them at `http://localhost:1337/uploads/filename.jpg`
3. Frontend automatically prepends the Strapi URL using `NEXT_PUBLIC_STRAPI_URL`

---

## Authentication Flow

### Login
```typescript
// Client component
import strapiAPI from '@/lib/api/strapi'

const handleLogin = async (email: string, password: string) => {
  try {
    const { jwt, user } = await strapiAPI.auth.login(email, password)
    // JWT is automatically stored in localStorage
    // User can now access authenticated endpoints
  } catch (error) {
    // Handle error
  }
}
```

### Authenticated Requests
```typescript
// Wishlist example
const addToWishlist = async (tourId: number) => {
  // API client automatically includes JWT token from localStorage
  await strapiAPI.wishlist.add(tourId)
}
```

### Logout
```typescript
const handleLogout = () => {
  strapiAPI.auth.logout() // Clears JWT and user data
}
```

---

## Server vs Client Components

### Server Components (No "use client")
- Can directly call data layer functions
- Data fetching happens on the server
- Better for SEO and initial page load
- Examples: `app/page.tsx`, `app/tours/page.tsx`

### Client Components ("use client")
- For interactive features (forms, buttons, animations)
- Use API client for data operations
- Examples: `components/newsletter.tsx`, `components/wishlist-button.tsx`

---

## Testing Checklist

- [ ] Backend running on http://localhost:1337
- [ ] Frontend running on http://localhost:3000
- [ ] Admin account created
- [ ] Public permissions configured
- [ ] Sample tours added and published
- [ ] Sample reviews added and published
- [ ] Tours display on homepage
- [ ] Reviews display on homepage
- [ ] Individual tour pages load
- [ ] Newsletter subscription works
- [ ] Contact form works
- [ ] Images display correctly

---

## Troubleshooting Tips

### "Failed to fetch" errors
- Backend server is not running
- Wrong API URL in environment variables
- CORS issues (check backend CORS config)

### 403 Forbidden errors
- Public permissions not configured in Strapi
- Endpoint requires authentication but user not logged in

### No data showing
- Content not published in Strapi (check Draft vs Published)
- No data created in Strapi admin panel
- API request failing (check browser console)

### Images not loading
- `NEXT_PUBLIC_STRAPI_URL` not set correctly
- Images not uploaded in Strapi
- Upload folder permissions issue

---

**For detailed API documentation, see: `/egyptian-tourism-backend/API_DOCUMENTATION.md`**
