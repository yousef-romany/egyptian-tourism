import { Button } from "@/components/ui/button"
import { Star, ChevronRight, Calendar, Users, Award, Shield, HeartHandshake, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AnimatedHero from "@/components/animated-hero"
import HistoryTimeline from "@/components/history-timeline"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import TourCarouselServer from "@/components/tour-carousel-server"
import TransportationSection from "@/components/transportation-section"
import ReviewsSection from "@/components/reviews-section"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import StatsSection from "@/components/stats-section"
import BlogPreview from "@/components/blog-preview"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedHero />

      {/* Reviews Section - Enhanced */}
      <section className="container py-20 md:py-28 lg:py-36 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="bg-gradient-to-r from-egyptian-gold/10 to-egyptian-gold/5 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm px-4 py-2">
              <Star className="h-4 w-4 mr-2 inline fill-egyptian-gold" />
              5-Star Rated Tours
            </Badge>
          </div>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
            Discover Egypt Through Our Guests' Eyes
          </h2>
          <p className="max-w-[90%] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
            Authentic reviews from travelers who experienced the magic of Egypt with Egydise Tours.
          </p>
        </div>

        <EgyptianDivider className="my-12" />

        <ReviewsSection />

        <div className="mt-16 flex justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Link href="/reviews">
              View All Reviews
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tours Section - Enhanced */}
      <section className="bg-muted py-20 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern
              id="hieroglyphics"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(45)"
            >
              <rect width="10" height="10" fill="none" />
              <path d="M0,0 L10,10 M10,0 L0,10" stroke="#000" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hieroglyphics)" />
          </svg>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-egyptian-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-egyptian-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container relative z-10">
          <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center">
            <div className="inline-block mb-4">
              <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-sm px-4 py-2 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                Featured Tours
              </Badge>
            </div>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground to-foreground bg-clip-text">
              Our Most Popular Tours
            </h2>
            <p className="max-w-[90%] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
              Expertly crafted experiences to showcase the best of Egypt's ancient wonders and modern culture.
            </p>
          </div>

          <EgyptianDivider className="my-12" />

          <div className="mt-16">
            <TourCarouselServer />
          </div>

          <div className="flex justify-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#d4af37] to-[#c09c2c] hover:from-[#c09c2c] hover:to-[#d4af37] text-black font-bold text-lg px-12 py-8 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300 group"
            >
              <Link href="/tours" className="inline-flex items-center gap-2">
                View All Tours
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <HistoryTimeline />

      <TestimonialsCarousel />

      <StatsSection />

      <TransportationSection />

      {/* Why Choose Us Section - Enhanced */}
      <section className="container py-20 md:py-28 lg:py-36 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6">
              <Badge className="bg-gradient-to-r from-egyptian-gold/10 to-egyptian-gold/5 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm px-4 py-2">
                <Award className="h-4 w-4 mr-2 inline" />
                Why Choose Us
              </Badge>
            </div>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl mb-8 bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
              Why Choose Egydise Tours?
            </h2>

            <EgyptianDivider className="my-8 max-w-xs" />

            <div className="grid gap-6">
              <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-all duration-300 border border-transparent hover:border-egyptian-gold/20">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Expert Local Guides</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our guides are certified Egyptologists with deep knowledge of Egyptian history and culture.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-all duration-300 border border-transparent hover:border-egyptian-gold/20">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                  <HeartHandshake className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Customized Itineraries</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We tailor each tour to your interests, ensuring you experience Egypt your way.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-all duration-300 border border-transparent hover:border-egyptian-gold/20">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                  <Star className="h-8 w-8 text-black fill-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">5-Star Experiences</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Consistently rated 5 stars across TripAdvisor, Viator, and Klook by satisfied travelers.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-all duration-300 border border-transparent hover:border-egyptian-gold/20">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Safety & Comfort</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Your safety and comfort are our top priorities with comprehensive travel insurance included.
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-12 gap-2 bg-gradient-to-r from-[#0c1e35] to-[#1a3a5f] hover:from-[#1a3a5f] hover:to-[#0c1e35] text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-8 text-lg group"
            >
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Tour guide explaining hieroglyphics"
                width={500}
                height={600}
                className="rounded-3xl object-cover h-[600px] w-full relative z-10 shadow-2xl border-4 border-white/10"
              />
              {/* Stats card overlay */}
              <div className="absolute -bottom-12 -left-12 bg-background/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-[320px] z-20 border-2 border-egyptian-gold/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-2xl">4.9/5</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Based on 1,200+ reviews across TripAdvisor, Viator, and Klook
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-5 w-5 text-egyptian-gold" />
                    <span className="font-semibold">Award-Winning Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogPreview />

      <Newsletter />

      {/* Final CTA Section - Enhanced */}
      <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-32 lg:py-40 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.15),transparent_60%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-egyptian-gold/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-egyptian-gold/10 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div className="container text-center relative z-10">
          {/* Badge */}
          <div className="inline-block mb-8">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-sm px-5 py-2.5 shadow-2xl">
              <Sparkles className="h-4 w-4 mr-2 inline animate-pulse" />
              Start Your Journey
            </Badge>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
            Ready to Experience Egypt?
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-[56rem] text-white/90 mb-12 text-lg sm:text-xl lg:text-2xl leading-relaxed">
            Book your dream Egyptian adventure today and create memories that will last a lifetime. Expert guides, authentic experiences, and 5-star service guaranteed.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-14 py-9 shadow-2xl hover:shadow-egyptian-gold/70 transition-all duration-300 transform hover:scale-105 group"
            >
              <Link href="/tours" className="inline-flex items-center gap-2">
                Browse Tours
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-14 py-9 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-12 border-t border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-white/80">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-egyptian-gold" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm">Safe & Secure</div>
                <div className="text-xs">100% Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-egyptian-gold fill-egyptian-gold" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm">4.9/5 Rating</div>
                <div className="text-xs">1,200+ Reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="h-12 w-12 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-egyptian-gold" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm">Award Winning</div>
                <div className="text-xs">15+ Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

