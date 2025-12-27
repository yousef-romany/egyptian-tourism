import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import Breadcrumb from "@/components/breadcrumb"
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/data/blog"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all blog posts (SSG)
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found - Egydise Tours",
    }
  }

  return {
    title: `${post.title} - Egydise Tours Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)
  const shareUrl = `https://egydisetours.com/blog/${params.slug}`

  return (
    <div className="flex min-h-screen flex-col">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <Breadcrumb />
        </div>
      </div>

      {/* Article Header */}
      <article className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-egyptian-gold hover:text-egyptian-gold-dark mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-egyptian-gold text-black font-bold text-sm">
              {post.category}
            </Badge>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="border-egyptian-gold/50">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2 prose-a:text-egyptian-gold hover:prose-a:text-egyptian-gold-dark prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>

          <EgyptianDivider className="my-12" />

          {/* Share Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-8 border-y">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Share this article:</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
              >
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors"
              >
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors"
              >
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          <Card className="mt-12 border-egyptian-gold/30">
            <CardContent className="p-8">
              <div className="flex gap-6 items-start">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">About {post.author.name}</h3>
                  <p className="text-egyptian-gold mb-3">{post.author.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.author.name} is a passionate expert in Egyptian tourism with years of experience
                    helping travelers discover the wonders of Egypt. Their insights have helped thousands
                    of visitors make the most of their Egyptian adventures.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted py-16 md:py-20">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <Card className="overflow-hidden h-full border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <Badge className="absolute top-4 left-4 bg-egyptian-gold text-black font-bold">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-egyptian-gold transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Newsletter />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.publishedAt,
            "dateModified": post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "jobTitle": post.author.role,
            },
            "publisher": {
              "@type": "Organization",
              "name": "Egydise Tours",
              "logo": {
                "@type": "ImageObject",
                "url": "https://egydisetours.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": shareUrl
            },
            "keywords": post.tags.join(", "),
            "articleSection": post.category,
            "wordCount": post.content.split(/\s+/).length,
          })
        }}
      />
    </div>
  )
}
