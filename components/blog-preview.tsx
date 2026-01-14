import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import { getFeaturedPosts } from "@/lib/data/blog"

export default async function BlogPreview() {
  let featuredPosts = []

  try {
    featuredPosts = await getFeaturedPosts(3)
  } catch (error) {
    console.error('Failed to fetch featured blog posts:', error)
    // Return empty section if no posts available
    return null
  }

  // Don't render if no posts
  if (!featuredPosts || featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="container py-20 md:py-28">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
            <BookOpen className="h-4 w-4" />
            Travel Insights
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          Latest from Our Blog
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert travel tips, cultural insights, and destination guides to enhance your Egyptian adventure
        </p>
        <EgyptianDivider className="mx-auto my-8" />
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <Card className="overflow-hidden h-full border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 left-4 bg-egyptian-gold text-black font-bold">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-egyptian-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-egyptian-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Link href="/blog" className="inline-flex items-center gap-2">
            View All Articles
            <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
