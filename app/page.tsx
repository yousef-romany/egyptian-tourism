import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, ChevronRight, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReviewCard from "@/components/review-card"
import AnimatedHero from "@/components/animated-hero"
import HistoryTimeline from "@/components/history-timeline"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import TourCarousel from "@/components/tour-carousel"
import TransportationSection from "@/components/transportation-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedHero />

      <section className="container py-16 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Discover Egypt Through Our Guests' Eyes
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Authentic reviews from travelers who experienced the magic of Egypt with Egydise Tours.
          </p>
        </div>

        <EgyptianDivider className="my-8" />

        <Tabs defaultValue="tripadvisor" className="mt-12">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger
                value="tripadvisor"
                className="data-[state=active]:bg-[#00aa6c] data-[state=active]:text-white"
              >
                TripAdvisor
              </TabsTrigger>
              <TabsTrigger value="viator" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white">
                Viator
              </TabsTrigger>
              <TabsTrigger value="klook" className="data-[state=active]:bg-[#ff5722] data-[state=active]:text-white">
                Klook
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tripadvisor" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReviewCard
                platform="tripadvisor"
                name="Sarah Johnson"
                location="London, UK"
                date="March 2023"
                rating={5}
                title="Unforgettable Pyramids Tour"
                content="Our guide was incredibly knowledgeable about Egyptian history. The tour was well-organized and we never felt rushed. Seeing the pyramids at sunrise was magical!"
                tourName="Giza Pyramids & Sphinx"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="tripadvisor"
                name="Michael Chen"
                location="Toronto, Canada"
                date="February 2023"
                rating={5}
                title="Best Nile Cruise Experience"
                content="The 3-day Nile cruise exceeded all expectations. The boat was luxurious, food was excellent, and the stops along the way were fascinating. Our guide Ahmed made the history come alive."
                tourName="Luxury Nile Cruise"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="tripadvisor"
                name="Emma Wilson"
                location="Sydney, Australia"
                date="April 2023"
                rating={4}
                title="Great Cairo Museum Tour"
                content="The Egyptian Museum was incredible, and our guide was very informative. The only reason for 4 stars instead of 5 is that it felt a bit rushed at times. Still highly recommended!"
                tourName="Cairo Museum & Khan el-Khalili"
                avatar="/placeholder.svg?height=40&width=40"
              />
            </div>
          </TabsContent>

          <TabsContent value="viator" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReviewCard
                platform="viator"
                name="David Miller"
                location="Chicago, USA"
                date="January 2023"
                rating={5}
                title="Luxor Day Trip - Amazing!"
                content="The Valley of the Kings was breathtaking. Our guide Mahmoud was exceptional - his knowledge of Egyptian history made the experience so much more meaningful. The lunch included was delicious too!"
                tourName="Luxor Day Trip"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="viator"
                name="Sophia Garcia"
                location="Madrid, Spain"
                date="December 2022"
                rating={5}
                title="Perfect Alexandria Tour"
                content="Alexandria was beautiful and so different from Cairo. The Catacombs were fascinating and the Mediterranean views were stunning. Our guide was friendly and professional."
                tourName="Alexandria Day Tour"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="viator"
                name="James Wilson"
                location="Melbourne, Australia"
                date="February 2023"
                rating={4}
                title="Great Desert Safari"
                content="The White Desert is unlike anything I've ever seen. Camping under the stars was magical. The only improvement would be more comfortable transportation for the long drive."
                tourName="White Desert Overnight"
                avatar="/placeholder.svg?height=40&width=40"
              />
            </div>
          </TabsContent>

          <TabsContent value="klook" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReviewCard
                platform="klook"
                name="Hiroshi Tanaka"
                location="Tokyo, Japan"
                date="March 2023"
                rating={5}
                title="Perfect Hot Air Balloon Ride"
                content="Seeing Luxor from a hot air balloon at sunrise was the highlight of our trip to Egypt. The views were spectacular and the pilot was very skilled. Worth every penny!"
                tourName="Luxor Hot Air Balloon"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="klook"
                name="Priya Patel"
                location="Mumbai, India"
                date="January 2023"
                rating={5}
                title="Excellent Sound & Light Show"
                content="The Pyramids Sound and Light Show was magical! Seeing the Sphinx and Pyramids illuminated at night while learning about their history was an unforgettable experience."
                tourName="Pyramids Sound & Light Show"
                avatar="/placeholder.svg?height=40&width=40"
              />
              <ReviewCard
                platform="klook"
                name="Thomas Schmidt"
                location="Berlin, Germany"
                date="February 2023"
                rating={4}
                title="Great Snorkeling Experience"
                content="The Red Sea snorkeling was amazing with beautiful coral and fish. The boat was comfortable and the crew was friendly. Lunch could have been better, but overall a great day."
                tourName="Hurghada Snorkeling Trip"
                avatar="/placeholder.svg?height=40&width=40"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-2">
            View All Reviews
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24 lg:py-32 relative overflow-hidden">
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
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Our Most Popular Tours</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Expertly crafted experiences to showcase the best of Egypt's ancient wonders and modern culture.
            </p>
          </div>

          <EgyptianDivider className="my-8" />

          <div className="mt-12">
            <TourCarousel />
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild className="bg-[#d4af37] hover:bg-[#c09c2c] text-black">
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      <HistoryTimeline />

      <TransportationSection />

      <section className="container py-16 md:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-6">
              Why Choose Egydise Tours?
            </h2>

            <EgyptianDivider className="my-6 max-w-xs" />

            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Expert Local Guides</h3>
                  <p className="text-muted-foreground">
                    Our guides are certified Egyptologists with deep knowledge of Egyptian history and culture.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Customized Itineraries</h3>
                  <p className="text-muted-foreground">
                    We tailor each tour to your interests, ensuring you experience Egypt your way.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">5-Star Experiences</h3>
                  <p className="text-muted-foreground">
                    Consistently rated 5 stars across TripAdvisor, Viator, and Klook by satisfied travelers.
                  </p>
                </div>
              </div>
            </div>
            <Button asChild className="mt-8 gap-2 bg-[#0c1e35] hover:bg-[#1a3a5f]">
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d4af37]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#d4af37]/10 rounded-full"></div>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Tour guide explaining hieroglyphics"
              width={500}
              height={600}
              className="rounded-lg object-cover h-[500px] w-full relative z-10"
            />
            <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-lg shadow-lg max-w-[250px] z-20 border border-[#d4af37]/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <span className="font-bold">4.9/5</span>
              </div>
              <p className="text-sm">Based on 1,200+ reviews across TripAdvisor, Viator, and Klook</p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="bg-[#0c1e35] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids)" />
          </svg>
        </div>

        <div className="container text-center relative z-10">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-6">
            Ready to Experience Egypt?
          </h2>
          <p className="mx-auto max-w-[50rem] text-white/80 mb-8 sm:text-lg">
            Book your dream Egyptian adventure today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg" className="bg-[#d4af37] hover:bg-[#c09c2c] text-black">
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

