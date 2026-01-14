import type { Metadata } from "next"
import WishlistClient from "./wishlist-client"

export const metadata: Metadata = {
  title: "My Wishlist - Egydise Tours",
  description: "View and manage your saved tours and experiences on Egydise Tours.",
}

export default function WishlistPage() {
  return <WishlistClient />
}

