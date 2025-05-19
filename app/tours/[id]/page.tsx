import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock, Users, Calendar, CheckCircle, Info, AlertCircle } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

// Define the tour data type
type Tour = {
  id: number
  title: string
  images: string[]
  duration: string
  location: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
  groupSize: string
  highlights: string[]
  itinerary: {
    day: number
    title: string
    description: string
    meals: string[]
    accommodation?: string
  }[]
  included: string[]
  excluded: string[]
  faqs: {
    question: string
    answer: string
  }[]
  relatedTours: number[]
}

// This would typically come from a CMS or database
const toursData: Record<number, Tour> = {
  1: {
    id: 1,
    title: "Giza Pyramids & Sphinx",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "8 hours",
    location: "Cairo",
    price: "$89",
    rating: 4.9,
    reviews: 245,
    description:
      "Explore the iconic Pyramids of Giza and the Great Sphinx with an expert Egyptologist guide. Learn about the history and mysteries of these ancient wonders, marvel at the engineering feats of the ancient Egyptians, and discover the fascinating stories behind these monumental structures that have stood for over 4,500 years.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "Visit the Great Pyramid of Khufu, the oldest and largest of the three pyramids",
      "See the enigmatic Great Sphinx, with the body of a lion and the head of a pharaoh",
      "Explore the Valley Temple where mummification took place",
      "Enjoy panoramic views of the pyramids from the perfect photo spot",
      "Learn about ancient Egyptian history from your certified Egyptologist guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pyramids of Giza & Sphinx Tour",
        description:
          "Your expert guide will pick you up from your hotel in Cairo or Giza at 8:00 AM. Begin your tour at the Great Pyramid of Khufu, the oldest and largest of the three pyramids in the Giza complex. You'll have the option to enter the pyramid (additional ticket required). Next, visit the middle pyramid of Khafre and the smallest pyramid of Menkaure. Continue to the Great Sphinx, the legendary guardian with the head of a pharaoh and body of a lion. Explore the Valley Temple where mummification of King Khafre took place. Enjoy a panoramic view of the pyramids from the perfect photo spot. Your tour ends around 4:00 PM with drop-off at your hotel.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to the Giza Plateau",
      "Bottled water",
      "Lunch at a local restaurant",
    ],
    excluded: [
      "Entrance to the inside of the pyramids (available for purchase)",
      "Camel or horse rides (available for purchase)",
      "Gratuities",
      "Personal expenses",
    ],
    faqs: [
      {
        question: "Is this tour suitable for children?",
        answer:
          "Yes, this tour is suitable for travelers of all ages. Children will be fascinated by the pyramids and sphinx, and our guides are experienced in making history engaging for young visitors.",
      },
      {
        question: "Can I enter the pyramids?",
        answer:
          "Yes, you can enter the Great Pyramid or one of the smaller pyramids for an additional fee (approximately $20-30 USD). This is not included in the tour price and is optional.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "This tour involves a moderate amount of walking on uneven terrain. Comfortable walking shoes are recommended. The total walking distance is approximately 2-3 kilometers.",
      },
      {
        question: "What should I wear?",
        answer:
          "We recommend lightweight, comfortable clothing and closed-toe walking shoes. A hat, sunglasses, and sunscreen are essential as there is limited shade at the pyramids. In respect of local customs, shoulders and knees should be covered.",
      },
    ],
    relatedTours: [2, 4, 9],
  },
  2: {
    id: 2,
    title: "Luxor Valley of Kings",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "10 hours",
    location: "Luxor",
    price: "$120",
    rating: 4.8,
    reviews: 189,
    description:
      "Discover the Valley of the Kings, the final resting place of many pharaohs including Tutankhamun. Visit the Temple of Hatshepsut and the Colossi of Memnon on this comprehensive tour of Luxor's West Bank with an expert Egyptologist guide.",
    category: "Historical",
    groupSize: "Up to 12 people",
    highlights: [
      "Explore the Valley of the Kings, including entry to 3 royal tombs",
      "Visit the magnificent Temple of Hatshepsut at Deir el-Bahari",
      "See the Colossi of Memnon, two massive stone statues of Pharaoh Amenhotep III",
      "Learn about ancient Egyptian burial practices and afterlife beliefs",
      "Enjoy personalized attention in a small group setting",
    ],
    itinerary: [
      {
        day: 1,
        title: "Luxor West Bank Tour",
        description:
          "Your guide will pick you up from your Luxor hotel or Nile cruise ship at 7:00 AM. Cross to the West Bank of the Nile and begin your exploration at the Valley of the Kings, where pharaohs of the New Kingdom were buried in elaborate tombs. Visit three different royal tombs (entry to Tutankhamun's tomb available for additional fee). Continue to the Temple of Hatshepsut, the mortuary temple of Egypt's most successful female pharaoh, set against the dramatic backdrop of limestone cliffs. Finally, stop at the Colossi of Memnon, two massive stone statues of Pharaoh Amenhotep III that have stood for over 3,400 years. Return to your hotel or cruise ship around 5:00 PM.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel/cruise ship pickup and drop-off",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to Valley of the Kings (3 tombs), Temple of Hatshepsut, and Colossi of Memnon",
      "Bottled water",
      "Lunch at a local restaurant",
    ],
    excluded: ["Entry to special tombs like Tutankhamun's (available for purchase)", "Gratuities", "Personal expenses"],
    faqs: [
      {
        question: "Which tombs will we visit in the Valley of the Kings?",
        answer:
          "The three tombs you'll visit depend on the rotation system managed by the antiquities authority. Your guide will recommend the most interesting tombs open on the day of your visit.",
      },
      {
        question: "Is photography allowed in the tombs?",
        answer:
          "Photography is generally not allowed inside the tombs in the Valley of the Kings. Some tombs may permit photography with an additional camera ticket, but no flash photography is allowed.",
      },
      {
        question: "How hot does it get in Luxor?",
        answer:
          "Luxor can be extremely hot, especially in summer months (June-August) when temperatures can exceed 40°C (104°F). We recommend starting the tour early and bringing plenty of water, sunscreen, and a hat.",
      },
    ],
    relatedTours: [3, 5, 6],
  },
  3: {
    id: 3,
    title: "Nile Dinner Cruise",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "3 hours",
    location: "Cairo",
    price: "$65",
    rating: 4.7,
    reviews: 312,
    description:
      "Enjoy a magical evening on the Nile with a gourmet dinner and traditional entertainment including belly dancing and a Tanoura show. See Cairo's illuminated skyline from the water while cruising on one of Egypt's most iconic vessels.",
    category: "Cultural",
    groupSize: "Up to 50 people",
    highlights: [
      "Cruise along the Nile River on a traditional boat",
      "Enjoy a delicious buffet dinner with Egyptian and international cuisine",
      "Watch traditional entertainment including belly dancing and Tanoura show",
      "See Cairo's illuminated skyline from the water",
      "Hotel pickup and drop-off included for convenience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Evening Nile Cruise",
        description:
          "Your evening begins with pickup from your Cairo hotel around 6:30 PM. Transfer to the dock to board your dinner cruise boat. As you sail along the Nile, enjoy the views of Cairo's illuminated skyline. A delicious open buffet dinner will be served, featuring a variety of Egyptian and international dishes. During dinner, enjoy entertainment including a belly dancer, a folkloric show, and a spinning Tanoura performance. After approximately 2 hours on the water, return to the dock where your driver will be waiting to transfer you back to your hotel around 9:30 PM.",
        meals: ["Dinner"],
      },
    ],
    included: [
      "Hotel pickup and drop-off",
      "Transportation in air-conditioned vehicle",
      "2-hour Nile cruise",
      "Open buffet dinner",
      "Mineral water and one soft drink",
      "Entertainment program (belly dancing, folkloric show, Tanoura)",
    ],
    excluded: ["Alcoholic beverages (available for purchase)", "Gratuities", "Personal expenses"],
    faqs: [
      {
        question: "Is there a dress code for the dinner cruise?",
        answer:
          "Smart casual attire is recommended. While there's no strict dress code, we suggest avoiding shorts and beachwear.",
      },
      {
        question: "Are alcoholic beverages available?",
        answer:
          "Yes, alcoholic beverages are available for purchase on board. The cruise includes one soft drink, and additional drinks can be purchased separately.",
      },
      {
        question: "Is this cruise suitable for children?",
        answer:
          "Yes, children are welcome on the cruise. They often enjoy the entertainment, especially the Tanoura show with its colorful spinning costumes.",
      },
    ],
    relatedTours: [1, 8, 9],
  },
  4: {
    id: 4,
    title: "Alexandria Day Trip",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "12 hours",
    location: "Alexandria",
    price: "$95",
    rating: 4.6,
    reviews: 178,
    description:
      "Visit the Mediterranean jewel of Egypt. Explore the Catacombs of Kom El Shoqafa, Pompey's Pillar, the Citadel of Qaitbay, and the modern Library of Alexandria on this comprehensive day trip from Cairo.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "Explore the mysterious Catacombs of Kom El Shoqafa",
      "Visit Pompey's Pillar, one of the largest ancient monolithic columns",
      "See the Citadel of Qaitbay, built on the site of the ancient Lighthouse of Alexandria",
      "Tour the modern Library of Alexandria, inspired by the ancient Great Library",
      "Enjoy Mediterranean views and seafood lunch",
    ],
    itinerary: [
      {
        day: 1,
        title: "Alexandria Day Tour",
        description:
          "Early morning pickup from your Cairo hotel around 7:00 AM for the 3-hour drive to Alexandria. Begin your tour at the Catacombs of Kom El Shoqafa, an underground necropolis dating from the 2nd century AD that shows a fascinating blend of Egyptian, Greek, and Roman art. Continue to Pompey's Pillar, a massive 25-meter tall granite column erected in 297 AD. After lunch at a local seafood restaurant overlooking the Mediterranean, visit the Citadel of Qaitbay, a 15th-century defensive fortress built on the site of the ancient Lighthouse of Alexandria, one of the Seven Wonders of the Ancient World. End your tour at the modern Library of Alexandria, inspired by the ancient Great Library. Return to Cairo with drop-off at your hotel around 7:00 PM.",
        meals: ["Lunch"],
      },
    ],
    included: [
      "Hotel pickup and drop-off in Cairo",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to all mentioned sites",
      "Seafood lunch at a local restaurant",
      "Bottled water",
    ],
    excluded: ["Entry to the Library of Alexandria Reading Room (if desired)", "Gratuities", "Personal expenses"],
    faqs: [
      {
        question: "How long is the drive from Cairo to Alexandria?",
        answer:
          "The drive from Cairo to Alexandria takes approximately 3 hours each way, depending on traffic conditions.",
      },
      {
        question: "Is Alexandria very different from Cairo?",
        answer:
          "Yes, Alexandria has a distinctly Mediterranean atmosphere compared to Cairo. The city has a more European feel, with different architecture, cuisine, and a more relaxed pace.",
      },
      {
        question: "Will we see anything related to Cleopatra?",
        answer:
          "While Cleopatra's palace is believed to be underwater in Alexandria's Eastern Harbor, you'll learn about the Ptolemaic period when she ruled. The Citadel stands near where the ancient Lighthouse stood, which was active during her reign.",
      },
    ],
    relatedTours: [1, 8, 9],
  },
  5: {
    id: 5,
    title: "Abu Simbel Temples",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "12 hours",
    location: "Aswan",
    price: "$140",
    rating: 4.9,
    reviews: 156,
    description:
      "Marvel at the colossal temples of Abu Simbel, built by Ramses II. Learn about the UNESCO project that saved these monuments from the rising waters of Lake Nasser in one of the greatest archaeological rescue operations in history.",
    category: "Historical",
    groupSize: "Up to 15 people",
    highlights: [
      "Visit the magnificent temples of Abu Simbel, a UNESCO World Heritage site",
      "See the Great Temple of Ramses II with its four colossal statues",
      "Explore the smaller Temple of Hathor, dedicated to Queen Nefertari",
      "Learn about the incredible UNESCO rescue operation that relocated the temples",
      "Experience one of ancient Egypt's most impressive monuments",
    ],
    itinerary: [
      {
        day: 1,
        title: "Abu Simbel Day Trip",
        description:
          "Very early morning pickup from your hotel or cruise ship in Aswan around 4:00 AM to join the convoy to Abu Simbel (approximately 3-hour drive). Upon arrival, your Egyptologist guide will lead you through the Great Temple of Ramses II, with its four colossal statues of the pharaoh at the entrance, each 20 meters high. Inside, explore the hypostyle halls and sanctuary where statues of Ramses II and the gods Amun, Ra-Horakhty, and Ptah sit. Next, visit the smaller Temple of Hathor, dedicated to Queen Nefertari. Your guide will explain how these massive temples were moved piece by piece in the 1960s to save them from the rising waters of Lake Nasser after the construction of the Aswan High Dam. After approximately 2 hours at the site, return to Aswan with arrival at your hotel or cruise ship around 4:00 PM.",
        meals: ["Breakfast box"],
      },
    ],
    included: [
      "Hotel/cruise ship pickup and drop-off in Aswan",
      "Transportation in air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to Abu Simbel temples",
      "Breakfast box",
      "Bottled water",
    ],
    excluded: ["Gratuities", "Personal expenses", "Optional photo permits inside temples"],
    faqs: [
      {
        question: "Why do we need to leave so early in the morning?",
        answer:
          "The early departure is necessary because all vehicles travel to Abu Simbel in a convoy for security reasons. The early start also helps avoid the midday heat at the site.",
      },
      {
        question: "How much time will we have at the temples?",
        answer:
          "You'll have approximately 2 hours at the Abu Simbel temples, which is sufficient to explore both temples and learn about their history and relocation.",
      },
      {
        question: "Is photography allowed inside the temples?",
        answer:
          "Yes, photography is allowed at Abu Simbel. However, there may be an additional fee for using cameras inside the temples. Flash photography is not permitted to protect the ancient carvings and paintings.",
      },
    ],
    relatedTours: [2, 6, 7],
  },
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const tour = toursData[id]

  if (!tour) {
    return {
      title: "Tour Not Found - Egydise Tours",
      description: "The requested tour could not be found.",
    }
  }

  return {
    title: `${tour.title} - Egydise Tours`,
    description: tour.description.substring(0, 160) + "...",
  }
}

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const tour = toursData[id]

  // Handle case where tour doesn't exist
  if (!tour) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
        <p className="mb-8">The tour you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
          <Link href="/tours">Browse All Tours</Link>
        </Button>
      </div>
    )
  }

  // Get related tours
  const relatedToursData = tour.relatedTours
    .map((id) => toursData[id])
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image src={tour.images[0] || "/placeholder.svg"} alt={tour.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-egyptian-gold text-black">{tour.category}</Badge>
              <Badge className="bg-white/20">{tour.location}</Badge>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-egyptian-gold" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-egyptian-gold" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-egyptian-gold" />
                <span>{tour.groupSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(tour.rating) ? "text-egyptian-gold fill-egyptian-gold" : "text-white/30"}`}
                    />
                  ))}
                </div>
                <span>{tour.rating}</span>
                <span className="text-white/80">({tour.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-lg text-white/80">{tour.description}</p>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {tour.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden ${index === 0 ? "col-span-2 h-80" : "h-40"}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${tour.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full flex flex-wrap">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>

                <EgyptianDivider className="my-8" />

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Important Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Confirmation</p>
                        <p className="text-muted-foreground">
                          You'll receive a confirmation email within 24 hours of booking.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Accessibility</p>
                        <p className="text-muted-foreground">
                          Not wheelchair accessible. Moderate amount of walking required.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Cancellation Policy</p>
                        <p className="text-muted-foreground">Free cancellation up to 24 hours before the start time.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Group Size</p>
                        <p className="text-muted-foreground">{tour.groupSize}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center text-egyptian-gold font-bold">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold">{day.title}</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">{day.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Meals included:</span>
                      {day.meals.map((meal, i) => (
                        <Badge key={i} variant="outline" className="bg-egyptian-gold/10">
                          {meal}
                        </Badge>
                      ))}
                    </div>
                    {day.accommodation && (
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <span className="font-medium">Accommodation:</span>
                        <span>{day.accommodation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                    <ul className="space-y-2">
                      {tour.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground flex-shrink-0 mt-0.5"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faqs" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {tour.faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-6 last:border-0">
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-24 border-egyptian-gold/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-egyptian-gold mb-4">{tour.price}</div>
                <p className="text-sm text-muted-foreground mb-6">per person</p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Date</span>
                    <Button variant="outline" size="sm" className="h-8">
                      Select Date
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                        -
                      </Button>
                      <span className="w-8 text-center">2</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>{tour.price} x 2 guests</span>
                    <span>${Number.parseInt(tour.price.substring(1)) * 2}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${Number.parseInt(tour.price.substring(1)) * 2}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                  <Link href={`/book-now?tour=${tour.id}`}>Book Now</Link>
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Not ready to book?{" "}
                    <Link href="/contact" className="text-egyptian-gold hover:underline">
                      Contact us
                    </Link>{" "}
                    with questions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {relatedToursData.length > 0 && (
        <section className="bg-muted py-16">
          <div className="container">
            <h2 className="text-3xl font-heading font-bold text-center mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedToursData.map((relatedTour) => (
                <Card
                  key={relatedTour.id}
                  className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300"
                >
                  <div className="relative">
                    <Image
                      src={relatedTour.images[0] || "/placeholder.svg"}
                      alt={relatedTour.title}
                      width={400}
                      height={300}
                      className="h-[200px] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                      {relatedTour.price}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2">{relatedTour.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(relatedTour.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{relatedTour.rating}</span>
                      <span className="text-xs text-muted-foreground">({relatedTour.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{relatedTour.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{relatedTour.duration}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-[#0c1e35] hover:bg-[#1a3a5f]">
                      <Link href={`/tours/${relatedTour.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  )
}

