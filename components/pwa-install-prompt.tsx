'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed bottom-20 left-4 right-4 z-50 lg:bottom-4 lg:left-auto lg:right-4 lg:max-w-sm',
        'bg-background border-2 border-egyptian-gold rounded-xl shadow-2xl p-4',
        'animate-in slide-in-from-bottom-4 fade-in duration-300'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1 text-egyptian-gold">Install App</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Install Egydise Tours for a better experience. Access tours offline and get faster loading.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Install Now
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
            >
              Maybe Later
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}