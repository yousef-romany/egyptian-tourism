import { Metadata } from 'next'
import { ProfileClient } from './profile-client'

export const metadata: Metadata = {
  title: 'My Profile | Egydise Tours',
  description: 'Manage your account, orders, and bookings',
}

export default function ProfilePage() {
  return <ProfileClient />
}
