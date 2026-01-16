import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

// Define the history topics
const historyTopics = [
  {
    title: "Ancient Egypt",
    slug: "ancient-egypt",
    description: "Explore the fascinating civilization that flourished along the Nile for over 3,000 years",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Pharaohs & Dynasties",
    slug: "pharaohs",
    description: "Discover the rulers who shaped ancient Egypt through 30 dynasties spanning three millennia",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Temples & Monuments",
    slug: "temples",
    description: "Explore the magnificent structures built to honor the gods and immortalize pharaohs",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Egyptian Gods",
    slug: "egyptian-gods",
    description: "Learn about the diverse pantheon of deities worshipped throughout ancient Egyptian history",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export const metadata = {
  title: "Egyptian History - WanderLand Egypt",
  description:
    "Explore the rich history of ancient Egypt, from the pyramids and pharaohs to gods and daily life in the ancient civilization.",
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Ancient Egyptian hieroglyphics"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Egyptian History</h1>
            <p className="text-lg text-white/80 mb-6">
              Journey through 5,000 years of one of the world's most fascinating civilizations.
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">The Cradle of Civilization</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ancient Egypt was one of the world's first great civilizations, flourishing along the banks of the Nile
                River for over 3,000 years. From the unification of Upper and Lower Egypt around 3100 BCE until the
                Roman conquest in 30 BCE, this remarkable civilization created monuments, art, and cultural achievements
                that continue to captivate the world today.
              </p>
              <p>
                The Nile River was the lifeblood of ancient Egypt, providing fertile soil for agriculture, a means of
                transportation, and a source of papyrus reeds used for writing. The predictable annual flooding of the
                Nile created a stable agricultural system that supported a sophisticated society with specialized labor,
                complex religious beliefs, and monumental architecture.
              </p>
              <p>
                Egyptian history is traditionally divided into periods of stability (kingdoms) separated by periods of
                relative instability (intermediate periods). Throughout these cycles, the ancient Egyptians developed a
                rich culture characterized by impressive technological achievements, artistic excellence, and enduring
                religious traditions.
              </p>
            </div>
            <Button asChild className="mt-6 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
              <Link href="/tours">Explore Egypt with Us</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-egyptian-gold/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-egyptian-gold/10 rounded-full"></div>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Ancient Egyptian artifacts"
              width={500}
              height={600}
              className="rounded-lg object-cover h-[500px] w-full relative z-10"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Explore Egyptian History</h2>
          <EgyptianDivider className="mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            {historyTopics.map((topic, index) => (
              <Card
                key={index}
                className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300 h-full"
              >
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative h-full min-h-[200px]">
                    <Image src={topic.image || "/placeholder.svg"} alt={topic.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{topic.description}</p>
                    <Button asChild className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black mt-auto">
                      <Link href={`/history/${topic.slug}`}>
                        Explore
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-[#0c1e35] text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-egyptian-gold">
                Experience Ancient Egypt Today
              </h2>
              <p className="text-white/80 mb-6">
                Join us on a journey through time to experience the wonders of ancient Egypt firsthand. Our expert
                Egyptologist guides will bring history to life as you explore temples, tombs, and treasures that have
                fascinated the world for millennia.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-egyptian-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white/80">
                    Expert Egyptologist guides with deep knowledge of history and archaeology
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-egyptian-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white/80">
                    Access to sites off the typical tourist path for authentic experiences
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-egyptian-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-egyptian-gold"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-white/80">Customized historical tours based on your specific interests</p>
                </div>
              </div>
              <Button asChild className="mt-8 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                <Link href="/tours">Browse Our Historical Tours</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Tour guide explaining hieroglyphics"
                width={600}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

