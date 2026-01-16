"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Crown, Pyramid, Scroll, Sparkles } from 'lucide-react'
import EgyptianDivider from "@/components/egyptian-divider"

export default function HistoryTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const historyCategories = [
    {
      icon: Pyramid,
      title: "Ancient Egypt",
      period: "3100 - 332 BCE",
      description: "Experience the birthplace of civilization where the Nile River nurtured one of history's most remarkable cultures. Witness the rise of hieroglyphic writing, the development of mathematics and astronomy, and the construction of monuments that have defied time for over 5,000 years.",
      link: "/history/ancient-egypt",
      color: "from-amber-500 to-orange-600",
      image: "/api/placeholder/400/300?text=Great+Pyramid+of+Giza"
    },
    {
      icon: Crown,
      title: "Pharaohs & Dynasties",
      period: "31 Dynasties",
      description: "Walk in the footsteps of legendary rulers like Tutankhamun, Ramses II, and Cleopatra. Discover how these divine kings built empires, commanded armies, and created the magnificent tombs and treasures that continue to captivate the world today.",
      link: "/history/pharaohs",
      color: "from-yellow-500 to-amber-600",
      image: "/api/placeholder/400/300?text=Mask+of+Tutankhamun"
    },
    {
      icon: Sparkles,
      title: "Temples & Monuments",
      period: "5000+ Years",
      description: "Stand in awe before the architectural masterpieces of Karnak, Luxor, Abu Simbel, and Philae. These sacred spaces, carved from stone and decorated with intricate hieroglyphs, reveal the profound spiritual beliefs and extraordinary engineering skills of ancient Egyptians.",
      link: "/history/temples",
      color: "from-orange-500 to-red-600",
      image: "/api/placeholder/400/300?text=Karnak+Temple+Complex"
    },
    {
      icon: Scroll,
      title: "Egyptian Gods",
      period: "Pantheon",
      description: "Explore the divine world of Ra, Isis, Osiris, Anubis, and hundreds of other deities who governed every aspect of Egyptian life. Learn how these gods influenced daily rituals, burial practices, and the eternal quest for immortality that shaped Egyptian civilization.",
      link: "/history/egyptian-gods",
      color: "from-purple-500 to-pink-600",
      image: "/api/placeholder/400/300?text=Anubis+the+God"
    }
  ]
  
  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-36 bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="hieroglyphics-bg" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <rect width="10" height="10" fill="none" />
            <path d="M0,0 L10,10 M10,0 L0,10" stroke="#fff" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hieroglyphics-bg)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[68rem] flex-col items-center justify-center gap-6 text-center mb-16">
          <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 shadow-lg">
            Egyptian Heritage
          </Badge>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
            Explore 5,000 Years of History
          </h2>
          <p className="max-w-[85%] text-lg leading-relaxed text-white/90 sm:text-xl sm:leading-8">
            Journey through the fascinating periods of ancient Egyptian civilization, from powerful pharaohs to magnificent temples.
          </p>
          <EgyptianDivider className="my-6 bg-egyptian-gold/70" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {historyCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={category.link}>
                <Card className="group h-full border-2 border-egyptian-gold/30 hover:border-egyptian-gold bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-egyptian-gold/20 transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className={`absolute top-3 right-3 h-12 w-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="absolute bottom-3 left-3 bg-egyptian-gold text-black font-bold">
                      {category.period}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-egyptian-gold transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-egyptian-gold font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300 gap-2"
          >
            <Link href="/history">
              Discover All History Content
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

