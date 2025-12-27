import { Button } from "@/components/ui/button"
import Image from "next/image"
import EgyptianDivider from "@/components/egyptian-divider"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Newsletter from "@/components/newsletter"
import { getTours } from "@/lib/data/tours"
import ToursFilterClient from "@/components/tours-filter-client"

export const metadata = {
  title: "Tours - Egydise Tours",
  description:
    "Explore our wide range of Egyptian tours, from the pyramids of Giza to the temples of Luxor and beyond.",
}

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
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

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Explore Our Tours
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover the wonders of Egypt with our expertly crafted tours led by professional Egyptologists.
            </p>
            <EgyptianDivider className="my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <ToursFilterClient tours={tours} />
      </section>

      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8">Why Choose Our Tours?</h2>
              <EgyptianDivider className="my-8 max-w-xs" />

              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
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

                <div className="flex gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
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

                <div className="flex gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
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
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Tour guide with tourists at the pyramids"
                width={500}
                height={600}
                className="rounded-2xl object-cover h-[550px] w-full relative z-10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Find answers to common questions about our tours and travel in Egypt.</p>
          <EgyptianDivider className="mx-auto my-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-bold text-xl mb-4">What should I pack for my trip to Egypt?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We recommend lightweight, modest clothing that covers shoulders and knees, comfortable walking shoes, a
                hat, sunglasses, sunscreen, and a light jacket for evenings.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-bold text-xl mb-4">Is Egypt safe for tourists?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Yes, tourist areas in Egypt are generally very safe and well-protected. The Egyptian government places a
                high priority on tourism safety, with dedicated tourist police at all major sites.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-bold text-xl mb-4">What is the best time to visit Egypt?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The most comfortable time to visit Egypt is from October to April when temperatures are milder. December
                and January are peak tourist months.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-bold text-xl mb-4">Do I need a visa to visit Egypt?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most visitors need a visa to enter Egypt. Many nationalities can obtain a visa on arrival at Egyptian
                airports for approximately $25 USD, or apply for an e-visa online before travel.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-egyptian-gold/50 hover:border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 text-lg px-8 py-6"
          >
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids-tours" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids-tours)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.1),transparent_50%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-8">Ready to Experience Egypt?</h2>
            <p className="text-white/90 mb-12 text-lg sm:text-xl leading-relaxed">
              Book your dream Egyptian adventure today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-12 py-8 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300">
                <Link href="/book-now">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-12 py-8 transition-all duration-300">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
