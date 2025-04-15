import type { Metadata } from "next"
import ProfileClient from "./profile-client"

export const metadata: Metadata = {
  title: "My Profile - Egydise Tours",
  description: "Manage your profile, bookings, and preferences on Egydise Tours.",
}

export default function ProfilePage() {
  return <ProfileClient />
}

