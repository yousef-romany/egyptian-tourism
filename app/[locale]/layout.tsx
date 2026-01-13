import type React from "react"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactButton from "@/components/floating-contact-button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Breadcrumb from "@/components/breadcrumb"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { locales } from '@/i18n'

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) notFound()

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ComparisonProvider>
        <div className="flex min-h-screen flex-col">
          <div className="flex justify-end p-4">
            <LanguageSwitcher />
          </div>
          <Navbar />
          <Breadcrumb />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContactButton />
          <WhatsAppButton />
        </div>
      </ComparisonProvider>
    </NextIntlClientProvider>
  )
}