import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import ProfileClient from "./profile-client"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProfilePage')
  
  return {
    title: `${t('title')} | WanderLand Egypt`,
    description: t('subtitle'),
  }
}

export default function ProfilePage() {
  return <ProfileClient />
}

