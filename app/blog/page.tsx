import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { getAllPosts, getAllCategories } from "@/lib/data/blog"

export const metadata: Metadata = {
  title: "Blog & Travel Guide - Egydise Tours",
  description: "Discover travel tips, Egyptian culture insights, destination guides, and insider knowledge from our expert team of Egyptologists and travel consultants.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Travel Insights
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Egypt Travel Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Expert guides, travel tips, and cultural insights to help you make the most of your Egyptian adventure
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container py-16 md:py-20">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold mb-2">Featured Article</h2>
            <p className="text-muted-foreground">Our top pick for essential reading</p>
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <Card className="overflow-hidden border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-egyptian-gold text-black font-bold">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4 border-egyptian-gold/50 text-egyptian-gold">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 group-hover:text-egyptian-gold transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-egyptian-gold font-semibold group-hover:gap-4 transition-all">
                    Read Article
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </section>
      )}

      {/* Category Filter */}
      <section className="bg-muted py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant="outline"
              className="px-6 py-2 text-base cursor-pointer border-egyptian-gold bg-egyptian-gold text-black hover:bg-egyptian-gold-dark transition-colors"
            >
              All Posts ({posts.length})
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-6 py-2 text-base cursor-pointer border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="container py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-2">Latest Articles</h2>
          <p className="text-muted-foreground">Stay updated with our newest travel insights and guides</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="overflow-hidden h-full border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-egyptian-gold/30">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-egyptian-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
