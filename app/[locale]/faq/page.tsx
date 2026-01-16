import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import FAQClient from './faq-client'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('FAQ')
  
  return {
    title: `${t('title')} | WanderLand Egypt`,
    description: t('subtitle'),
  }
}

export default function FAQPage() {
  return <FAQClient />
}
