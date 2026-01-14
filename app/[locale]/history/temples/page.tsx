import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { MapPin, Star, Calendar, Columns } from "lucide-react"

export const metadata = {
  title: "Temples & Monuments - Egydise Tours",
  description: "Discover the magnificent temples and monuments of Ancient Egypt that have endured for thousands of years.",
}

export default function TemplesPage() {
  const temples = [
    {
      name: "Karnak Temple Complex",
      location: "Luxor",
      built: "c. 2055 BCE - 100 CE",
      highlights: ["Hypostyle Hall with 134 massive columns", "Sacred Lake", "Avenue of Sphinxes"],
      description:
        "The largest religious building ever constructed, dedicated primarily to Amun-Ra. Construction spanned over 2,000 years.",
      image: "/placeholder.svg?height=500&width=700",
      featured: true,
    },
    {
      name: "Abu Simbel",
      location: "Aswan",
      built: "c. 1264 BCE",
      highlights: ["Four 20-meter tall statues of Ramesses II", "Sun Festival alignment", "Rescued from Lake Nasser"],
      description:
        "Rock-cut temples built by Ramesses II, featuring colossal statues and precise solar alignment twice yearly.",
      image: "/placeholder.svg?height=500&width=700",
      featured: true,
    },
    {
      name: "Temple of Hatshepsut",
      location: "Luxor (Deir el-Bahari)",
      built: "c. 1479 BCE",
      highlights: ["Terraced architecture", "Reliefs of Punt expedition", "Chapel of Hathor"],
      description:
        "Mortuary temple of Queen Hatshepsut, featuring innovative terraced design carved into limestone cliffs.",
      image: "/placeholder.svg?height=500&width=700",
      featured: false,
    },
    {
      name: "Luxor Temple",
      location: "Luxor",
      built: "c. 1400 BCE",
      highlights: ["Colonnade of Amenhotep III", "Mosque of Abu Haggag", "Obelisk (twin in Paris)"],
      description:
        "Dedicated to the rejuvenation of kingship, connected to Karnak via the Avenue of Sphinxes.",
      image: "/placeholder.svg?height=500&width=700",
      featured: false,
    },
    {
      name: "Philae Temple",
      location: "Aswan",
      built: "c. 380 BCE",
      highlights: ["Island setting", "Temple of Isis", "Sound and light show"],
      description:
        "Beautiful island temple dedicated to Isis, relocated to Agilkia Island to save it from flooding.",
      image: "/placeholder.svg?height=500&width=700",
      featured: false,
    },
    {
      name: "Edfu Temple",
      location: "Edfu",
      built: "c. 237 BCE",
      highlights: ["Best-preserved temple", "Statue of Horus", "Nilometer"],
      description:
        "One of the best-preserved ancient monuments in Egypt, dedicated to the falcon god Horus.",
      image: "/placeholder.svg?height=500&width=700",
      featured: false,
    },
  ]

  const architecturalFeatures = [
    {
      title: "Massive Columns",
      description: "Towering pillars carved with hieroglyphs and painted in vibrant colors",
      icon: Columns,
    },
    {
      title: "Sacred Spaces",
      description: "Progressively darker and more sacred areas leading to the sanctuary",
      icon: Star,
    },
    {
      title: "Solar Alignment",
      description: "Precise astronomical alignments for important religious dates",
      icon: Calendar,
    },
    {
      title: "Strategic Locations",
      description: "Built along the Nile for religious significance and accessibility",
      icon: MapPin,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Ancient Egyptian Temple"
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
              Temples & Monuments
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Architectural marvels that have withstood the test of time for millennia
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Architectural Features */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {architecturalFeatures.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Famous Temples */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Iconic Temples</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Explore the most magnificent temple complexes that showcase ancient Egyptian architecture and devotion
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="space-y-8 max-w-7xl mx-auto">
            {temples.map((temple, index) => (
              <Card
                key={index}
                className={`overflow-hidden border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl ${
                  temple.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className={`grid ${temple.featured ? "md:grid-cols-2" : "md:grid-cols-5"} gap-0`}>
                  <div className={`relative ${temple.featured ? "h-96" : "h-64 md:col-span-2"} overflow-hidden`}>
                    <Image
                      src={temple.image}
                      alt={temple.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {temple.featured && (
                      <Badge className="absolute top-4 right-4 bg-egyptian-gold text-black font-bold">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className={temple.featured ? "" : "md:col-span-3"}>
                    <CardContent className={`p-8 ${temple.featured ? "h-full flex flex-col justify-center" : ""}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`font-bold mb-2 ${temple.featured ? "text-3xl" : "text-2xl"}`}>
                            {temple.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-egyptian-gold text-egyptian-gold">
                              <MapPin className="h-3 w-3 mr-1" />
                              {temple.location}
                            </Badge>
                            <Badge variant="outline">{temple.built}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className={`text-muted-foreground leading-relaxed mb-4 ${temple.featured ? "text-lg" : ""}`}>
                        {temple.description}
                      </p>
                      <div>
                        <p className="font-semibold mb-2 text-sm">Highlights:</p>
                        <ul className="space-y-1">
                          {temple.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Star className="h-4 w-4 text-egyptian-gold flex-shrink-0 mt-0.5" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            Experience These Wonders in Person
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Join our expert-guided tours to explore these magnificent temples and monuments
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
