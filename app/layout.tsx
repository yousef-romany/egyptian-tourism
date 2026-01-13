import type React from "react"
import type { Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { StripeProvider } from "@/contexts/stripe-context"
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1e35' }
  ],
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
      </head>
      <body className={`${inter.variable} ${heading.variable} font-sans`}>
        <GlobalErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <StripeProvider>
                {children}
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
