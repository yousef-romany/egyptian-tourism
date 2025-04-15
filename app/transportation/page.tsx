import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Car, Users, Calendar, MapPin, Star, ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

export const metadata: Metadata = {
  title: "Transportation & Drivers - Egydise Tours",
  description: "Book reliable transportation and professional drivers for your Egyptian adventure.",
}

export default function TransportationPage() {
  const transportOptions = [
    {
      id: 1,
      type: "Standard Sedan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-3 passengers",
      features: ["Air conditioning", "Professional driver", "Bottled water", "Wi-Fi"],
      pricePerDay: "$60",
      pricePerHour: "$15",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      type: "Premium Sedan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-3 passengers",
      features: ["Air conditioning", "Professional driver", "Bottled water", "Wi-Fi", "Leather seats", "Refreshments"],
      pricePerDay: "$90",
      pricePerHour: "$25",
      rating: 4.9,
      reviews: 124,
    },
    {
      id: 3,
      type: "SUV",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-5 passengers",
      features: ["Air conditioning", "Professional driver", "Bottled water", "Wi-Fi", "Spacious trunk"],
      pricePerDay: "$100",
      pricePerHour: "$30",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 4,
      type: "Minivan",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-7 passengers",
      features: ["Air conditioning", "Professional driver", "Bottled water", "Wi-Fi", "Spacious seating"],
      pricePerDay: "$120",
      pricePerHour: "$35",
      rating: 4.8,
      reviews: 87,
    },
    {
      id: 5,
      type: "Luxury Van",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "1-9 passengers",
      features: [
        "Air conditioning",
        "Professional driver",
        "Bottled water",
        "Wi-Fi",
        "Leather seats",
        "TV screens",
        "Refreshments",
      ],
      pricePerDay: "$180",
      pricePerHour: "$45",
      rating: 4.9,
      reviews: 62,
    },
    {
      id: 6,
      type: "Coach Bus",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "Up to 45 passengers",
      features: ["Air conditioning", "Professional driver", "Bottled water", "Wi-Fi", "Restroom", "Reclining seats"],
      pricePerDay: "$450",
      pricePerHour: "$120",
      rating: 4.8,
      reviews: 45,
    },
  ]

  const featuredDrivers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      image: "/placeholder.svg?height=200&width=200",
      experience: "15 years",
      languages: ["English", "Arabic", "French"],
      specialties: ["Cairo city tours", "Desert excursions"],
      rating: 4.9,
      reviews: 245,
    },
    {
      id: 2,
      name: "Mohammed Ali",
      image: "/placeholder.svg?height=200&width=200",
      experience: "12 years",
      languages: ["English", "Arabic", "German"],
      specialties: ["Luxor & Aswan", "Historical sites"],
      rating: 4.8,
      reviews: 189,
    },
    {
      id: 3,
      name: "Fatima Nour",
      image: "/placeholder.svg?height=200&width=200",
      experience: "8 years",
      languages: ["English", "Arabic", "Spanish"],
      specialties: ["Alexandria tours", "Family trips"],
      rating: 4.9,
      reviews: 156,
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Our driver Ahmed was exceptional! He was punctual, professional, and extremely knowledgeable about Egyptian history and culture. He made our trip so much more enjoyable with his insights and recommendations.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "The luxury van we booked was immaculate and very comfortable. Our driver was friendly and accommodating, adjusting our itinerary when we wanted to spend more time at certain sites. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Sydney, Australia",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "As a solo female traveler, I was concerned about transportation in Egypt. My driver Fatima was amazing - she made me feel safe and comfortable throughout my trip, and shared wonderful insights about life in Egypt.",
      rating: 5,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape with car"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Transportation & Drivers</h1>
            <p className="text-lg text-white/80 mb-6">
              Reliable transportation and professional drivers for a seamless Egyptian adventure
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Our Transportation Options</h2>
          <p className="text-muted-foreground">
            Choose from our fleet of well-maintained vehicles with professional drivers to ensure comfortable and safe
            travel throughout Egypt
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sedan">Sedans</TabsTrigger>
            <TabsTrigger value="suv">SUVs & Vans</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transportOptions.map((option) => (
            <Card
              key={option.id}
              className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-48">
                <Image src={option.image || "/placeholder.svg"} alt={option.type} fill className="object-cover" />
                <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                  From {option.pricePerDay}/day
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{option.type}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {option.capacity}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(option.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{option.rating}</span>
                  <span className="text-xs text-muted-foreground">({option.reviews} reviews)</span>
                </div>

                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="space-y-1 mb-4">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <Check className="h-4 w-4 text-egyptian-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border rounded-md p-2 text-center">
                    <p className="text-muted-foreground">Per Day</p>
                    <p className="font-bold">{option.pricePerDay}</p>
                  </div>
                  <div className="border rounded-md p-2 text-center">
                    <p className="text-muted-foreground">Per Hour</p>
                    <p className="font-bold">{option.pricePerHour}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Our Featured Drivers</h2>
            <p className="text-muted-foreground">
              Meet some of our experienced and highly-rated drivers who will enhance your Egyptian experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDrivers.map((driver) => (
              <Card key={driver.id} className="border-egyptian-gold/20 overflow-hidden">
                <div className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-egyptian-gold/20">
                    <Image
                      src={driver.image || "/placeholder.svg"}
                      alt={driver.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
                  <p className="text-muted-foreground mb-3">Experience: {driver.experience}</p>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.floor(driver.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{driver.rating}</span>
                    <span className="text-xs text-muted-foreground">({driver.reviews} reviews)</span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div>
                      <p className="text-sm font-medium">Languages:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {driver.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="bg-egyptian-gold/10">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Specialties:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {driver.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="bg-egyptian-gold/10">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                    Request This Driver
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Why Choose Our Transportation Services?</h2>
            <EgyptianDivider className="my-6 max-w-xs" />

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Car className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Well-Maintained Fleet</h3>
                  <p className="text-muted-foreground">
                    Our vehicles undergo regular maintenance and cleaning to ensure your comfort and safety throughout
                    your journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Professional Drivers</h3>
                  <p className="text-muted-foreground">
                    Our drivers are experienced professionals who speak multiple languages and have extensive knowledge
                    of Egyptian roads and attractions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Flexible Booking Options</h3>
                  <p className="text-muted-foreground">
                    Book by the hour, day, or for your entire trip. We offer customizable options to suit your specific
                    travel needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Nationwide Coverage</h3>
                  <p className="text-muted-foreground">
                    Our services cover all major cities and tourist destinations in Egypt, ensuring seamless
                    transportation wherever you go.
                  </p>
                </div>
              </div>
            </div>

            <Button asChild className="mt-8 gap-2 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
              <Link href="/contact">
                Contact Us for Custom Transportation
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold mb-4">What Our Customers Say</h3>

            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-egyptian-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c1e35] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="car-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#car-pattern)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6 text-egyptian-gold">
              Ready to Book Your Transportation?
            </h2>
            <p className="text-white/80 mb-8">
              Whether you need a quick airport transfer or a comprehensive transportation solution for your entire
              Egyptian adventure, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                <Link href="/transportation/book">Book Transportation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact for Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

