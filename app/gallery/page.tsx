import type { Metadata } from "next"
import GalleryClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Photo Gallery - Egydise Tours",
  description: "Explore stunning photos of Egypt's iconic landmarks, ancient pyramids, temples, and cultural treasures. A visual journey through 5,000 years of history.",
}

export default function GalleryPage() {
  return <GalleryClient />
}
