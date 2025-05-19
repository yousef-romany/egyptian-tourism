import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"
import EgyptianDivider from "@/components/egyptian-divider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Newsletter from "@/components/newsletter"

export const metadata = {
  title: "Tours - Egydise Tours",
  description:
    "Explore our wide range of Egyptian tours, from the pyramids of Giza to the temples of Luxor and beyond.",
}

export default function ToursPage() {
  const tours = [
    {
      id: 1,
      title: "Giza Pyramids & Sphinx",
      image: "/placeholder.svg?height=300&width=400",
      duration: "8 hours",
      location: "Cairo",
      price: "$89",
      rating: 4.9,
      reviews: 245,
      description:
        "Explore the iconic Pyramids of Giza and the Great Sphinx with an expert Egyptologist guide. Learn about the history and mysteries of these ancient wonders.",
      category: "Historical",
      groupSize: "Up to 15 people",
    },
    {
      id: 2,
      title: "Luxor Valley of Kings",
      image: "/placeholder.svg?height=300&width=400",
      duration: "10 hours",
      location: "Luxor",
      price: "$120",
      rating: 4.8,
      reviews: 189,
      description:
        "Discover the Valley of the Kings, the final resting place of many pharaohs including Tutankhamun. Visit the Temple of Hatshepsut and the Colossi of Memnon.",
      category: "Historical",
      groupSize: "Up to 12 people",
    },
    {
      id: 3,
      title: "Nile Dinner Cruise",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Cairo",
      price: "$65",
      rating: 4.7,
      reviews: 312,
      description:
        "Enjoy a magical evening on the Nile with a gourmet dinner and traditional entertainment including belly dancing and a Tanoura show.",
      category: "Cultural",
      groupSize: "Up to 50 people",
    },
    {
      id: 4,
      title: "Alexandria Day Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Alexandria",
      price: "$95",
      rating: 4.6,
      reviews: 178,
      description:
        "Visit the Mediterranean jewel of Egypt. Explore the Catacombs of Kom El Shoqafa, Pompey's Pillar, the Citadel of Qaitbay, and the modern Library of Alexandria.",
      category: "Historical",
      groupSize: "Up to 15 people",
    },
    {
      id: 5,
      title: "Abu Simbel Temples",
      image: "/placeholder.svg?height=300&width=400",
      duration: "12 hours",
      location: "Aswan",
      price: "$140",
      rating: 4.9,
      reviews: 156,
      description:
        "Marvel at the colossal temples of Abu Simbel, built by Ramses II. Learn about the UNESCO project that saved these monuments from the rising waters of Lake Nasser.",
      category: "Historical",
      groupSize: "Up to 15 people",
    },
    {
      id: 6,
      title: "Luxor Hot Air Balloon",
      image: "/placeholder.svg?height=300&width=400",
      duration: "3 hours",
      location: "Luxor",
      price: "$120",
      rating: 4.9,
      reviews: 203,
      description:
        "Experience the magic of Luxor from above with a sunrise hot air balloon ride. See the Valley of the Kings, the Nile, and the temples from a unique perspective.",
      category: "Adventure",
      groupSize: "Up to 20 people",
    },
    {
      id: 7,
      title: "Hurghada Snorkeling Trip",
      image: "/placeholder.svg?height=300&width=400",
      duration: "7 hours",
      location: "Hurghada",
      price: "$75",
      rating: 4.7,
      reviews: 289,
      description:
        "Discover the underwater wonders of the Red Sea. Snorkel among colorful coral reefs and exotic fish with professional guides.",
      category: "Adventure",
      groupSize: "Up to 20 people",
    },
    {
      id: 8,
      title: "Cairo Food Tour",
      image: "/placeholder.svg?height=300&width=400",
      duration: "4 hours",
      location: "Cairo",
      price: "$55",
      rating: 4.8,
      reviews: 167,
      description:
        "Taste your way through Cairo's vibrant food scene. Sample traditional Egyptian dishes, street food, and local delicacies with a knowledgeable food guide.",
      category: "Cultural",
      groupSize: "Up to 10 people",
    },
    {
      id: 9,
      title: "Pyramids Sound & Light Show",
      image: "/placeholder.svg?height=300&width=400",
      duration: "2 hours",
      location: "Cairo",
      price: "$45",
      rating: 4.5,
      reviews: 231,
      description:
        "Experience the Pyramids and Sphinx illuminated at night with a spectacular sound and light show that tells the story of ancient Egypt.",
      category: "Cultural",
      groupSize: "Up to 100 people",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian temples"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Our Tours</h1>
            <p className="text-lg text-white/80 mb-6">
              Discover the wonders of Egypt with our expertly crafted tours led by professional Egyptologists.
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-8">
          
          {/* <div className="bg-muted p-6 rounded-lg h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-sm">
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tours..." className="pl-8" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Tour Categories</h3>
                <div className="space-y-2">
                  {["Historical", "Cultural", "Adventure", "Relaxation"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.toLowerCase()}`} />
                      <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Locations</h3>
                <div className="space-y-2">
                  {["Cairo", "Luxor", "Aswan", "Alexandria", "Hurghada"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox id={`location-${location.toLowerCase()}`} />
                      <Label htmlFor={`location-${location.toLowerCase()}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  {["1-3 hours", "4-6 hours", "7-12 hours", "Full day", "Multi-day"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox id={`duration-${duration.toLowerCase().replace(/\s+/g, "-")}`} />
                      <Label htmlFor={`duration-${duration.toLowerCase().replace(/\s+/g, "-")}`}>{duration}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-muted-foreground">$0 - $500</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mb-6">
                  <div className="w-3/4 h-full bg-egyptian-gold rounded-full"></div>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Apply Filters
            </Button>
          </div> */}

          <div>

            {/* <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Tours</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="border rounded-md p-1 text-sm">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration</option>
                  <option>Rating</option>
                </select>
              </div>
            </div> */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300"
                >
                  <div className="relative">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      width={400}
                      height={300}
                      className="h-[200px] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">{tour.price}</Badge>
                    <Badge className="absolute bottom-3 left-3 bg-white/80 text-black">{tour.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2">{tour.title}</h3>
                    <div className="flex items-center gap-1 mb-2 text-amber-500">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(tour.rating) ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{tour.rating}</span>
                      <span className="text-xs text-muted-foreground">({tour.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                    <Button asChild className="w-full bg-[#0c1e35] hover:bg-[#1a3a5f]">
                      <Link href={`/tours/${tour.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0">
                  3
                </Button>
                <span>...</span>
                <Button variant="outline" className="h-8 w-8 p-0">
                  8
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        (
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Why Choose Our Tours?</h2>
              <EgyptianDivider className="my-6 max-w-xs" />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expert Egyptologist Guides</h3>
                    <p className="text-muted-foreground">
                      Our guides are certified Egyptologists with deep knowledge of Egyptian history, archaeology, and
                      culture.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Safety & Comfort</h3>
                    <p className="text-muted-foreground">
                      Your safety and comfort are our top priorities, with well-maintained vehicles and carefully
                      selected accommodations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <path d="M20 7h-9" />
                      <path d="M14 17H5" />
                      <circle cx="17" cy="17" r="3" />
                      <circle cx="7" cy="7" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Customizable Experiences</h3>
                    <p className="text-muted-foreground">
                      We tailor each tour to your interests, ensuring you experience Egypt your way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-egyptian-gold/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-egyptian-gold/10 rounded-full"></div>
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Tour guide with tourists at the pyramids"
                width={500}
                height={600}
                className="rounded-lg object-cover h-[500px] w-full relative z-10"
              />
            </div>
          </div>
        </div>
        )
      </section>

      <section className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about our tours and travel in Egypt.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">What should I pack for my trip to Egypt?</h3>;
              <p className="text-muted-foreground">
                We recommend lightweight, modest clothing that covers shoulders and knees, comfortable walking shoes, a
                hat, sunglasses, sunscreen, and a light jacket for evenings.
              </p>
            </CardContent>
          </Card>

          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Is Egypt safe for tourists?</h3>; ;
              <p className="text-muted-foreground">
                Yes, tourist areas in Egypt are generally very safe and well-protected. The Egyptian government places a
                high priority on tourism safety, with dedicated tourist police at all major sites.
              </p>
            </CardContent>
          </Card>

          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">What is the best time to visit Egypt?</h3>
              <p className="text-muted-foreground">
                The most comfortable time to visit Egypt is from October to April when temperatures are milder. December
                and January are peak tourist months.
              </p>
            </CardContent>
          </Card>

          <Card className="border-egyptian-gold/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Do I need a visa to visit Egypt?</h3>
              <p className="text-muted-foreground">
                Most visitors need a visa to enter Egypt. Many nationalities can obtain a visa on arrival at Egyptian
                airports for approximately $25 USD, or apply for an e-visa online before travel.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10"
          >
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </section>

      <section className="bg-[#0c1e35] text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6 text-egyptian-gold">Ready to Experience Egypt?</h2>
            <p className="text-white/80 mb-8">
              Book your dream Egyptian adventure today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                <Link href="/book-now">Book Now</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
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

import { Star, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

