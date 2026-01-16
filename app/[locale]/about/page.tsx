import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Award, Calendar, Star, ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

export const metadata = {
  title: "About Us - WanderLand Egypt",
  description:
    "Learn about WanderLand Egypt, our mission, values, and the passionate team behind our Egyptian adventures.",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ahmed Hassan",
      role: "Founder & CEO",
      bio: "With over 20 years of experience in Egyptian tourism, Ahmed founded WanderLand Egypt to share his passion for Egypt's rich history and culture with travelers from around the world.",
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
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape"
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
                <Users className="h-4 w-4" />
                Our Story
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              About WanderLand Egypt
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Discover the passionate team behind WanderLand Egypt and our commitment to creating unforgettable Egyptian
              experiences.
            </p>
            <EgyptianDivider className="my-10 bg-egyptian-gold/70 mx-auto" variant="elaborate" />
          </div>
        </div>
      </section>

      {/* Enhanced Our Story Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4">
              <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
                Founded in 2005
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Our Story</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                WanderLand Egypt was founded in 2005 by Ahmed Hassan, an Egyptologist with a passion for sharing the
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

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-egyptian-gold/5 border border-egyptian-gold/20 hover:bg-egyptian-gold/10 hover:border-egyptian-gold/40 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                  <Users className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <div className="font-bold text-xl text-egyptian-gold">10,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Travelers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-egyptian-gold/5 border border-egyptian-gold/20 hover:bg-egyptian-gold/10 hover:border-egyptian-gold/40 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                  <Award className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <div className="font-bold text-xl text-egyptian-gold">Award</div>
                  <div className="text-sm text-muted-foreground">Winning Service</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-egyptian-gold/5 border border-egyptian-gold/20 hover:bg-egyptian-gold/10 hover:border-egyptian-gold/40 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                  <Calendar className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <div className="font-bold text-xl text-egyptian-gold">18+ Years</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-egyptian-gold/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-egyptian-gold/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-egyptian-gold/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="WanderLand Egypt team"
              width={500}
              height={600}
              className="rounded-2xl object-cover h-[500px] w-full relative z-10 shadow-2xl border-2 border-egyptian-gold/20 group-hover:border-egyptian-gold/40 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Enhanced Our Values Section */}
      <section className="bg-muted py-20 md:py-28 relative overflow-hidden">
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
                What We Stand For
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">Our Core Values</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At WanderLand Egypt, our core values guide everything we do, from planning your itinerary to ensuring every
              detail of your journey exceeds expectations.
            </p>
            <EgyptianDivider className="my-8 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8 h-full">
                  <div className="h-16 w-16 rounded-full bg-egyptian-gold/10 flex items-center justify-center mb-6 group-hover:bg-egyptian-gold/20 group-hover:scale-110 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-egyptian-gold transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Meet Our Team Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-bold text-sm px-4 py-2">
              <Users className="h-4 w-4 inline mr-2" />
              Expert Team
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our passionate team of Egyptologists, travel experts, and hospitality professionals is dedicated to creating
            unforgettable Egyptian experiences for our guests.
          </p>
          <EgyptianDivider className="my-8 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-2 border-egyptian-gold/20 hover:border-egyptian-gold overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6 bg-gradient-to-b from-background to-background group-hover:from-egyptian-gold/5 group-hover:to-background transition-all duration-300">
                <h3 className="text-xl font-bold mb-1 group-hover:text-egyptian-gold transition-colors">{member.name}</h3>
                <p className="text-egyptian-gold font-semibold mb-3 text-sm uppercase tracking-wide">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced Why Choose Section */}
      <section className="bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pyramids-bg" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pyramids-bg)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.15),transparent_60%)]"></div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <Badge className="bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm px-4 py-2 backdrop-blur-sm">
                  <Award className="h-4 w-4 inline mr-2" />
                  Why Choose Us
                </Badge>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-egyptian-gold">Why Choose WanderLand Egypt?</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-egyptian-gold/30 transition-all duration-300 group">
                  <div className="mt-1 h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-egyptian-gold transition-colors">Expert Egyptologists</h3>
                    <p className="text-white/80 leading-relaxed">
                      Our guides are certified Egyptologists with deep knowledge of Egyptian history, archaeology, and
                      culture, ensuring you receive accurate and fascinating insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-egyptian-gold/30 transition-all duration-300 group">
                  <div className="mt-1 h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-egyptian-gold transition-colors">Personalized Experiences</h3>
                    <p className="text-white/80 leading-relaxed">
                      We tailor each tour to your interests, ensuring you experience Egypt your way, whether you're
                      fascinated by ancient history, interested in local culture, or seeking adventure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-egyptian-gold/30 transition-all duration-300 group">
                  <div className="mt-1 h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-egyptian-gold transition-colors">Exceptional Service</h3>
                    <p className="text-white/80 leading-relaxed">
                      From your first inquiry to your return home, our dedicated team provides attentive service,
                      addressing your needs and ensuring a smooth, enjoyable journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-egyptian-gold/30 transition-all duration-300 group">
                  <div className="mt-1 h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                    <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-egyptian-gold transition-colors">Quality & Value</h3>
                    <p className="text-white/80 leading-relaxed">
                      We never compromise on quality, selecting the best accommodations, transportation, and experiences
                      while offering competitive prices and excellent value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} className="h-7 w-7 text-egyptian-gold fill-egyptian-gold" />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-3xl text-egyptian-gold">4.9/5</div>
                    <div className="text-white/80 text-sm">1,200+ reviews</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-10 border-2 border-white/20 shadow-2xl hover:border-egyptian-gold/40 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-block mb-4">
                  <Badge className="bg-egyptian-gold/20 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm px-4 py-2">
                    Start Your Journey
                  </Badge>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Experience Egypt?</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Contact us today to start planning your perfect Egyptian adventure. Our team is ready to create a
                  customized itinerary that matches your interests, schedule, and budget.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Contact Us
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-10 py-7 transition-all duration-300 backdrop-blur-sm">
                  <Link href="/tours" className="inline-flex items-center gap-2">
                    Browse Our Tours
                    <ChevronRight className="h-5 w-5" />
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

