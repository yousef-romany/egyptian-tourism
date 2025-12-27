import { Button } from "@/components/ui/button"
import { Star, ChevronRight, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AnimatedHero from "@/components/animated-hero"
import HistoryTimeline from "@/components/history-timeline"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import TourCarouselServer from "@/components/tour-carousel-server"
import TransportationSection from "@/components/transportation-section"
import ReviewsSection from "@/components/reviews-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedHero />

      <section className="container py-20 md:py-28 lg:py-36">
        <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center">
          <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
            Discover Egypt Through Our Guests' Eyes
          </h2>
          <p className="max-w-[90%] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
            Authentic reviews from travelers who experienced the magic of Egypt with Egydise Tours.
          </p>
        </div>

        <EgyptianDivider className="my-12" />

        <ReviewsSection />

        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="gap-2 border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10 text-lg px-8 py-6">
            View All Reviews
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

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

        <div className="container relative z-10">
          <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center">
            <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">Our Most Popular Tours</h2>
            <p className="max-w-[90%] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
              Expertly crafted experiences to showcase the best of Egypt's ancient wonders and modern culture.
            </p>
          </div>

          <EgyptianDivider className="my-12" />

          <div className="mt-16">
            <TourCarouselServer />
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-[#d4af37] to-[#c09c2c] hover:from-[#c09c2c] hover:to-[#d4af37] text-black font-semibold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      <HistoryTimeline />

      <TransportationSection />

      <section className="container py-20 md:py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl mb-8">
              Why Choose Egydise Tours?
            </h2>

            <EgyptianDivider className="my-8 max-w-xs" />

            <div className="grid gap-8">
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Expert Local Guides</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our guides are certified Egyptologists with deep knowledge of Egyptian history and culture.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-7 w-7 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Customized Itineraries</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We tailor each tour to your interests, ensuring you experience Egypt your way.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-7 w-7 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">5-Star Experiences</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Consistently rated 5 stars across TripAdvisor, Viator, and Klook by satisfied travelers.
                  </p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="mt-10 gap-2 bg-gradient-to-r from-[#0c1e35] to-[#1a3a5f] hover:from-[#1a3a5f] hover:to-[#0c1e35] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-7 text-lg">
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Tour guide explaining hieroglyphics"
              width={500}
              height={600}
              className="rounded-2xl object-cover h-[550px] w-full relative z-10 shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-background/95 backdrop-blur-sm p-7 rounded-2xl shadow-2xl max-w-[280px] z-20 border-2 border-egyptian-gold/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-xl">4.9/5</span>
              </div>
              <p className="text-sm leading-relaxed">Based on 1,200+ reviews across TripAdvisor, Viator, and Klook</p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.1),transparent_50%)]"></div>

        <div className="container text-center relative z-10">
          <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl mb-8">
            Ready to Experience Egypt?
          </h2>
          <p className="mx-auto max-w-[56rem] text-white/90 mb-12 text-lg sm:text-xl leading-relaxed">
            Book your dream Egyptian adventure today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-12 py-8 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300">
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-12 py-8 transition-all duration-300"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

