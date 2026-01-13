/**
 * Image Optimization Utilities
 */

/**
 * Generate responsive image srcset
 */
export function generateSrcset(
  baseUrl: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return sizes
    .map((size) => `${baseUrl}?w=${size} ${size}w`)
    .join(', ')
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  // Create a tiny blurred placeholder
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Fill with semi-transparent gray
    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
    ctx.fillRect(0, 0, width, height)
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): boolean {
  if (typeof document === 'undefined') return false

  const canvas = document.createElement('canvas')
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
}

/**
 * Get optimized image format
 */
export function getOptimizedFormat(originalFormat: string): 'webp' | 'jpg' | 'png' {
  return supportsWebP() ? 'webp' : (originalFormat === 'png' ? 'png' : 'jpg')
}

/**
 * Calculate aspect ratio
 */
export function getAspectRatio(width: number, height: number): number {
  return width / height
}

/**
 * Get dimensions for aspect ratio
 */
export function getDimensionsForAspectRatio(
  aspectRatio: number,
  width: number
): { width: number; height: number } {
  return {
    width,
    height: Math.round(width / aspectRatio),
  }
}
