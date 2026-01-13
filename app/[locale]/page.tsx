import { useTranslations } from 'next-intl'
import ToursPage from '@/app/tours/page'

export default function LocalizedToursPage() {
  const t = useTranslations('ToursPage')

  return <ToursPage />
}