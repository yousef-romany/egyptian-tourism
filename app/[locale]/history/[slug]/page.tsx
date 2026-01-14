import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"

// Define the history content type
type HistoryContent = {
  title: string
  description: string
  heroImage: string
  sections: {
    title: string
    content: string
    image?: string
  }[]
  relatedTopics: {
    title: string
    slug: string
    image: string
  }[]
}

// This would typically come from a CMS or database
const historyData: Record<string, HistoryContent> = {
  "ancient-egypt": {
    title: "Ancient Egypt",
    description: "Explore the fascinating civilization that flourished along the Nile for over 3,000 years",
    heroImage: "/placeholder.svg?height=600&width=1600",
    sections: [
      {
        title: "The Birth of a Civilization",
        content:
          "Ancient Egyptian civilization began around 3100 BCE with the political unification of Upper and Lower Egypt under the first pharaoh, and lasted as a leading power in the Mediterranean world for thousands of years. The civilization flourished along the fertile banks of the Nile River, which provided the resources necessary for the development of a complex society. The predictable annual flooding of the Nile deposited nutrient-rich silt on the land, allowing for abundant agriculture that supported a growing population and specialized labor force.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Society and Daily Life",
        content:
          "Egyptian society was highly stratified, with the pharaoh at the top, followed by nobles, priests, scribes, merchants, artisans, and farmers. The majority of ancient Egyptians were farmers who worked the land and paid taxes to the government in the form of crops. Family was an important social unit, and Egyptians valued home life. Women in ancient Egypt had more rights and independence than in many other ancient civilizations, including the right to own property, initiate divorce, and conduct business.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Religion and Beliefs",
        content:
          "Religion permeated every aspect of ancient Egyptian life. The Egyptians were polytheistic, worshipping a pantheon of gods and goddesses who controlled the forces of nature and human activities. Some deities, like Ra (the sun god) and Osiris (god of the afterlife), were worshipped throughout Egypt, while others had more localized followings. The concept of ma'at—truth, balance, and order—was central to Egyptian religion and society. Egyptians believed in an afterlife and developed elaborate burial practices, including mummification, to prepare the deceased for their journey to the next world.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    relatedTopics: [
      {
        title: "Pharaohs & Dynasties",
        slug: "pharaohs",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Temples & Monuments",
        slug: "temples",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Egyptian Gods",
        slug: "egyptian-gods",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  pharaohs: {
    title: "Pharaohs & Dynasties",
    description: "Discover the rulers who shaped ancient Egypt through 30 dynasties spanning three millennia",
    heroImage: "/placeholder.svg?height=600&width=1600",
    sections: [
      {
        title: "The Divine Kings",
        content:
          "Pharaohs were the absolute rulers of ancient Egypt, considered to be living gods and intermediaries between the Egyptian people and the deities. The word 'pharaoh' comes from the Egyptian term 'per-aa', meaning 'great house', originally referring to the royal palace rather than the ruler. The pharaoh's divine status was central to Egyptian religion and governance, with the ruler responsible for maintaining ma'at (cosmic order) throughout the kingdom.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Famous Pharaohs",
        content:
          "Among the most renowned pharaohs was Khufu (4th Dynasty), who built the Great Pyramid of Giza. Hatshepsut (18th Dynasty) was one of Egypt's most successful female pharaohs, ruling for about 20 years and launching ambitious building projects. Ramses II (19th Dynasty), also known as Ramses the Great, ruled for 66 years and was known for his military campaigns and monumental building activities. Tutankhamun (18th Dynasty), though a minor king who died young, became famous when his nearly intact tomb was discovered in 1922.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "The Dynasty System",
        content:
          "Egyptian history is traditionally divided into 30 dynasties, a system established by Manetho, an Egyptian priest who lived during the Ptolemaic period. These dynasties are further grouped into larger periods: the Early Dynastic Period (1st-2nd Dynasties), the Old Kingdom (3rd-6th), the First Intermediate Period (7th-11th), the Middle Kingdom (11th-13th), the Second Intermediate Period (14th-17th), the New Kingdom (18th-20th), the Third Intermediate Period (21st-25th), and the Late Period (26th-30th), followed by the Ptolemaic and Roman periods.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    relatedTopics: [
      {
        title: "Ancient Egypt",
        slug: "ancient-egypt",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Temples & Monuments",
        slug: "temples",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Egyptian Gods",
        slug: "egyptian-gods",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  temples: {
    title: "Temples & Monuments",
    description: "Explore the magnificent structures built to honor the gods and immortalize pharaohs",
    heroImage: "/placeholder.svg?height=600&width=1600",
    sections: [
      {
        title: "Sacred Architecture",
        content:
          "Egyptian temples were considered the homes of the gods and goddesses. Their architecture evolved from simple shrines to massive stone complexes designed to impress and awe. Temples typically followed a standard layout: an entrance pylon (gateway), an open courtyard, a hypostyle hall with columns, and the inner sanctuary where the deity's statue resided. Only priests were allowed into the innermost areas, while common people could access the outer courtyards during festivals.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "The Great Pyramids",
        content:
          "The pyramids were monumental tombs built for the pharaohs, with the Great Pyramid of Giza (built for Pharaoh Khufu) being the largest and most famous. Constructed around 2560 BCE, it originally stood 146.5 meters tall and remained the tallest human-made structure for over 3,800 years. The precision of the pyramid's construction continues to amaze modern engineers, with blocks weighing several tons fitted together with remarkable accuracy.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Karnak and Luxor",
        content:
          "The Karnak Temple Complex near Luxor is one of the largest religious buildings ever constructed, developed over more than 1,000 years by successive pharaohs. Its Great Hypostyle Hall, covering 5,000 square meters with 134 massive columns, is particularly impressive. Nearby, the Luxor Temple was dedicated to the rejuvenation of kingship and connected to Karnak by an avenue of sphinxes. These temples were centers of religious activity and played crucial roles in important festivals like Opet.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    relatedTopics: [
      {
        title: "Ancient Egypt",
        slug: "ancient-egypt",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Pharaohs & Dynasties",
        slug: "pharaohs",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Egyptian Gods",
        slug: "egyptian-gods",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  "egyptian-gods": {
    title: "Egyptian Gods",
    description: "Learn about the diverse pantheon of deities worshipped throughout ancient Egyptian history",
    heroImage: "/placeholder.svg?height=600&width=1600",
    sections: [
      {
        title: "The Egyptian Pantheon",
        content:
          "The ancient Egyptians worshipped hundreds of gods and goddesses, each with specific roles and domains. Some deities had cosmic significance, like Ra (the sun god), Nut (the sky goddess), and Geb (the earth god). Others governed natural phenomena, such as Hapi (the Nile floods) and Shu (air). Some, like Thoth (wisdom and writing) and Sekhmet (warfare and healing), presided over human activities. The pantheon evolved over time, with certain deities rising or falling in prominence depending on political and religious developments.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Major Deities",
        content:
          "Among the most important Egyptian gods were Osiris, god of the afterlife and resurrection; Isis, goddess of magic and motherhood; Horus, the falcon-headed sky god associated with kingship; Anubis, the jackal-headed god of mummification and the afterlife; and Amun-Ra, a composite deity combining the creator god Amun with the sun god Ra. The pharaoh was considered the living embodiment of Horus and, after death, would become one with Osiris.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Religious Practices",
        content:
          "Worship of the gods involved daily rituals performed by priests in temples, where the deity's statue was bathed, clothed, and presented with offerings. Common people participated in religious festivals and maintained household shrines. Amulets bearing the images of protective deities like Bes and Taweret were worn for protection. The Egyptians believed that proper worship and adherence to ma'at (cosmic order) would ensure divine favor both in this life and in the afterlife.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    relatedTopics: [
      {
        title: "Ancient Egypt",
        slug: "ancient-egypt",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Pharaohs & Dynasties",
        slug: "pharaohs",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Temples & Monuments",
        slug: "temples",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = historyData[slug]

  if (!content) {
    return {
      title: "History Topic Not Found - Egydise Tours",
      description: "The requested history topic could not be found.",
    }
  }

  return {
    title: `${content.title} - Egyptian History - Egydise Tours`,
    description: content.description,
  }
}

// Generate static params for all known slugs
export function generateStaticParams() {
  return Object.keys(historyData).map((slug) => ({
    slug,
  }))
}

export default async function HistorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = historyData[slug]

  // Handle case where slug doesn't exist
  if (!content) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
        <p className="mb-8">The history topic you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
          <Link href="/history">Return to History</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={content.heroImage || "/placeholder.svg"}
            alt={content.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg text-white/80 mb-6">{content.description}</p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          {content.sections.map((section, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6">{section.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={index % 2 === 0 ? "order-1 md:order-1" : "order-1 md:order-2"}>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
                {section.image && (
                  <div className={index % 2 === 0 ? "order-2 md:order-2" : "order-2 md:order-1"}>
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
              {index < content.sections.length - 1 && <EgyptianDivider className="my-12" variant="simple" />}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Related Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.relatedTopics.map((topic, index) => (
              <Card
                key={index}
                className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={topic.image || "/placeholder.svg"}
                    alt={topic.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
                  <Button asChild className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                    <Link href={`/history/${topic.slug}`}>
                      Explore
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-[#0c1e35] text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Experience {content.title} in Person</h2>
              <p className="text-white/80 mb-6">
                Join our expert Egyptologist guides on a journey through time to explore the wonders of {content.title}{" "}
                firsthand.
              </p>
              <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                <Link href="/tours">View Related Tours</Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Tour guide explaining Egyptian history"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

