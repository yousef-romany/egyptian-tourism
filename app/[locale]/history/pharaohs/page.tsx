import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { Crown, Star, Shield, Swords } from "lucide-react"

export const metadata = {
  title: "Pharaohs & Dynasties - WanderLand Egypt",
  description: "Meet the legendary rulers of Ancient Egypt and learn about the dynasties that shaped Egyptian civilization.",
}

export default function PharaohsPage() {
  const famousPharaohs = [
    {
      name: "Khufu (Cheops)",
      dynasty: "4th Dynasty",
      period: "c. 2589-2566 BCE",
      achievement: "Builder of the Great Pyramid of Giza",
      description:
        "Commissioned the Great Pyramid, the largest of the three pyramids on the Giza plateau and one of the Seven Wonders of the Ancient World.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Hatshepsut",
      dynasty: "18th Dynasty",
      period: "c. 1479-1458 BCE",
      achievement: "One of the most successful female pharaohs",
      description:
        "Ruled as pharaoh for over 20 years, overseeing ambitious building projects and establishing important trade networks.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Akhenaten",
      dynasty: "18th Dynasty",
      period: "c. 1353-1336 BCE",
      achievement: "Religious revolutionary who introduced monotheism",
      description:
        "Attempted to transform Egypt's religion by promoting the worship of Aten, the sun disk, above all other gods.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Tutankhamun",
      dynasty: "18th Dynasty",
      period: "c. 1332-1323 BCE",
      achievement: "Most famous for his intact tomb",
      description:
        "Though a minor pharaoh, his tomb's discovery in 1922 revealed unprecedented treasures and insights into ancient Egyptian culture.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Ramesses II",
      dynasty: "19th Dynasty",
      period: "c. 1279-1213 BCE",
      achievement: "Egypt's greatest builder and warrior",
      description:
        "Ruled for 66 years, built more monuments than any other pharaoh, and fought in legendary battles including Kadesh.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Cleopatra VII",
      dynasty: "Ptolemaic Dynasty",
      period: "51-30 BCE",
      achievement: "Last pharaoh of Ancient Egypt",
      description:
        "Renowned for her intelligence, political acumen, and relationships with Julius Caesar and Mark Antony.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const dynastyFacts = [
    {
      title: "31 Dynasties",
      description: "Ancient Egypt was ruled by 31 dynasties over 3,000 years",
      icon: Crown,
    },
    {
      title: "Divine Status",
      description: "Pharaohs were considered living gods, intermediaries between humans and deities",
      icon: Star,
    },
    {
      title: "Military Leaders",
      description: "Many pharaohs personally led their armies into battle",
      icon: Swords,
    },
    {
      title: "Nation Protectors",
      description: "Pharaohs were responsible for maintaining Ma'at (order and justice)",
      icon: Shield,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Pharaohs"
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
              Pharaohs & Dynasties
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              The god-kings who ruled Ancient Egypt for over three millennia
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Dynasty Facts */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {dynastyFacts.map((fact, index) => (
            <Card
              key={index}
              className="text-center border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <fact.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{fact.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{fact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Famous Pharaohs */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Legendary Pharaohs</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Meet the most influential rulers who shaped the course of Egyptian history
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {famousPharaohs.map((pharaoh, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={pharaoh.image}
                    alt={pharaoh.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{pharaoh.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-egyptian-gold text-black font-semibold">
                        {pharaoh.dynasty}
                      </Badge>
                      <Badge variant="outline" className="border-white text-white">
                        {pharaoh.period}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Crown className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-1" />
                    <p className="font-semibold text-sm">{pharaoh.achievement}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pharaoh.description}</p>
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
            Walk in the Footsteps of Pharaohs
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Visit the tombs, temples, and monuments built by these legendary rulers
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
