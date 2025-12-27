import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { Sun, Moon, Feather, Heart } from "lucide-react"

export const metadata = {
  title: "Egyptian Gods - Egydise Tours",
  description: "Discover the fascinating pantheon of Ancient Egyptian gods and goddesses who shaped Egyptian religion and culture.",
}

export default function EgyptianGodsPage() {
  const majorGods = [
    {
      name: "Ra (Re)",
      title: "Sun God & Creator",
      symbol: "Solar disk",
      description:
        "The supreme sun god and creator deity, Ra sailed across the sky in his solar barque each day and through the underworld each night.",
      powers: ["Creation", "Sun", "Kingship"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Sun,
    },
    {
      name: "Osiris",
      title: "God of the Afterlife",
      symbol: "Crook and flail",
      description:
        "Ruler of the underworld and judge of the dead, Osiris offered the promise of eternal life to those deemed worthy.",
      powers: ["Death", "Resurrection", "Agriculture"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Moon,
    },
    {
      name: "Isis",
      title: "Goddess of Magic & Motherhood",
      symbol: "Throne headdress",
      description:
        "The most powerful goddess in Egyptian mythology, known for her magical abilities and devotion as a mother and wife.",
      powers: ["Magic", "Healing", "Protection"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Heart,
    },
    {
      name: "Horus",
      title: "Sky God & Protector of Pharaohs",
      symbol: "Falcon",
      description:
        "The falcon-headed god associated with kingship and the sky, believed to be embodied by the reigning pharaoh.",
      powers: ["Sky", "War", "Hunting"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Feather,
    },
    {
      name: "Anubis",
      title: "God of Mummification",
      symbol: "Jackal",
      description:
        "The jackal-headed god who guided souls through the afterlife and oversaw the mummification process.",
      powers: ["Embalming", "Afterlife", "Protection of tombs"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Moon,
    },
    {
      name: "Thoth",
      title: "God of Wisdom & Writing",
      symbol: "Ibis",
      description:
        "The ibis-headed god of knowledge, writing, and magic, credited with inventing hieroglyphs and maintaining divine order.",
      powers: ["Writing", "Magic", "Wisdom"],
      image: "/placeholder.svg?height=400&width=400",
      icon: Feather,
    },
  ]

  const additionalGods = [
    {
      name: "Bastet",
      role: "Goddess of cats, protection, and joy",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Hathor",
      role: "Goddess of love, music, and motherhood",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Set",
      role: "God of chaos, storms, and the desert",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Nephthys",
      role: "Goddess of mourning and night",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Ptah",
      role: "God of craftsmen and architects",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sekhmet",
      role: "Goddess of war and healing",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const beliefs = [
    {
      title: "Polytheistic Religion",
      description: "Egyptians worshipped hundreds of gods, each with specific domains and powers",
    },
    {
      title: "Animal Forms",
      description: "Gods often appeared with animal heads representing their characteristics",
    },
    {
      title: "Ma'at (Divine Order)",
      description: "The concept of cosmic balance, truth, and justice maintained by the gods",
    },
    {
      title: "Afterlife Journey",
      description: "Complex beliefs about the soul's journey through the underworld",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian Gods"
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
              Egyptian Gods & Goddesses
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              The divine pantheon that shaped Egyptian religion and culture for thousands of years
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {beliefs.map((belief, index) => (
            <Card
              key={index}
              className="text-center border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">{belief.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{belief.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Major Gods */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Major Deities</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              The most important gods and goddesses in the Egyptian pantheon
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {majorGods.map((god, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={god.image}
                    alt={god.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="h-12 w-12 rounded-full bg-egyptian-gold/90 flex items-center justify-center">
                      <god.icon className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{god.name}</h3>
                    <p className="text-egyptian-gold font-semibold text-sm">{god.title}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">{god.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {god.powers.map((power, idx) => (
                      <Badge key={idx} variant="outline" className="border-egyptian-gold text-egyptian-gold">
                        {power}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Symbol:</span> {god.symbol}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Gods */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Other Important Deities</h2>
          <EgyptianDivider className="mx-auto my-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {additionalGods.map((god, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={god.image}
                  alt={god.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h4 className="font-bold mb-1">{god.name}</h4>
                <p className="text-xs text-muted-foreground">{god.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
              See Ancient Gods Come to Life
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Visit the temples where these gods were worshipped and see their depictions in stunning hieroglyphs and statues
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
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
