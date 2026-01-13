"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Search, Loader2, FileText, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import strapiAPI from "@/lib/api/strapi"
import type { Tour, BlogPost } from "@/lib/api/strapi"
import Link from "next/link"
import Image from "next/image"
import { getMediaUrl } from "@/lib/api/strapi"
import { Star, Clock } from "lucide-react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [tours, setTours] = useState<Tour[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setIsLoading(false)
      return
    }

    const performSearch = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Search tours and blog posts in parallel
        const [toursResult, blogsResult] = await Promise.all([
          strapiAPI.tours.getAll({
            populate: "image",
            filters: {
              $or: [
                { title: { $containsi: query } },
                { description: { $containsi: query } },
                { location: { $containsi: query } },
              ],
            },
          }),
          strapiAPI.blog.getAll({
            populate: "coverImage,author",
            filters: {
              $or: [
                { title: { $containsi: query } },
                { excerpt: { $containsi: query } },
                { content: { $containsi: query } },
              ],
            },
          }),
        ])

        setTours(toursResult.data)
        setBlogPosts(blogsResult.data)
      } catch (err) {
        console.error("Search error:", err)
        setError("An error occurred while searching. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [query])

  const totalResults = tours.length + blogPosts.length

  if (!query) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Search Egydise Tours</h2>
        <p className="text-muted-foreground">
          Enter a search term to find tours, blog posts, and more
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-egyptian-gold mx-auto mb-4" />
        <p className="text-muted-foreground">Searching for "{query}"...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-500/20 bg-red-50 dark:bg-red-950/20">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? "s" : ""}
        </p>
      </div>

      {/* No Results */}
      {totalResults === 0 && (
        <Card className="border-egyptian-gold/20">
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find anything matching "{query}". Try different keywords or browse our tours.
            </p>
            <Link href="/tours">
              <button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white px-6 py-2 rounded-md font-semibold">
                Browse All Tours
              </button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Results Tabs */}
      {totalResults > 0 && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All Results ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="tours">
              Tours ({tours.length})
            </TabsTrigger>
            <TabsTrigger value="blog">
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
          </TabsList>

          {/* All Results */}
          <TabsContent value="all" className="space-y-8 mt-6">
            {tours.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-egyptian-gold" />
                  Tours
                </h2>
                <TourResults tours={tours} />
              </div>
            )}

            {blogPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-egyptian-gold" />
                  Blog Posts
                </h2>
                <BlogResults posts={blogPosts} />
              </div>
            )}
          </TabsContent>

          {/* Tours Only */}
          <TabsContent value="tours" className="mt-6">
            {tours.length > 0 ? (
              <TourResults tours={tours} />
            ) : (
              <p className="text-center text-muted-foreground py-8">No tours found</p>
            )}
          </TabsContent>

          {/* Blog Posts Only */}
          <TabsContent value="blog" className="mt-6">
            {blogPosts.length > 0 ? (
              <BlogResults posts={blogPosts} />
            ) : (
              <p className="text-center text-muted-foreground py-8">No blog posts found</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function TourResults({ tours }: { tours: Tour[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <Link key={tour.id} href={`/tours/${tour.slug}`}>
          <Card className="h-full overflow-hidden border-egyptian-gold/30 hover:border-egyptian-gold transition-all hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src={getMediaUrl(tour.image)}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-egyptian-gold text-white">
                {tour.priceDisplay || tour.price}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{tour.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {tour.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-muted-foreground">({tour.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {tour.duration}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function BlogResults({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="h-full overflow-hidden border-egyptian-gold/30 hover:border-egyptian-gold transition-all hover:shadow-lg">
            <div className="flex gap-4 p-4">
              {post.coverImage && (
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={getMediaUrl(post.coverImage)}
                    alt={post.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  {post.category && (
                    <>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
