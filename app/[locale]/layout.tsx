import type React from "react"
import type { Viewport } from "next"
import "../globals.css"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { StripeProvider } from "@/contexts/stripe-context"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { CurrencyProvider } from "@/lib/currencies/provider"
import { OrganizationJsonLd } from "@/components/tour-json-ld"
import { GoogleAnalytics } from '@next/third-parties/google'
import { GlobalErrorBoundary } from "@/components/global-error-boundary"
import { Toaster } from "@/components/ui/toaster"
import { ComparisonBar } from "@/components/comparison-bar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactButton from "@/components/floating-contact-button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Breadcrumb from "@/components/breadcrumb"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CurrencySelector } from "@/components/currency-selector"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { locales } from '@/i18n'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const heading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
})

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Await params in Next.js 15
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) notFound()

  const messages = await getMessages()

  return (
    <GlobalErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <StripeProvider>
              <ComparisonProvider>
                <CurrencyProvider>
                  <div className={`flex min-h-screen flex-col ${inter.variable} ${heading.variable} font-sans`}>
                    <div className="flex justify-end items-center gap-3 p-4">
                      <CurrencySelector />
                      <LanguageSwitcher />
                    </div>
                    <Navbar />
                    <Breadcrumb />
                    <BreadcrumbJsonLd />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <FloatingContactButton />
                    <WhatsAppButton />
                    <MobileBottomNav />
                    <PWAInstallPrompt />
                  </div>
                  <ComparisonBar />
                  <Toaster />
                  <OrganizationJsonLd />

                  {/* Google Analytics */}
                  {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                  )}
                </CurrencyProvider>
              </ComparisonProvider>
            </StripeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </AuthSessionProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  )
}