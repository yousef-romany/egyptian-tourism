import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
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
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/logo.png?height=600&width=1600"
            alt="Egyptian temples"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Customer Reviews
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Discover what our guests have to say about their Egyptian
              adventures with Egydise Tours.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-[#d4af37] fill-[#d4af37]"
                  />
                ))}
              </div>
              <span className="text-xl font-bold">4.9/5</span>
              <span className="text-white/80">based on 1,200+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-4">
          Review Now
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's review now, give your opionen
        </p>

        <EgyptianDivider />

        <WidgetTripadvisor />
      </section>

      <section className="container py-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-4">
          Featured Reviews
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here's what some of our recent travelers have shared about their
          experiences with Egydise Tours.
        </p>

        <EgyptianDivider />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {featuredReviews.map((review, index) => (
            <Card
              key={index}
              className="border-egyptian-gold/20 overflow-hidden"
            >
              <CardContent className="p-6 relative">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-egyptian-gold/10" />
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
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

                <p className="text-muted-foreground mb-4 italic">
                  "{review.text}"
                </p>

                <div className="text-sm text-muted-foreground pt-4 border-t border-egyptian-gold/10">
                  <span className="font-medium text-foreground">Tour:</span>{" "}
                  {review.tour} • {review.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-4">
            Reviews from Around the Web
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Read authentic reviews from travelers who booked through various
            platforms.
          </p>

          <Tabs defaultValue="tripadvisor" className="mt-8">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger
                  value="tripadvisor"
                  className="data-[state=active]:bg-[#00aa6c] data-[state=active]:text-white"
                >
                  TripAdvisor
                </TabsTrigger>
                <TabsTrigger
                  value="viator"
                  className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
                >
                  Viator
                </TabsTrigger>
                <TabsTrigger
                  value="klook"
                  className="data-[state=active]:bg-[#ff5722] data-[state=active]:text-white"
                >
                  Klook
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(platformReviews).map(([platform, reviews]) => (
              <TabsContent key={platform} value={platform} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews.map((review, index) => (
                    <Card
                      key={index}
                      className="border-egyptian-gold/20 h-full"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {review.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
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

                        <p className="text-sm text-muted-foreground mb-4 italic">
                          "{review.text}"
                        </p>

                        <div className="text-xs text-muted-foreground pt-3 border-t border-egyptian-gold/10">
                          <span className="font-medium text-foreground">
                            Tour:
                          </span>{" "}
                          {review.tour}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
                  >
                    View More Reviews
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-[#0c1e35] text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Share Your Experience
              </h2>
              <p className="text-white/80 mb-6">
                Have you traveled with us? We'd love to hear about your
                experience. Your feedback helps us improve and assists other
                travelers in planning their perfect Egyptian adventure.
              </p>
              <Button className="bg-[#d4af37] hover:bg-[#c09c2c] text-black">
                Write a Review
              </Button>
            </div>
            <div className="relative h-64 md:h-auto">
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
    </div>
  );
}
