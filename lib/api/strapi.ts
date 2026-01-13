/**
 * Strapi API Client
 * Complete API integration for Egyptian Tourism website
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// ============================================================================
// Types
// ============================================================================

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiError {
  error: {
    status: number
    name: string
    message: string
    details?: any
  }
}

export interface AuthResponse {
  jwt: string
  user: User
}

export interface User {
  id: number
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  firstName?: string
  lastName?: string
  phone?: string
  nationality?: string
  dateOfBirth?: string
  bio?: string
  avatar?: StrapiMedia
  address?: string
  city?: string
  country?: string
  postalCode?: string
  emergencyContact?: string
  emergencyPhone?: string
  dietaryRequirements?: string
  preferences?: any
  socialLinks?: any
  travelPreferences?: any
  bookings?: Booking[]
  wishlists?: WishlistItem[]
  createdAt: string
  updatedAt: string
}

export interface StrapiMedia {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats?: any
  url: string
  previewUrl?: string
  provider: string
  mime: string
  size: number
  createdAt: string
  updatedAt: string
}

export interface Tour {
  id: number
  title: string
  slug: string
  description: string
  excerpt?: string
  price: number
  priceDisplay: string
  duration: string
  location: string
  category: string
  rating: number
  reviews: number
  groupSize: string
  featured: boolean
  image?: StrapiMedia | null
  images?: StrapiMedia[] | null
  highlights?: string[]
  itinerary?: any[]
  included?: string[]
  excluded?: string[]
  faqs?: Array<{ question: string; answer: string }>
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  relatedTours?: Tour[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags?: string[]
  readTime: number
  featured: boolean
  publishedDate: string
  views: number
  image?: StrapiMedia
  author?: {
    name: string
    role: string
    avatar?: string
    bio?: string
  }
  metaTitle?: string
  metaDescription?: string
  relatedPosts?: BlogPost[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Review {
  id: number
  name: string
  location: string
  rating: number
  review: string
  date: string
  platform: 'tripadvisor' | 'viator' | 'klook'
  tourName?: string
  tour?: Tour
  verified: boolean
  featured: boolean
  avatar?: string
  helpfulCount: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Booking {
  id: number
  bookingReference: string
  tourName: string
  tour?: Tour
  user?: User
  customerName: string
  email: string
  phone: string
  numberOfPeople: number
  tourDate: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  nationality?: string
  hotelName?: string
  flightDetails?: string
  dietaryRequirements?: string
  emergencyContact?: string
  notes?: string
  bookingDate: string
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: number
  user: User
  tour: Tour
  notes?: string
  addedAt: string
  createdAt: string
  updatedAt: string
}

export interface NewsletterSubscription {
  id: number
  email: string
  subscribed: boolean
  subscribedAt?: string
  unsubscribedAt?: string
  source?: string
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved'
  replied: boolean
  submittedAt: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BlogComment {
  id: number
  content: string
  author: string
  email: string
  post?: BlogPost
  parent?: BlogComment
  replies?: BlogComment[]
  user?: User
  status: 'pending' | 'approved' | 'rejected' | 'spam'
  ipAddress?: string
  userAgent?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: number
  customerName: string
  customerPhoto?: StrapiMedia
  customerLocation?: string
  story: string
  tourName?: string
  tour?: Tour
  rating: number
  featured: boolean
  date: string
  tripDate?: string
  verified: boolean
  images?: StrapiMedia[]
  videoUrl?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface PromoCode {
  id: number
  code: string
  description?: string
  discountType: 'percentage' | 'fixed' | 'free_addon'
  discountValue?: number
  freeAddOn?: string
  validFrom: string
  validUntil: string
  usageLimit: number
  usedCount: number
  minBookingAmount: number
  maxDiscountAmount?: number
  applicableTours?: number[]
  active: boolean
  singleUse: boolean
  createdAt: string
  updatedAt: string
}

export interface PromoCodeValidation {
  valid: boolean
  message?: string
  discountType?: 'percentage' | 'fixed' | 'free_addon'
  discountAmount?: number
  discountText?: string
  code?: string
  description?: string
  promoCodeId?: number
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get JWT token from localStorage
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('jwt')
}

/**
 * Set JWT token in localStorage
 */
function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('jwt', token)
}

/**
 * Remove JWT token from localStorage
 */
function removeToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('jwt')
  localStorage.removeItem('user')
}

