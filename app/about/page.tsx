import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Award, Calendar, Star, ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

export const metadata = {
  title: "About Us - Egydise Tours",
  description:
    "Learn about Egydise Tours, our mission, values, and the passionate team behind our Egyptian adventures.",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ahmed Hassan",
      role: "Founder & CEO",
      bio: "With over 20 years of experience in Egyptian tourism, Ahmed founded Egydise Tours to share his passion for Egypt's rich history and culture with travelers from around the world.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Fatima El-Sayed",
      role: "Head Egyptologist",
      bio: "Holding a PhD in Egyptology from Cairo University, Fatima brings ancient Egyptian history to life with her extensive knowledge and engaging storytelling abilities.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Omar Mahmoud",
      role: "Operations Manager",
      bio: "Omar ensures that every tour runs smoothly, from transportation logistics to accommodation arrangements, allowing our guests to focus on enjoying their Egyptian adventure.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Layla Ibrahim",
      role: "Customer Experience Director",
      bio: "Dedicated to creating memorable experiences, Layla works closely with clients to understand their preferences and customize tours that exceed expectations.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const values = [
    {
      title: "Authenticity",
      description:
        "We provide genuine Egyptian experiences that go beyond typical tourist attractions, connecting travelers with the real Egypt.",
      icon: (
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
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        </svg>
      ),
    },
    {
      title: "Knowledge",
      description:
        "Our expert Egyptologists share deep insights into Egypt's history, archaeology, and culture, enriching your understanding of this ancient civilization.",
      icon: (
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
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        </svg>
      ),
    },
    {
      title: "Personalization",
      description:
        "We tailor each tour to our clients' interests, ensuring a unique and personalized experience that meets their specific preferences.",
      icon: (
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
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Sustainability",
      description:
        "We're committed to responsible tourism that respects Egypt's cultural heritage, supports local communities, and minimizes environmental impact.",
      icon: (
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
          <path d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0" />
          <path d="M12 2v20" />
          <path d="M2 7h20" />
          <path d="M2 17h20" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-white/80 mb-6">
              Discover the passionate team behind Egydise Tours and our commitment to creating unforgettable Egyptian
              experiences.
            </p>
            <EgyptianDivider className="my-6" variant="elaborate" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Egydise Tours was founded in 2005 by Ahmed Hassan, an Egyptologist with a passion for sharing the
                wonders of his homeland with travelers from around the world. What began as a small operation with just
                two guides has grown into one of Egypt's most respected tour companies, while maintaining our commitment
                to personalized service and authentic experiences.
              </p>
              <p>
                Our name, "Egydise," combines "Egypt" with "paradise," reflecting our belief that Egypt is truly a
                paradise for those who appreciate history, culture, and natural beauty. Our mission is to reveal this
                paradise to our guests through expertly guided tours that go beyond the typical tourist experience.
              </p>
              <p>
                Over the years, we've had the privilege of introducing thousands of travelers to the magic of Egypt,
                from the iconic pyramids of Giza to the hidden treasures of the Western Desert. We take pride in our
                team of knowledgeable Egyptologists, our attention to detail, and our dedication to creating memorable
                experiences for every guest.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Badge className="h-8 w-8 rounded-full bg-egyptian-gold/10 p-2">
                  <Users className="h-4 w-4 text-egyptian-gold" />
                </Badge>
                <span className="font-medium">10,000+ Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="h-8 w-8 rounded-full bg-egyptian-gold/10 p-2">
                  <Award className="h-4 w-4 text-egyptian-gold" />
                </Badge>
                <span className="font-medium">Award-Winning Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="h-8 w-8 rounded-full bg-egyptian-gold/10 p-2">
                  <Calendar className="h-4 w-4 text-egyptian-gold" />
                </Badge>
                <span className="font-medium">18+ Years Experience</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-egyptian-gold/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-egyptian-gold/10 rounded-full"></div>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Egydise Tours team"
              width={500}
              height={600}
              className="rounded-lg object-cover h-[500px] w-full relative z-10"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hieroglyphics-bg" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="none" />
              <path d="M0,0 L20,20 M20,0 L0,20" stroke="#d4af37" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hieroglyphics-bg)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6">Our Values</h2>
            <p className="text-muted-foreground mb-12">
              At Egydise Tours, our core values guide everything we do, from planning your itinerary to ensuring every
              detail of your journey exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-egyptian-gold/20">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground">
            Our passionate team of Egyptologists, travel experts, and hospitality professionals is dedicated to creating
            unforgettable Egyptian experiences for our guests.
          </p>
          <EgyptianDivider className="my-8 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-egyptian-gold/20 overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-egyptian-gold font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#0c1e35] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids-bg" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids-bg)" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 text-egyptian-gold">Why Choose Egydise Tours?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expert Egyptologists</h3>
                    <p className="text-white/70">
                      Our guides are certified Egyptologists with deep knowledge of Egyptian history, archaeology, and
                      culture, ensuring you receive accurate and fascinating insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Personalized Experiences</h3>
                    <p className="text-white/70">
                      We tailor each tour to your interests, ensuring you experience Egypt your way, whether you're
                      fascinated by ancient history, interested in local culture, or seeking adventure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Exceptional Service</h3>
                    <p className="text-white/70">
                      From your first inquiry to your return home, our dedicated team provides attentive service,
                      addressing your needs and ensuring a smooth, enjoyable journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Quality & Value</h3>
                    <p className="text-white/70">
                      We never compromise on quality, selecting the best accommodations, transportation, and experiences
                      while offering competitive prices and excellent value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-egyptian-gold fill-egyptian-gold" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-xl">4.9/5</span>
                  <span className="text-white/70 ml-2">based on 1,200+ reviews</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Experience Egypt?</h3>
              <p className="text-white/70 text-center mb-8">
                Contact us today to start planning your perfect Egyptian adventure. Our team is ready to create a
                customized itinerary that matches your interests, schedule, and budget.
              </p>
              <div className="flex flex-col gap-4">
                <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/tours">
                    Browse Our Tours
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

