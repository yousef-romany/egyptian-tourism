import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  Info,
  AlertCircle,
} from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import TourCardServer from "@/components/tour-card-server"
import { getTourBySlug, getRelatedTours, getAllTourSlugs } from "@/lib/data/tours"
import { TourImageGallery } from "@/components/tour-image-gallery"
import { TourJsonLd } from "@/components/tour-json-ld"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { ReviewForm } from "@/components/review-form"
import { TourSidebarWidgets } from "@/components/tour-sidebar-widgets"

interface TourPageProps {
  params: {
    locale: string
    slug: string
  }
}

// Generate static paths for all tours at build time
export async function generateStaticParams() {
  const slugs = await getAllTourSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const tour = await getTourBySlug(params.slug, params.locale)

  if (!tour) {
    return {
      title: "Tour Not Found - Egydise Tours",
    }
  }

  return {
    title: `${tour.title} - Egydise Tours`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} - Egydise Tours`,
      description: tour.description,
      images: tour.images || [tour.image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} - Egydise Tours`,
      description: tour.description,
      images: tour.images?.[0] || tour.image,
    },
  }
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const tour = await getTourBySlug(params.slug, params.locale)

  if (!tour) {
    notFound()
  }

  const relatedTours = await getRelatedTours(params.slug, 3)
  const images = tour.images || [tour.image]

  return (
    <>
      <TourJsonLd tour={tour} />
      <div className="flex min-h-screen flex-col">
        {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-egyptian-gold/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <nav className="text-sm mb-6">
            <ol className="flex items-center gap-2 text-white/70 font-medium">
              <li>
                <Link href="/" className="hover:text-egyptian-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/tours" className="hover:text-egyptian-gold transition-colors">
                  Tours
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{tour.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-5 py-2.5 mb-8 shadow-lg">
                {tour.category}
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(tour.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-white/20 text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg">{tour.rating}</span>
                  <span className="text-white/70">({tour.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/90">
                  <MapPin className="h-5 w-5 text-egyptian-gold" />
                  <span className="font-medium">{tour.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/90">
                  <Clock className="h-5 w-5 text-egyptian-gold" />
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/90">
                  <Users className="h-5 w-5 text-egyptian-gold" />
                  <span className="font-medium">{tour.groupSize}</span>
                </div>
              </div>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">{tour.description}</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-8 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300"
                >
                  <Link href="/book-now">Book Now - {tour.price}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-8 py-7 transition-all duration-300"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <TourImageGallery images={images} title={tour.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-muted/50 p-1.5">
                <TabsTrigger value="overview" className="text-base font-semibold data-[state=active]:bg-egyptian-gold data-[state=active]:text-black">Overview</TabsTrigger>
                <TabsTrigger value="itinerary" className="text-base font-semibold data-[state=active]:bg-egyptian-gold data-[state=active]:text-black">Itinerary</TabsTrigger>
                <TabsTrigger value="included" className="text-base font-semibold data-[state=active]:bg-egyptian-gold data-[state=active]:text-black">Included</TabsTrigger>
                <TabsTrigger value="faq" className="text-base font-semibold data-[state=active]:bg-egyptian-gold data-[state=active]:text-black">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                {tour.highlights && tour.highlights.length > 0 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                      Tour Highlights
                    </h2>
                    <EgyptianDivider className="my-6" />
                    <ul className="space-y-4">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className="flex gap-4 group">
                          <CheckCircle className="h-6 w-6 text-egyptian-gold flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-muted-foreground text-lg leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="itinerary" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                  Detailed Itinerary
                </h2>
                <EgyptianDivider className="my-6" />
                {tour.itinerary && tour.itinerary.length > 0 ? (
                  <div className="space-y-6">
                    {tour.itinerary.map((day, index) => (
                      <Card key={index} className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-5">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Calendar className="h-7 w-7 text-black" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-3">
                                Day {day.day}: {day.title}
                              </h3>
                              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                                {day.description}
                              </p>
                              {day.meals.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Badge variant="outline">
                                    Meals: {day.meals.join(", ")}
                                  </Badge>
                                </div>
                              )}
                              {day.accommodation && (
                                <div className="flex items-center gap-2 text-sm mt-2">
                                  <Badge variant="outline">
                                    Accommodation: {day.accommodation}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Detailed itinerary information coming soon.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="included" className="mt-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-heading font-extrabold mb-6 flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      What's Included
                    </h2>
                    <EgyptianDivider className="my-6" />
                    {tour.included && tour.included.length > 0 ? (
                      <ul className="space-y-3">
                        {tour.included.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 group"
                          >
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-muted-foreground text-lg leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        Information coming soon.
                      </p>
                    )}
                  </div>

                  <div>
                    <h2 className="text-3xl font-heading font-extrabold mb-6 flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-orange-600" />
                      What's Not Included
                    </h2>
                    <EgyptianDivider className="my-6" />
                    {tour.excluded && tour.excluded.length > 0 ? (
                      <ul className="space-y-3">
                        {tour.excluded.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 group"
                          >
                            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-muted-foreground text-lg leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        Information coming soon.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-8">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6">
                  Frequently Asked Questions
                </h2>
                <EgyptianDivider className="my-6" />
                {tour.faqs && tour.faqs.length > 0 ? (
                  <div className="space-y-6">
                    {tour.faqs.map((faq, index) => (
                      <Card key={index} className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4">
                            <Info className="h-6 w-6 text-egyptian-gold flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-bold text-xl mb-3">{faq.question}</h3>
                              <p className="text-muted-foreground text-lg leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No FAQs available for this tour yet.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-egyptian-gold/30 shadow-2xl backdrop-blur-sm bg-card/50">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                    Starting From
                  </p>
                  <p className="text-5xl font-extrabold bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark bg-clip-text text-transparent mb-2">
                    {tour.price}
                  </p>
                  <p className="text-base text-muted-foreground font-medium">per person</p>
                </div>

                <Button asChild className="w-full mb-4 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/book-now">Book Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10 font-semibold text-base py-6">
                  <Link href="/contact">Check Availability</Link>
                </Button>

                <EgyptianDivider className="my-8" />

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-egyptian-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Duration</p>
                      <p className="text-base font-bold">
                        {tour.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-egyptian-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Group Size</p>
                      <p className="text-base font-bold">
                        {tour.groupSize}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-egyptian-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Location</p>
                      <p className="text-base font-bold">
                        {tour.location}
                      </p>
                    </div>
                  </div>
                </div>

                <EgyptianDivider className="my-8" />
                
                <SocialShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={tour.title}
                  description={tour.description}
                />
                
                <div className="text-center bg-muted/50 rounded-xl p-6 mt-8">
                  <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Need help?
                  </p>
                  <Button variant="link" asChild className="text-egyptian-gold font-bold text-base p-0 h-auto hover:scale-105 transition-transform duration-300">
                    <Link href="/contact">Contact Our Team →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Calendar & Tour Map */}
            <TourSidebarWidgets tour={tour} />
          </div>
        </div>
      </section>

      {/* Enhanced Related Tours Section */}
      {relatedTours.length > 0 && (
        <section className="bg-muted py-20 md:py-28 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
                  <Star className="h-4 w-4 inline mr-2 fill-egyptian-gold" />
                  Similar Tours
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
                You May Also Like
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">Discover more amazing experiences in Egypt</p>
              <EgyptianDivider className="mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => (
                <TourCardServer key={relatedTour.id} tour={relatedTour} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold hover:text-black text-egyptian-gold font-bold text-lg px-10 py-7 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <Link href="/tours" className="inline-flex items-center gap-2">
                  View All Tours
                  <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

        {/* Review Section */}
        <section className="container py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
                  <Star className="h-4 w-4 inline mr-2 fill-egyptian-gold" />
                  Share Your Experience
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
                Leave a Review
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Help other travelers by sharing your experience about this tour
              </p>
              <EgyptianDivider className="mx-auto" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="lg:col-span-1">
                <ReviewForm
                  tourId={tour.id.toString()}
                  tourName={tour.title}
                  onSuccess={() => {
                    // Refresh the page to show the new review
                    window.location.reload();
                  }}
                />
              </div>
              
              <div className="lg:col-span-1">
                <Card className="border-2 border-egyptian-gold/30 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Why Leave a Review?</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>• Your feedback helps us improve our tours</p>
                      <p>• Reviews assist other travelers in making informed decisions</p>
                      <p>• Share your highlights and tips for future visitors</p>
                      <p>• All reviews are verified before publication</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </div>
    </>
  )
}
