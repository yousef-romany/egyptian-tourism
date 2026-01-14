import { Metadata } from "next"
import strapiAPI from "@/lib/api/strapi"
import { TestimonialCard } from "@/components/testimonial-card"
import { VideoTestimonial } from "@/components/video-testimonial"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, Video, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Customer Stories & Testimonials - Egydise Tours",
  description: "Read real stories from travelers who experienced the magic of Egypt with Egydise Tours. Verified reviews, photos, and videos from our satisfied customers.",
}

export default async function TestimonialsPage() {
  // Fetch testimonials from Strapi
  let testimonials = []
  let error = null

  try {
    const result = await strapiAPI.testimonials.getAll({
      populate: "customerPhoto,images,tour",
      sort: "featured:desc,date:desc",
    })
    testimonials = result.data
  } catch (err) {
    console.error("Failed to fetch testimonials:", err)
    error = "Unable to load testimonials. Please try again later."
  }

  // Separate photo and video testimonials
  const photoTestimonials = testimonials.filter(t => !t.videoUrl)
  const videoTestimonials = testimonials.filter(t => t.videoUrl)

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-egyptian-gold/20 mb-4">
            <Quote className="h-8 w-8 text-egyptian-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-egyptian-gold to-amber-600 bg-clip-text text-transparent">
            Customer Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from travelers who discovered the wonders of Egypt with us.
            Read their stories, view their photos, and watch their journey unfold.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-500/20 bg-red-50 dark:bg-red-950/20">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        {!error && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-egyptian-gold/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-3xl font-bold text-egyptian-gold">
                  {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>

            <Card className="border-egyptian-gold/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <ImageIcon className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div className="text-3xl font-bold text-egyptian-gold">
                  {photoTestimonials.length}
                </div>
                <p className="text-sm text-muted-foreground">Photo Stories</p>
              </CardContent>
            </Card>

            <Card className="border-egyptian-gold/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Video className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div className="text-3xl font-bold text-egyptian-gold">
                  {videoTestimonials.length}
                </div>
                <p className="text-sm text-muted-foreground">Video Testimonials</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Video Testimonials Section */}
        {videoTestimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Video className="h-6 w-6 text-egyptian-gold" />
              <h2 className="text-3xl font-bold">Video Testimonials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoTestimonials.map((testimonial) => (
                <VideoTestimonial key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Photo Testimonials Section */}
        {photoTestimonials.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="h-6 w-6 text-egyptian-gold" />
              <h2 className="text-3xl font-bold">Written Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && testimonials.length === 0 && (
          <Card className="border-egyptian-gold/20">
            <CardContent className="p-12 text-center">
              <Quote className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Testimonials Yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your experience with Egydise Tours!
              </p>
              <Link href="/tours">
                <Button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white">
                  Explore Our Tours
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {testimonials.length > 0 && (
          <Card className="mt-16 border-egyptian-gold/20 bg-gradient-to-r from-egyptian-gold/5 to-amber-500/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have you traveled with us? We'd love to hear about your experience!
                Share your story and inspire other travelers to discover the magic of Egypt.
              </p>
              <Link href="/contact">
                <Button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white">
                  Submit Your Story
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
