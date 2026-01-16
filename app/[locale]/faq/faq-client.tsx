"use client"

import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { FAQAccordionEnhanced } from './faq-accordion-enhanced'
import { Loader2 } from 'lucide-react'

export default function FAQClient() {
  const t = useTranslations('FAQ')

  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories and FAQ Content */}
        <Suspense fallback={<div className="grid gap-8 mt-8">{Array(6).fill(null).map((_, i) => (
          <div key={i} className="h-32 bg-muted/20 rounded-lg animate-pulse" />
        ))}</div>}>
          <FAQAccordionEnhanced />
        </Suspense>
      </div>
    </div>
  )
}