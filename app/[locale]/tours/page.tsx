import { Button } from "@/components/ui/button"
import Image from "next/image"
import EgyptianDivider from "@/components/egyptian-divider"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Newsletter from "@/components/newsletter"
import { getTours } from "@/lib/data/tours"
import ToursFilterClient from "@/components/tours-filter-client"

export const metadata = {
  title: "Tours - WanderLand Egypt",
  description:
    "Explore our wide range of Egyptian tours, from the pyramids of Giza to the temples of Luxor and beyond.",
}

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const tours = await getTours(locale)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian temples"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/50 to-[#0c1e35]/95"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-egyptian-gold/10 rounded-full blur-2xl"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm backdrop-blur-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                50+ Unique Experiences
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Explore Our Tours
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Discover the wonders of Egypt with our expertly crafted tours led by professional Egyptologists.
            </p>
            <EgyptianDivider className="my-10 bg-egyptian-gold/70 mx-auto" />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">50+</div>
                <div className="text-sm text-white/70">Tours Available</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">4.9★</div>
                <div className="text-sm text-white/70">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">15K+</div>
                <div className="text-sm text-white/70">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <ToursFilterClient tours={tours} />
      </section>

      {/* Enhanced Why Choose Our Tours Section */}
      <section className="bg-muted py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-0 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium Service
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-8 bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
                Why Choose Our Tours?
              </h2>
              <EgyptianDivider className="my-8 max-w-xs" />

              <div className="space-y-6">
                <div className="flex gap-5 group p-6 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300 border border-transparent hover:border-egyptian-gold/20 hover:shadow-lg">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Expert Egyptologist Guides</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Our guides are certified Egyptologists with deep knowledge of Egyptian history, archaeology, and
                      culture.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 group p-6 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300 border border-transparent hover:border-egyptian-gold/20 hover:shadow-lg">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Safety & Comfort</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Your safety and comfort are our top priorities, with well-maintained vehicles and carefully
                      selected accommodations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 group p-6 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300 border border-transparent hover:border-egyptian-gold/20 hover:shadow-lg">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <path d="M20 7h-9" />
                      <path d="M14 17H5" />
                      <circle cx="17" cy="17" r="3" />
                      <circle cx="7" cy="7" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Customizable Experiences</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      We tailor each tour to your interests, ensuring you experience Egypt your way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Tour guide with tourists at the pyramids"
                  width={500}
                  height={600}
                  className="rounded-3xl object-cover h-[600px] w-full relative z-10 shadow-2xl border-4 border-background"
                />
                {/* Overlay badge */}
                <div className="absolute top-8 left-8 bg-background/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-egyptian-gold/30 z-20">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-egyptian-gold flex items-center justify-center">
                      <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-lg">Top Rated</div>
                      <div className="text-sm text-muted-foreground">Since 2010</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Common Questions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">Find answers to common questions about our tours and travel in Egypt.</p>
          <EgyptianDivider className="mx-auto my-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 flex-1">What should I pack for my trip to Egypt?</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                We recommend lightweight, modest clothing that covers shoulders and knees, comfortable walking shoes, a
                hat, sunglasses, sunscreen, and a light jacket for evenings.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 flex-1">Is Egypt safe for tourists?</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Yes, tourist areas in Egypt are generally very safe and well-protected. The Egyptian government places a
                high priority on tourism safety, with dedicated tourist police at all major sites.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 flex-1">What is the best time to visit Egypt?</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                The most comfortable time to visit Egypt is from October to April when temperatures are milder. December
                and January are peak tourist months.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2 flex-1">Do I need a visa to visit Egypt?</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Most visitors need a visa to enter Egypt. Many nationalities can obtain a visa on arrival at Egyptian
                airports for approximately $25 USD, or apply for an e-visa online before travel.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Link href="/faq" className="inline-flex items-center gap-2">
              View All FAQs
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-32 lg:py-40 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids-tours" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids-tours)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.15),transparent_60%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-egyptian-gold/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-egyptian-gold/10 rounded-full blur-2xl animate-pulse delay-300"></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm backdrop-blur-sm">
                <svg className="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Book Your Adventure
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Ready to Experience Egypt?
            </h2>

            {/* Description */}
            <p className="text-white/90 mb-12 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
              Book your dream Egyptian adventure today and create memories that will last a lifetime with expert guides and authentic experiences.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-14 py-9 shadow-2xl hover:shadow-egyptian-gold/70 transition-all duration-300 transform hover:scale-105 group"
              >
                <Link href="/book-now" className="inline-flex items-center gap-2">
                  Book Now
                  <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-12 border-t border-white/10">
              <div className="flex items-center gap-3 text-white/80">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
