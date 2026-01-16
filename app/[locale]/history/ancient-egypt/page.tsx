import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { Calendar, MapPin, Scroll, Crown } from "lucide-react"

export const metadata = {
  title: "Ancient Egypt - WanderLand Egypt",
  description: "Explore the fascinating history of Ancient Egypt, from its origins to the legacy that shaped civilization.",
}

export default function AncientEgyptPage() {
  const periods = [
    {
      name: "Predynastic Period",
      period: "c. 6000-3150 BCE",
      description: "The dawn of Egyptian civilization, marked by the development of agriculture, pottery, and early settlements along the Nile.",
      icon: Scroll,
    },
    {
      name: "Early Dynastic Period",
      period: "c. 3150-2686 BCE",
      description: "The unification of Upper and Lower Egypt under the first pharaohs, establishing the foundation of Egyptian civilization.",
      icon: Crown,
    },
    {
      name: "Old Kingdom",
      period: "c. 2686-2181 BCE",
      description: "The age of the great pyramid builders. Construction of the Giza pyramids and establishment of centralized government.",
      icon: MapPin,
    },
    {
      name: "Middle Kingdom",
      period: "c. 2055-1650 BCE",
      description: "A golden age of art, literature, and architecture. Reunification after the First Intermediate Period.",
      icon: Scroll,
    },
    {
      name: "New Kingdom",
      period: "c. 1550-1077 BCE",
      description: "Egypt's imperial age. The most prosperous period featuring famous pharaohs like Tutankhamun and Ramesses II.",
      icon: Crown,
    },
    {
      name: "Late Period",
      period: "c. 664-332 BCE",
      description: "Foreign invasions and the eventual conquest by Alexander the Great, marking the end of native Egyptian rule.",
      icon: Calendar,
    },
  ]

  const achievements = [
    {
      title: "Writing System",
      description: "Hieroglyphics - one of the world's first writing systems, used for over 3,000 years.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Architecture",
      description: "Monumental structures including pyramids, temples, and tombs that still stand today.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Medicine",
      description: "Advanced medical knowledge including surgery, dentistry, and pharmacology.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Mathematics",
      description: "Development of geometry and arithmetic essential for construction and astronomy.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Ancient Egypt"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/50 to-[#0c1e35]/95"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              History
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Ancient Egypt
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover the civilization that flourished for over 3,000 years along the banks of the Nile River
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Historical Periods</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Ancient Egypt's history spans over 3,000 years, divided into distinct periods of prosperity, decline, and renewal
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="space-y-8">
            {periods.map((period, index) => (
              <Card
                key={index}
                className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                      <period.icon className="h-7 w-7 text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold">{period.name}</h3>
                        <Badge variant="outline" className="border-egyptian-gold text-egyptian-gold">
                          {period.period}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {period.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Ancient Egyptian Achievements</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              The innovations and accomplishments that shaped human civilization
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            Experience Ancient Egypt Firsthand
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Join our expert-led tours to explore the monuments, temples, and treasures of this remarkable civilization
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-12 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300"
            >
              <Link href="/tours">Explore Tours</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-egyptian-gold/50 hover:border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 font-semibold text-lg px-12 py-7"
            >
              <Link href="/history">More History</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
