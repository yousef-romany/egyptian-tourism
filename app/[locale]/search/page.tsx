import { Metadata } from "next"
import { Suspense } from "react"
import SearchResults from "./search-results"

export const metadata: Metadata = {
  title: "Search Results - WanderLand Egypt",
  description: "Search for tours, blog posts, and more on WanderLand Egypt",
}

export default function SearchPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-64 bg-muted animate-pulse rounded" />
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
