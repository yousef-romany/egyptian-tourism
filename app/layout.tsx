import type React from "react"
import type { Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { StripeProvider } from "@/contexts/stripe-context"
import { CurrencyProvider } from "@/lib/currencies/provider"
import { OrganizationJsonLd } from "@/components/tour-json-ld"
import { defaultMetadata } from "@/lib/metadata"
import { GoogleAnalytics } from '@next/third-parties/google'
import { GlobalErrorBoundary } from "@/components/global-error-boundary"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const heading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4af37' },
    { media: '(prefers-color-scheme: dark)', color: '#d4af37' }
  ],
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="WanderLand Egypt" />
      </head>
      <body className={`${inter.variable} ${heading.variable} font-sans`}>
        <GlobalErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <StripeProvider>
                <CurrencyProvider>
                  {children}
                </CurrencyProvider>
              </StripeProvider>
            </AuthProvider>
          </ThemeProvider>
        </GlobalErrorBoundary>
        <Toaster />

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      </body>
    </html>
  )
}
