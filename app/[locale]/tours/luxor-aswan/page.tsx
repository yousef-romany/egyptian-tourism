import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import TourCardServer from "@/components/tour-card-server"
import { getTours } from "@/lib/data/tours"

export const metadata = {
  title: "Luxor & Aswan Tours - WanderLand Egypt",
  description:
    "Explore the ancient temples and tombs of Luxor and Aswan with our expert-guided tours.",
}

export default async function LuxorAswanToursPage() {
  const allTours = await getTours()
  const tours = allTours.filter(tour =>
    tour.location.toLowerCase().includes('luxor') ||
    tour.location.toLowerCase().includes('aswan')
  )

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Luxor Temple"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/50 to-[#0c1e35]/95"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Tour Category
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Luxor & Aswan Tours
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Journey through ancient Thebes and Nubia, where pharaohs built their greatest monuments
            </p>
            <EgyptianDivider className="my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
            {tours.length} Luxor & Aswan Experiences
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the Valley of the Kings, Karnak Temple, and the beauty of Aswan
          </p>
        </div>

        {tours.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCardServer key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-6">
              More tours coming soon! Check out our other amazing destinations.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/tours">View All Tours</Link>
            </Button>
          </div>
        )}
      </section>

      <section className="bg-muted py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
              Highlights of Luxor & Aswan
            </h2>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⚱️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Valley of the Kings</h3>
              <p className="text-muted-foreground">
                Explore the royal tombs including Tutankhamun's burial chamber
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Karnak Temple</h3>
              <p className="text-muted-foreground">
                Marvel at the largest religious complex ever built
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🗿</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Abu Simbel</h3>
              <p className="text-muted-foreground">
                Witness Ramesses II's colossal rock-cut temples
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
