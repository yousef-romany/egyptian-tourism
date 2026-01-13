/**
 * Accessibility Utilities
 * Helper functions for improving accessibility throughout the application
 */

/**
 * Generate unique ID for accessibility attributes
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate ARIA labels for interactive elements
 */
export function getAriaLabel(action: string, object?: string): string {
  return object ? `${action} ${object}` : action
}

/**
 * Check if element should receive focus
 */
export function isFocusable(element: HTMLElement): boolean {
  if (!element) return false

  const focusableTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']
  const isFocusableTag = focusableTags.includes(element.tagName)
  const hasTabIndex = element.getAttribute('tabIndex') !== null
  const isDisabled = element.getAttribute('disabled') !== null

  return (isFocusableTag || hasTabIndex) && !isDisabled
}

/**
 * Trap focus within a container (for modals, dropdowns)
 */
export function trapFocus(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Skip to main content link for keyboard users
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-egyptian-gold focus:text-black focus:px-4 focus:py-2 focus:rounded"
    >
      Skip to main content
    </a>
  )
}

/**
 * Check color contrast ratio (WCAG AA: 4.5:1 for normal text, 3:1 for large text)
 */
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const lum1 = getLuminance(foreground)
  const lum2 = getLuminance(background)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Validate if color contrast meets WCAG AA standards
 */
export function isValidContrast(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Get accessible color from theme
 */
export function getAccessibleColor(bgColor: string): { light: string; dark: string } {
  const contrastWhite = getContrastRatio('#ffffff', bgColor)
  const contrastBlack = getContrastRatio('#000000', bgColor)

  return {
    light: contrastWhite >= 4.5 ? '#ffffff' : '#000000',
    dark: contrastBlack >= 4.5 ? '#000000' : '#ffffff',
  }
}

/**
 * Reduce motion for users who prefer it
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Safe animation that respects reduced motion preference
 */
export function safeAnimate(
  element: HTMLElement,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions
) {
  if (prefersReducedMotion()) {
    // Skip animation or use instant transition
    return
  }

  element.animate(keyframes, options)
}

/**
 * Check if screen reader is being used
 */
export function isScreenReaderEnabled(): boolean {
  return window.navigator.userAgent.includes('JAWS') ||
         window.navigator.userAgent.includes('NVDA') ||
         window.navigator.userAgent.includes('VOICEOVER')
}

/**
 * Get appropriate aria-current value
 */
export function getAriaCurrent(pathname: string, href: string): 'page' | boolean {
  return pathname === href ? 'page' : false
}

/**
 * Get error message for form validation
 */
export function getErrorMessage(error: string, field: string): string {
  const messages: Record<string, string> = {
    required: `${field} is required`,
    invalid: `Please enter a valid ${field.toLowerCase()}`,
    min: `${field} must be at least the minimum length`,
    max: `${field} exceeds the maximum length`,
    email: 'Please enter a valid email address',
  }

  return messages[error] || `${field} is invalid`
}

/**
 * Create visually hidden but accessible text
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

/**
 * Focus management hooks
 */
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Emit close event or callback
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isActive])
}

/**
 * Keyboard navigation helpers
 */
export const keyboard = {
  enter: 'Enter',
  space: ' ',
  escape: 'Escape',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
  tab: 'Tab',
}

/**
 * Check if key press matches keyboard key
 */
export function isKeyPress(event: KeyboardEvent, key: keyof typeof keyboard): boolean {
  return event.key === keyboard[key]
}
