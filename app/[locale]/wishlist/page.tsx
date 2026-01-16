import type { Metadata } from "next"
import WishlistClient from "./wishlist-client"

export const metadata: Metadata = {
  title: "My Wishlist - WanderLand Egypt",
  description: "View and manage your saved tours and experiences on WanderLand Egypt.",
}

export default function WishlistPage() {
  return <WishlistClient />
}