/**
 * Get user data from localStorage
 */
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

/**
 * Set user data in localStorage
 */
function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * Build query string from params
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

/**
 * Fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error: StrapiError = await response.json().catch(() => ({
      error: {
        status: response.status,
        name: 'FetchError',
        message: response.statusText,
      },
    }))
    throw error
  }

  return response.json()
}

/**
 * Get media URL (handles relative and absolute URLs)
 */
export function getMediaUrl(media?: StrapiMedia | string): string {
  if (!media) return '/placeholder.svg'

  if (typeof media === 'string') {
    return media.startsWith('http') ? media : `${STRAPI_URL}${media}`
  }

  return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`
}

/**
 * Transform Strapi v4 response data to flat structure
 * Strapi v4 returns: { id, attributes: { ... } }
 * We need: { id, ... }
 */
function transformStrapiData<T extends Record<string, any>>(data: any): T {
  if (!data) return data

  // If it's an array, transform each item
  if (Array.isArray(data)) {
    return data.map(item => transformStrapiData(item)) as any
  }

  // If it has attributes, flatten it
  if (data.attributes) {
    const { attributes, id } = data
    const transformed: any = { id }

    // Transform attributes
    for (const [key, value] of Object.entries(attributes)) {
      // Handle Strapi media format: { data: {...} } or { data: null }
      if (value && typeof value === 'object' && 'data' in value) {
        if (value.data === null) {
          transformed[key] = null
        } else if (Array.isArray(value.data)) {
          // Multiple media items
          transformed[key] = value.data.map((item: any) => transformStrapiData(item))
        } else {
          // Single media item
          transformed[key] = transformStrapiData(value.data)
        }
      } else {
        transformed[key] = value
      }
    }

    return transformed as T
  }

  // Already flat or simple value
  return data
}

// ============================================================================
// Authentication API
// ============================================================================

export const auth = {
  /**
   * Register new user
   */
  async register(data: {
    username: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    phone?: string
    nationality?: string
  }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw error
    }

    const authData: AuthResponse = await response.json()
    setToken(authData.jwt)
    setStoredUser(authData.user)
    return authData
  },

  /**
   * Login user
   */
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw error
    }

    const authData: AuthResponse = await response.json()
    setToken(authData.jwt)
    setStoredUser(authData.user)
    return authData
  },

  /**
   * Logout user
   */
  logout(): void {
    removeToken()
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getToken()
  },

  /**
   * Get current user
   */
  async getMe(): Promise<User> {
    const user = await apiFetch<User>('/users/me')
    setStoredUser(user)
    return user
  },

  /**
   * Forgot password - request reset
   */
  async forgotPassword(email: string): Promise<{ ok: boolean }> {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  /**
   * Reset password with token
   */
  async resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ): Promise<AuthResponse> {
    const authData = await apiFetch<AuthResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ code, password, passwordConfirmation }),
    })
    setToken(authData.jwt)
    setStoredUser(authData.user)
    return authData
  },
}

// ============================================================================
// User Profile API
// ============================================================================

export const profile = {
  /**
   * Get current user profile with relations
   */
  async get(): Promise<User> {
    return apiFetch<User>('/users/me')
  },

  /**
   * Update profile
   */
  async update(data: Partial<User>): Promise<User> {
    const user = await apiFetch<User>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    setStoredUser(user)
    return user
  },

  /**
   * Update email
   */
  async updateEmail(newEmail: string, password: string): Promise<User> {
    const user = await apiFetch<User>('/users/me/email', {
      method: 'PUT',
      body: JSON.stringify({ email: newEmail, password }),
    })
    setStoredUser(user)
    return user
  },

  /**
   * Change password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    return apiFetch('/users/me/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },

  /**
   * Delete account
   */
  async deleteAccount(password: string): Promise<{ message: string }> {
    const result = await apiFetch<{ message: string }>('/users/me', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    })
    removeToken()
    return result
  },

  /**
   * Get user bookings
   */
  async getBookings(): Promise<Booking[]> {
    const response = await apiFetch<StrapiResponse<Booking[]>>('/users/me/bookings')
    return response.data
  },
}

// ============================================================================
// Tours API
// ============================================================================

export const tours = {
  /**
   * Get all tours
   */
  async getAll(params?: {
    category?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
    sort?: string
    page?: number
    pageSize?: number
    locale?: string
  }): Promise<{ data: Tour[]; meta?: any }> {
    const query = params ? buildQueryString({ ...params, populate: '*' }) : '?populate=*'
    const response = await apiFetch<StrapiResponse<any[]>>(`/tours${query}`)
    return {
      data: transformStrapiData<Tour[]>(response.data),
      meta: response.meta
    }
  },

  /**
   * Get tour by ID
   */
  async getById(id: number, locale?: string): Promise<Tour> {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiFetch<StrapiResponse<any>>(`/tours/${id}?populate=*${localeParam}`)
    return transformStrapiData<Tour>(response.data)
  },

  /**
   * Get tour by slug
   */
  async getBySlug(slug: string, locale?: string): Promise<Tour> {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiFetch<StrapiResponse<any>>(`/tours/${slug}?populate=*${localeParam}`)
    return transformStrapiData<Tour>(response.data)
  },

  /**
   * Get featured tours
   */
  async getFeatured(limit?: number, locale?: string): Promise<Tour[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[featured][$eq]': 'true',
    })
    if (limit) params.append('pagination[pageSize]', String(limit))
    if (locale) params.append('locale', locale)

    const response = await apiFetch<StrapiResponse<any[]>>(`/tours?${params.toString()}`)
    return transformStrapiData<Tour[]>(response.data)
  },
}

// ============================================================================
// Blog API
// ============================================================================

export const blog = {
  /**
   * Get all blog posts
   */
  async getAll(params?: {
    category?: string
    featured?: boolean
    sort?: string
    page?: number
    pageSize?: number
    locale?: string
  }): Promise<{ data: BlogPost[]; meta?: any }> {
    const query = params ? buildQueryString({ ...params, populate: '*' }) : '?populate=*'
    const response = await apiFetch<StrapiResponse<any[]>>(`/blog-posts${query}`)
    return {
      data: transformStrapiData<BlogPost[]>(response.data),
      meta: response.meta
    }
  },

  /**
   * Get blog post by ID
   */
  async getById(id: number, locale?: string): Promise<BlogPost> {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiFetch<StrapiResponse<any>>(`/blog-posts/${id}?populate=*${localeParam}`)
    return transformStrapiData<BlogPost>(response.data)
  },

  /**
   * Get blog post by slug (increments views)
   */
  async getBySlug(slug: string, locale?: string): Promise<BlogPost> {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiFetch<StrapiResponse<any>>(`/blog-posts/${slug}?populate=*${localeParam}`)
    return transformStrapiData<BlogPost>(response.data)
  },

  /**
   * Get featured blog posts
   */
  async getFeatured(limit?: number, locale?: string): Promise<BlogPost[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[featured][$eq]': 'true',
    })
    if (limit) params.append('pagination[pageSize]', String(limit))
    if (locale) params.append('locale', locale)
    if (limit) params.append('pagination[pageSize]', String(limit))

    const response = await apiFetch<StrapiResponse<any[]>>(`/blog-posts?${params.toString()}`)
    return transformStrapiData<BlogPost[]>(response.data)
  },

  /**
   * Get blog posts by category
   */
  async getByCategory(category: string, limit?: number): Promise<BlogPost[]> {
    const query = limit ? `?limit=${limit}` : ''
    const response = await apiFetch<StrapiResponse<BlogPost[]>>(
      `/blog-posts/category/${category}${query}`
    )
    return response.data
  },
}

// ============================================================================
// Reviews API
// ============================================================================

export const reviews = {
  /**
   * Get all reviews
   */
  async getAll(params?: {
    platform?: string
    featured?: boolean
    sort?: string
    page?: number
    pageSize?: number
    locale?: string
  }): Promise<{ data: Review[]; meta?: any }> {
    const query = params ? buildQueryString({ ...params, populate: '*' }) : '?populate=*'
    const response = await apiFetch<StrapiResponse<any[]>>(`/reviews${query}`)
    return {
      data: transformStrapiData<Review[]>(response.data),
      meta: response.meta
    }
  },

  /**
   * Get featured reviews
   */
  async getFeatured(limit?: number, locale?: string): Promise<Review[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[featured][$eq]': 'true',
    })
    if (limit) params.append('pagination[pageSize]', String(limit))
    if (locale) params.append('locale', locale)

    const response = await apiFetch<StrapiResponse<any[]>>(`/reviews?${params.toString()}`)
    return transformStrapiData<Review[]>(response.data)
  },

  /**
   * Get reviews by platform
   */
  async getByPlatform(platform: 'tripadvisor' | 'viator' | 'klook', locale?: string): Promise<Review[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[platform][$eq]': platform,
    })
    if (locale) params.append('locale', locale)
    const response = await apiFetch<StrapiResponse<any[]>>(`/reviews?${params.toString()}`)
    return transformStrapiData<Review[]>(response.data)
  },

  /**
   * Get review statistics
   */
  async getStats(): Promise<{
    totalReviews: number
    averageRating: number
    platformStats: Array<{ platform: string; count: number; avgRating: number }>
  }> {
    return apiFetch(`/reviews/stats`)
  },
}

// ============================================================================
// Bookings API
// ============================================================================

export const bookings = {
  /**
   * Create a new booking
   */
  async create(data: {
    tourName: string
    tour?: number
    customerName: string
    email: string
    phone: string
    numberOfPeople: number
    tourDate: string
    totalPrice: number
    specialRequests?: string
    nationality?: string
    hotelName?: string
    dietaryRequirements?: string
    emergencyContact?: string
  }): Promise<Booking> {
    const response = await apiFetch<StrapiResponse<Booking>>('/bookings', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
    return response.data
  },

  /**
   * Get booking by reference number
   */
  async getByReference(reference: string): Promise<Booking> {
    const response = await apiFetch<StrapiResponse<Booking>>(
      `/bookings/reference/${reference}?populate=*`
    )
    return response.data
  },

  /**
   * Update booking status (admin only)
   */
  async updateStatus(
    id: number,
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  ): Promise<Booking> {
    const response = await apiFetch<StrapiResponse<Booking>>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
    return response.data
  },
}

// ============================================================================
// Testimonials API
// ============================================================================

export const testimonials = {
  /**
   * Get all testimonials
   */
  async getAll(params?: {
    locale?: string
    featured?: boolean
    sort?: string
    page?: number
    pageSize?: number
  }): Promise<{ data: Testimonial[]; meta?: any }> {
    const query = params ? buildQueryString({ ...params, populate: '*' }) : '?populate=*'
    const response = await apiFetch<StrapiResponse<any[]>>(`/testimonials${query}`)
    return {
      data: transformStrapiData<Testimonial[]>(response.data),
      meta: response.meta
    }
  },

  /**
   * Get featured testimonials
   */
  async getFeatured(locale?: string, limit?: number): Promise<Testimonial[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[featured][$eq]': 'true',
    })
    if (limit) params.append('pagination[pageSize]', String(limit))
    if (locale) params.append('locale', locale)

    const response = await apiFetch<StrapiResponse<any[]>>(`/testimonials?${params.toString()}`)
    return transformStrapiData<Testimonial[]>(response.data)
  },

  /**
   * Get testimonials by tour
   */
  async getByTour(tourId: number, locale?: string): Promise<Testimonial[]> {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[tour][$eq]': String(tourId),
    })
    if (locale) params.append('locale', locale)

    const response = await apiFetch<StrapiResponse<any[]>>(`/testimonials?${params.toString()}`)
    return transformStrapiData<Testimonial[]>(response.data)
  },
}

// ============================================================================
// Promo Codes API
// ============================================================================

export const promoCodes = {
  /**
   * Validate promo code
   */
  async validate(data: {
    code: string
    bookingAmount: number
    tourId?: number
  }): Promise<PromoCodeValidation> {
    return apiFetch<PromoCodeValidation>('/promo-codes/validate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// Wishlist API
// ============================================================================

export const wishlist = {
  /**
   * Get user's wishlist
   */
  async get(): Promise<WishlistItem[]> {
    const response = await apiFetch<StrapiResponse<WishlistItem[]>>('/wishlist?populate=*')
    return response.data
  },

  /**
   * Add tour to wishlist
   */
  async add(tourId: number, notes?: string): Promise<WishlistItem> {
    const response = await apiFetch<StrapiResponse<WishlistItem>>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ tourId, notes }),
    })
    return response.data
  },

  /**
   * Remove tour from wishlist
   */
  async remove(tourId: number): Promise<{ message: string }> {
    return apiFetch(`/wishlist/${tourId}`, {
      method: 'DELETE',
    })
  },

  /**
   * Check if tour is in wishlist
   */
  async check(tourId: number): Promise<{ inWishlist: boolean }> {
    return apiFetch(`/wishlist/check/${tourId}`)
  },
}

// ============================================================================
// Newsletter API
// ============================================================================

export const newsletter = {
  /**
   * Subscribe to newsletter
   */
  async subscribe(email: string, source?: string): Promise<NewsletterSubscription> {
    const response = await apiFetch<StrapiResponse<NewsletterSubscription>>(
      '/newsletter-subscriptions/subscribe',
      {
        method: 'POST',
        body: JSON.stringify({ email, source }),
      }
    )
    return response.data
  },

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<{ message: string }> {
    return apiFetch('/newsletter-subscriptions/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}

// ============================================================================
// Contact API
// ============================================================================

export const contact = {
  /**
   * Submit contact form
   */
  async submit(data: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }): Promise<ContactSubmission> {
    const response = await apiFetch<StrapiResponse<ContactSubmission>>('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
    return response.data
  },
}

// ============================================================================
// Blog Comments API
// ============================================================================

export const blogComments = {
  /**
   * Get approved comments for a blog post
   */
  async getByPost(postId: number, page: number = 1, limit: number = 10): Promise<{ data: BlogComment[]; meta: any }> {
    const response = await apiFetch<{ data: BlogComment[]; meta: any }>(
      `/blog-comments/post/${postId}?page=${page}&limit=${limit}`
    )
    return response
  },

  /**
   * Get comment count for a post
   */
  async getCountByPost(postId: number): Promise<number> {
    const response = await apiFetch<{ data: { count: number } }>(`/blog-comments/count/${postId}`)
    return response.data.count
  },

  /**
   * Submit a comment (requires authentication)
   */
  async submit(data: {
    content: string
    author: string
    email: string
    postId: number
    parentId?: number
  }): Promise<{ data: BlogComment; message: string }> {
    return apiFetch('/blog-comments/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Moderate a comment (admin only)
   */
  async moderate(commentId: number, status: 'approved' | 'rejected' | 'spam'): Promise<BlogComment> {
    const response = await apiFetch<{ data: BlogComment }>(`/blog-comments/${commentId}/moderate`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    })
    return response.data
  },
}

// ============================================================================
// Admin Dashboard API
// ============================================================================

export const adminDashboard = {
  /**
   * Get dashboard overview statistics
   */
  async getOverview(): Promise<any> {
    const response = await apiFetch<{ data: any }>('/admin-dashboard/overview')
    return response.data
  },

  /**
   * Get sales analytics
   */
  async getSalesAnalytics(startDate?: string, endDate?: string): Promise<any> {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const query = params.toString() ? `?${params.toString()}` : ''
    const response = await apiFetch<{ data: any }>(`/admin-dashboard/sales${query}`)
    return response.data
  },

  /**
   * Get bookings with pagination and filters
   */
  async getBookings(page: number = 1, limit: number = 10, status?: string, search?: string): Promise<any> {
    const params = new URLSearchParams()
    params.append('page', String(page))
    params.append('limit', String(limit))
    if (status) params.append('status', status)
    if (search) params.append('search', search)
    return apiFetch(`/admin-dashboard/bookings?${params.toString()}`)
  },

  /**
   * Get top performing tours
   */
  async getTopTours(limit: number = 10): Promise<any> {
    const response = await apiFetch<{ data: any }>(`/admin-dashboard/top-tours?limit=${limit}`)
    return response.data
  },

  /**
   * Get customer insights
   */
  async getCustomers(): Promise<any> {
    const response = await apiFetch<{ data: any }>('/admin-dashboard/customers')
    return response.data
  },

  /**
   * Get revenue chart data
   */
  async getRevenueChart(period: number = 30): Promise<any> {
    const response = await apiFetch<{ data: any }>(`/admin-dashboard/revenue-chart?period=${period}`)
    return response.data
  },

  /**
   * Get booking stats distribution
   */
  async getBookingStats(): Promise<any> {
    const response = await apiFetch<{ data: any }>('/admin-dashboard/booking-stats')
    return response.data
  },
}

// ============================================================================
// Default Export
// ============================================================================

const strapiAPI = {
  auth,
  profile,
  tours,
  blog,
  reviews,
  bookings,
  wishlist,
  newsletter,
  contact,
  blogComments,
  testimonials,
  promoCodes,
  adminDashboard,
  getMediaUrl,
  getStoredUser,
}

export default strapiAPI
