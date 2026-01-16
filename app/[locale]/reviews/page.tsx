import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageSquare, ChevronRight } from "lucide-react";
import EgyptianDivider from "@/components/egyptian-divider";
import Newsletter from "@/components/newsletter";
import WidgetTripadvisor from "./components/WidgetTripadvisor";
import { getFeaturedReviews, getReviewsByPlatform } from "@/lib/data/reviews";

export const metadata = {
  title: "Customer Reviews - Egydise Tours",
  description:
    "Read authentic reviews from travelers who experienced the magic of Egypt with Egydise Tours.",
};

export default async function ReviewsPage() {
  try {
    // Fetch featured reviews from the backend
    const featuredReviews = await getFeaturedReviews(3);
    
    // Fetch reviews by platform from the backend
    const [tripadvisorReviews, viatorReviews, klookReviews] = await Promise.all([
      getReviewsByPlatform('tripadvisor'),
      getReviewsByPlatform('viator'),
      getReviewsByPlatform('klook')
    ]);

    const platformReviews = {
      tripadvisor: tripadvisorReviews,
      viator: viatorReviews,
      klook: klookReviews
    };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/logo_with_text.webp"
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

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm backdrop-blur-sm">
                <Star className="h-4 w-4 fill-egyptian-gold" />
                4.9/5 Rating
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Customer Reviews
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Discover what our guests have to say about their Egyptian
              adventures with Egydise Tours.
            </p>

            <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="h-8 w-8 text-egyptian-gold fill-egyptian-gold"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-egyptian-gold">4.9/5</div>
                <div className="text-white/80 text-sm">1,200+ reviews</div>
              </div>
            </div>

            <EgyptianDivider className="my-10 bg-egyptian-gold/70 mx-auto" />
          </div>
        </div>
      </section>

      {/* Enhanced Review Now Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-4">
            <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Share Your Feedback
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
            Review Now
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Let's review now, give your opinion and help other travelers
          </p>
          <EgyptianDivider className="my-8 mx-auto" />
        </div>

        <WidgetTripadvisor />
      </section>

      {/* Enhanced Featured Reviews Section */}
      <section className="container py-20 md:py-28 bg-muted/50 rounded-3xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
              <Star className="h-4 w-4 inline mr-2 fill-egyptian-gold" />
              Top Reviews
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
            Featured Reviews
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Here's what some of our recent travelers have shared about their
            experiences with Egydise Tours.
          </p>
          <EgyptianDivider className="my-8 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredReviews.map((review, index) => (
            <Card
              key={index}
              className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardContent className="p-8 relative bg-gradient-to-b from-background to-background group-hover:from-egyptian-gold/5 group-hover:to-background transition-all duration-300">
                <Quote className="absolute top-8 right-8 h-16 w-16 text-egyptian-gold/10 group-hover:text-egyptian-gold/20 transition-colors" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-egyptian-gold/20 group-hover:border-egyptian-gold transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-egyptian-gold rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-black fill-black" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-egyptian-gold transition-colors">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>

                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < review.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic leading-relaxed text-base">
                  "{review.content}"
                </p>

                <div className="text-sm text-muted-foreground pt-4 border-t-2 border-egyptian-gold/10">
                  <span className="font-semibold text-foreground">Tour:</span>{" "}
                  <span className="text-egyptian-gold">{review.tourName}</span> • {review.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced Reviews from Around the Web Section */}
      <section className="bg-muted py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="review-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,0 L20,20 M20,0 L0,20" stroke="#d4af37" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#review-pattern)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
                <Star className="h-4 w-4 inline mr-2 fill-egyptian-gold" />
                Verified Reviews
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
              Reviews from Around the Web
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Read authentic reviews from travelers who booked through various
              platforms.
            </p>
            <EgyptianDivider className="my-8 mx-auto" />
          </div>

          <Tabs defaultValue="tripadvisor" className="mt-8">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-2xl grid-cols-3 h-auto p-2 bg-background/60 backdrop-blur-sm rounded-2xl border-2 border-egyptian-gold/20 gap-2">
                <TabsTrigger
                  value="tripadvisor"
                  className="data-[state=active]:bg-[#00aa6c] data-[state=active]:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  TripAdvisor
                </TabsTrigger>
                <TabsTrigger
                  value="viator"
                  className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Viator
                </TabsTrigger>
                <TabsTrigger
                  value="klook"
                  className="data-[state=active]:bg-[#ff5722] data-[state=active]:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Klook
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(platformReviews).map(([platform, reviews]) => (
              <TabsContent key={platform} value={platform} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.map((review, index) => (
                    <Card
                      key={index}
                      className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardContent className="p-6 bg-gradient-to-b from-background to-background group-hover:from-egyptian-gold/5 group-hover:to-background transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-egyptian-gold/20 group-hover:border-egyptian-gold transition-colors"
                          />
                          <div>
                            <h3 className="font-bold group-hover:text-egyptian-gold transition-colors">{review.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {review.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < review.rating
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                          "{review.content}"
                        </p>

                        <div className="text-xs text-muted-foreground pt-4 border-t-2 border-egyptian-gold/10">
                          <span className="font-semibold text-foreground">
                            Tour:
                          </span>{" "}
                          <span className="text-egyptian-gold">{review.tourName}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold hover:text-black font-bold px-10 py-6 transition-all duration-300 group"
                  >
                    View More Reviews
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Enhanced Share Your Experience Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-egyptian-gold/20 hover:border-egyptian-gold/40 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-16 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-egyptian-gold/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="inline-block mb-6">
                  <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm px-4 py-2 backdrop-blur-sm">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    We Value Your Opinion
                  </Badge>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-egyptian-gold">
                  Share Your Experience
                </h2>
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Have you traveled with us? We'd love to hear about your
                  experience. Your feedback helps us improve and assists other
                  travelers in planning their perfect Egyptian adventure.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  Write a Review
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-egyptian-gold/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Happy travelers in Egypt"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* Review Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Egydise Tours",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1200",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              ...featuredReviews.map((review) => ({
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: review.name,
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: review.rating.toString(),
                  bestRating: "5",
                  worstRating: "1",
                },
                reviewBody: review.content,
                datePublished: review.date,
                itemReviewed: {
                  "@type": "TouristTrip",
                  name: review.tourName || "Egypt Tour",
                },
              })),
            ],
          }),
        }}
      />
    </div>
  );

  } catch (error) {
    // Handle error gracefully
    console.error('Error loading reviews:', error);
    
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-lg text-gray-600 mb-6">
            We couldn't load the reviews at the moment. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-egyptian-gold text-black font-semibold rounded-lg hover:bg-egyptian-gold-dark transition-colors"
          >
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error instanceof Error ? error.stack : String(error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
