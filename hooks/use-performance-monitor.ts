/**
 * Performance Monitoring Hook
 */

import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  inp?: number // Replaced FID with INP (Interaction to Next Paint)
  cls?: number
  ttfb?: number
}

export function usePerformanceMonitor() {
  const metrics = useRef<PerformanceMetrics>({})
  const hasMeasured = useRef(false)

  useEffect(() => {
    if (hasMeasured.current || typeof window === 'undefined') return

    const measureMetrics = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals')

        const logMetric = (name: string, value: number) => {
          console.log(`[Performance] ${name}:`, value)
          metrics.current[name.toLowerCase() as keyof PerformanceMetrics] = value

          // Send to analytics in production
          if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', name, {
              value: Math.round(value),
              event_category: 'Performance',
            })
          }
        }

        onCLS((metric) => logMetric('CLS', metric.value))
        onINP((metric) => logMetric('INP', metric.value)) // FID is replaced by INP in web-vitals v3+
        onFCP((metric) => logMetric('FCP', metric.value))
        onLCP((metric) => logMetric('LCP', metric.value))
        onTTFB((metric) => logMetric('TTFB', metric.value))

        hasMeasured.current = true
      } catch (error) {
        console.error('Failed to measure web vitals:', error)
      }
    }

    measureMetrics()
  }, [])

  return metrics.current
}

/**
 * Hook to measure component render time
 */
export function useRenderTime(componentName: string) {
  const renderStart = useRef<number>(0)
  const renderEnd = useRef<number>(0)

  useEffect(() => {
    renderStart.current = performance.now()

    return () => {
      renderEnd.current = performance.now()
      const duration = (renderEnd.current - renderStart.current).toFixed(2)
      console.log(`[Render Time] ${componentName}:`, duration, 'ms')

      if (parseFloat(duration) > 16) {
        console.warn(`⚠️  Slow render detected for ${componentName}:`, duration, 'ms')
      }
    }
  }, [componentName])
}

/**
 * Hook to detect slow connections
 */
export function useConnectionSpeed() {
  const [connection, setConnection] = useState<{
    effectiveType: string
    saveData: boolean
    downlink: number
  }>({
    effectiveType: '4g',
    saveData: false,
    downlink: 10,
  })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !(navigator as any).connection) {
      return
    }

    const conn = (navigator as any).connection

    const updateConnection = () => {
      setConnection({
        effectiveType: conn.effectiveType,
        saveData: conn.saveData,
        downlink: conn.downlink,
      })
    }

    updateConnection()
    conn.addEventListener('change', updateConnection)

    return () => conn.removeEventListener('change', updateConnection)
  }, [])

  const isSlow = connection.effectiveType === 'slow-2g' ||
                  connection.effectiveType === '2g' ||
                  connection.saveData ||
                  connection.downlink < 1.5

  return { ...connection, isSlow }
}
