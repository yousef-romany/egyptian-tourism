import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MessageSquare, ChevronRight } from "lucide-react";
import EgyptianDivider from "@/components/egyptian-divider";
import Newsletter from "@/components/newsletter";
import WidgetTripadvisor from "./components/WidgetTripadvisor";

export const metadata = {
  title: "Customer Reviews - Egydise Tours",
  description:
    "Read authentic reviews from travelers who experienced the magic of Egypt with Egydise Tours.",
};

export default function ReviewsPage() {
  const featuredReviews = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Our 10-day trip to Egypt with Egydise Tours was absolutely incredible! From the moment we landed in Cairo until our departure, everything was perfectly organized. Our guide Ahmed was exceptional - his knowledge of Egyptian history made the experience so much more meaningful. The accommodations were excellent, and the itinerary was perfectly balanced between famous sites and hidden gems. I can't recommend Egydise Tours enough!",
      tour: "Complete Egypt Experience",
      date: "March 15, 2024",
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The 3-day Nile cruise exceeded all expectations. The boat was luxurious, food was excellent, and the stops along the way were fascinating. Our guide Fatima made the history come alive with her passionate storytelling and extensive knowledge. Watching the sunset over the Nile from the deck of our cruise ship is a memory I'll cherish forever. This was truly a once-in-a-lifetime experience!",
      tour: "Luxury Nile Cruise",
      date: "February 8, 2024",
    },
    {
      name: "Emma Wilson",
      location: "Sydney, Australia",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As a solo female traveler, I was initially hesitant about visiting Egypt, but Egydise Tours made me feel safe and comfortable throughout my entire trip. The attention to detail was impressive, and they were always responsive to my questions and requests. Seeing the pyramids at sunrise with no crowds around was magical! I've already recommended them to all my friends and family.",
      tour: "Cairo & Luxor Explorer",
      date: "April 22, 2024",
    },
  ];

  const platformReviews = {
    tripadvisor: [
      {
        name: "David Miller",
        location: "Chicago, USA",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Valley of the Kings was breathtaking. Our guide Mahmoud was exceptional - his knowledge of Egyptian history made the experience so much more meaningful. The lunch included was delicious too!",
        tour: "Luxor Day Trip",
        date: "January 2024",
      },
      {
        name: "Sophia Garcia",
        location: "Madrid, Spain",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Alexandria was beautiful and so different from Cairo. The Catacombs were fascinating and the Mediterranean views were stunning. Our guide was friendly and professional.",
        tour: "Alexandria Day Tour",
        date: "December 2022",
      },
      {
        name: "James Wilson",
        location: "Melbourne, Australia",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The White Desert is unlike anything I've ever seen. Camping under the stars was magical. The only improvement would be more comfortable transportation for the long drive.",
        tour: "White Desert Overnight",
        date: "February 2024",
      },
      {
        name: "Olivia Brown",
        location: "New York, USA",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Egyptian Museum tour was fascinating. Our guide had an incredible depth of knowledge and made the ancient artifacts come to life with his stories.",
        tour: "Cairo Museum Tour",
        date: "March 2024",
      },
      {
        name: "Liam Johnson",
        location: "Vancouver, Canada",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The hot air balloon ride over Luxor was the highlight of our trip. Seeing the temples and Valley of the Kings from above as the sun rose was absolutely breathtaking.",
        tour: "Luxor Hot Air Balloon",
        date: "January 2024",
      },
      {
        name: "Isabella Martinez",
        location: "Buenos Aires, Argentina",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Pyramids Sound and Light Show was a unique experience. The narration was informative and seeing the monuments illuminated at night was spectacular.",
        tour: "Pyramids Sound & Light Show",
        date: "April 2024",
      },
    ],
    viator: [
      {
        name: "Hiroshi Tanaka",
        location: "Tokyo, Japan",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Seeing Luxor from a hot air balloon at sunrise was the highlight of our trip to Egypt. The views were spectacular and the pilot was very skilled. Worth every penny!",
        tour: "Luxor Hot Air Balloon",
        date: "March 2024",
      },
      {
        name: "Priya Patel",
        location: "Mumbai, India",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Pyramids Sound and Light Show was magical! Seeing the Sphinx and Pyramids illuminated at night while learning about their history was an unforgettable experience.",
        tour: "Pyramids Sound & Light Show",
        date: "January 2024",
      },
      {
        name: "Thomas Schmidt",
        location: "Berlin, Germany",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4,
        text: "The Red Sea snorkeling was amazing with beautiful coral and fish. The boat was comfortable and the crew was friendly. Lunch could have been better, but overall a great day.",
        tour: "Hurghada Snorkeling Trip",
        date: "February 2024",
      },
      {
        name: "Sophie Dubois",
        location: "Paris, France",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Our day trip to Luxor was perfectly organized. The Valley of the Kings, Karnak Temple, and Hatshepsut Temple were all incredible. Our guide's knowledge was impressive.",
        tour: "Luxor Day Trip",
        date: "December 2022",
      },
      {
        name: "Carlos Rodriguez",
        location: "Mexico City, Mexico",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Abu Simbel temples were worth the early morning start. These massive structures are even more impressive in person than in photos. Our guide provided fascinating historical context.",
        tour: "Abu Simbel Day Trip",
        date: "March 2024",
      },
      {
        name: "Anna Kowalski",
        location: "Warsaw, Poland",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4,
        text: "The Cairo food tour was a delightful experience. We tried so many delicious Egyptian dishes and our guide shared interesting cultural insights about the cuisine.",
        tour: "Cairo Food Tour",
        date: "January 2024",
      },
    ],
    klook: [
      {
        name: "Wei Chen",
        location: "Shanghai, China",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Nile dinner cruise exceeded our expectations. The food was delicious, and the entertainment with traditional dancing was very enjoyable. Beautiful views of Cairo at night.",
        tour: "Nile Dinner Cruise",
        date: "February 2024",
      },
      {
        name: "Akira Tanaka",
        location: "Osaka, Japan",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Our guide for the Giza Pyramids tour was extremely knowledgeable and spoke excellent English. He took great photos for us and was very patient with all our questions.",
        tour: "Giza Pyramids & Sphinx",
        date: "March 2024",
      },
      {
        name: "Ji-Yeon Kim",
        location: "Seoul, South Korea",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4,
        text: "The Islamic Cairo walking tour was fascinating. The mosques and markets were beautiful, and our guide provided excellent historical and cultural context.",
        tour: "Islamic Cairo Tour",
        date: "January 2024",
      },
      {
        name: "Raj Patel",
        location: "Delhi, India",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Pyramids of Giza were even more impressive than I imagined. Our guide was very knowledgeable and took us to the best spots for photos. The camel ride was a fun addition to the experience.",
        tour: "Giza Pyramids & Sphinx",
        date: "April 2024",
      },
      {
        name: "Liu Wei",
        location: "Beijing, China",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "The Alexandria day trip was excellent. The Library of Alexandria and the catacombs were fascinating. Our guide was very informative and the seafood lunch was delicious.",
        tour: "Alexandria Day Trip",
        date: "February 2024",
      },
      {
        name: "Siti Rahman",
        location: "Kuala Lumpur, Malaysia",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4,
        text: "The Luxor temples tour was amazing. Karnak Temple is enormous and impressive. The guide's explanations helped us understand the historical significance of everything we saw.",
        tour: "Luxor Temples Tour",
        date: "March 2024",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/logo.png?height=600&width=1600"
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
                  "{review.text}"
                </p>

                <div className="text-sm text-muted-foreground pt-4 border-t-2 border-egyptian-gold/10">
                  <span className="font-semibold text-foreground">Tour:</span>{" "}
                  <span className="text-egyptian-gold">{review.tour}</span> • {review.date}
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
                          "{review.text}"
                        </p>

                        <div className="text-xs text-muted-foreground pt-4 border-t-2 border-egyptian-gold/10">
                          <span className="font-semibold text-foreground">
                            Tour:
                          </span>{" "}
                          <span className="text-egyptian-gold">{review.tour}</span>
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
                reviewBody: review.text,
                datePublished: review.date,
                itemReviewed: {
                  "@type": "TouristTrip",
                  name: review.tour || "Egypt Tour",
                },
              })),
            ],
          }),
        }}
      />
    </div>
  );
}
