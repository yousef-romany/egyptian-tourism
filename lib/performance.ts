/**
 * Performance Optimization Utilities
 * Helper functions for monitoring and optimizing performance
 */

/**
 * Measure Web Vitals
 */
export function measureWebVitals() {
  if (typeof window === 'undefined') return

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP measurement not supported')
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.warn('FID measurement not supported')
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    try {
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            console.log('CLS:', clsValue)
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.warn('CLS measurement not supported')
    }
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')

        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      }
    })
  })

  const images = document.querySelectorAll('img[data-src]')
  images.forEach((img) => imageObserver.observe(img))
}

/**
 * Prefetch links on hover
 */
export function prefetchLinks() {
  if (typeof window === 'undefined') return

  const prefetchLinks = document.querySelectorAll('a[data-prefetch]')

  prefetchLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href')
      if (href) {
        const prefetchLink = document.createElement('link')
        prefetchLink.rel = 'prefetch'
        prefetchLink.href = href
        document.head.appendChild(prefetchLink)
      }
    }, { once: true })
  })
}

/**
 * Detect if user is on slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return false
  }

  const connection = (navigator as any).connection
  return (
    connection.saveData ||
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g'
  )
}

/**
 * Get connection speed
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'fast'
  }

  const connection = (navigator as any).connection

  if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return 'slow'
  }

  if (connection.effectiveType === '3g') {
    return 'medium'
  }

  return 'fast'
}

/**
 * Load scripts asynchronously
 */
export function loadScript(src: string, async = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = async
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/**
 * Load CSS asynchronously
 */
export function loadCSS(href: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.media = 'print'
  link.onload = () => {
    link.media = 'all'
  }
  document.head.appendChild(link)
}

/**
 * Optimize images by serving WebP when supported
 */
export function getOptimizedImageUrl(originalUrl: string): string {
  if (typeof document === 'undefined') return originalUrl

  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0

  if (supportsWebP) {
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }

  return originalUrl
}

/**
 * Cache API responses with IndexedDB
 */
export class CacheManager {
  private dbName = 'egyptian-tours-cache'
  private storeName = 'api-responses'
  private db: IDBDatabase | null = null

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName)
        }
      }
    })
  }

  async get(key: string): Promise<any> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async set(key: string, value: any, ttl = 3600000) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)

      const data = {
        key,
        value,
        expires: Date.now() + ttl,
      }

      const request = store.put(data)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async delete(key: string) {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async clear() {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }
}

/**
 * Service worker registration for offline support
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined') return

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('SW registered: ', registration)
        },
        (registrationError) => {
          console.log('SW registration failed: ', registrationError)
        }
      )
    })
  }
}

/**
 * Measure component render time
 */
export function useRenderTime(componentName: string) {
  useEffect(() => {
    const start = performance.now()

    return () => {
      const end = performance.now()
      console.log(`${componentName} render time:`, end - start, 'ms')
    }
  }, [componentName])
}

/**
 * Virtual scroll helper for large lists
 */
export function getVisibleRange({
  scrollTop,
  containerHeight,
  itemHeight,
  totalItems,
}: {
  scrollTop: number
  containerHeight: number
  itemHeight: number
  totalItems: number
}) {
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    totalItems - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight)
  )

  const overscan = 3 // Number of items to render above/below viewport

  return {
    start: Math.max(0, startIndex - overscan),
    end: Math.min(totalItems - 1, endIndex + overscan),
  }
}

/**
 * Memory leak prevention helper
 */
export function cleanupOnUnmount(ref: React.MutableRefObject<any>) {
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current = null
      }
    }
  }, [ref])
}

/**
 * Batch state updates for performance
 */
export function batchUpdates(updates: Array<() => void>) {
  updates.forEach((update) => update())
}

/**
 * Detect low-end devices for feature degradation
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  const hardwareConcurrency = navigator.hardwareConcurrency || 2
  const deviceMemory = (navigator as any).deviceMemory || 4

  return hardwareConcurrency <= 2 || deviceMemory <= 2
}

/**
 * Optimize animations based on device capability
 */
export function getAnimationDuration(): 'short' | 'normal' | 'long' {
  if (isLowEndDevice() || isSlowConnection()) {
    return 'short'
  }
  return 'normal'
}
