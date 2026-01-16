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
  title: "Blog & Travel Guide - WanderLand Egypt",
  description: "Discover travel tips, Egyptian culture insights, destination guides, and insider knowledge from our expert team of Egyptologists and travel consultants.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-egyptian-gold/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-5 py-2.5 mb-8 shadow-lg">
              Travel Insights
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Egypt Travel Blog
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed">
              Expert guides, travel tips, and cultural insights to help you make the most of your Egyptian adventure
            </p>
            <EgyptianDivider className="mx-auto my-10 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Enhanced Featured Post */}
      {featuredPost && (
        <section className="container py-20 md:py-28 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          </div>

          <div className="mb-12">
            <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2 mb-4">
              Featured
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-3">Featured Article</h2>
            <p className="text-muted-foreground text-lg">Our top pick for essential reading</p>
            <EgyptianDivider className="my-6" />
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <Card className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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

      {/* Enhanced Category Filter */}
      <section className="bg-muted py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="blog-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,0 L20,20 M20,0 L0,20" stroke="#d4af37" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#blog-pattern)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge
              variant="outline"
              className="px-8 py-3 text-base font-bold cursor-pointer border-2 border-egyptian-gold bg-egyptian-gold text-black hover:bg-egyptian-gold-dark transition-all duration-300 shadow-lg"
            >
              All Posts ({posts.length})
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-8 py-3 text-base font-semibold cursor-pointer border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold hover:text-black transition-all duration-300"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Posts Grid */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="mb-16">
          <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2 mb-4">
            Recent Posts
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-3">Latest Articles</h2>
          <p className="text-muted-foreground text-lg">Stay updated with our newest travel insights and guides</p>
          <EgyptianDivider className="my-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="overflow-hidden h-full border-2 border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
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
