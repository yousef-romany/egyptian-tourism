"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import HieroglyphicDivider from "@/components/hieroglyphic-divider"

export default function HistoryTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const timelineEvents = [
    {
      year: "3100 BCE",
      title: "Unification of Egypt",
      description: "King Menes unifies Upper and Lower Egypt, beginning the First Dynasty.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      year: "2630-2611 BCE",
      title: "Step Pyramid of Djoser",
      description: "The first pyramid is built during the Third Dynasty under King Djoser.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      year: "2560 BCE",
      title: "Great Pyramid of Giza",
      description: "The Great Pyramid is built as a tomb for Pharaoh Khufu of the Fourth Dynasty.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      year: "1332-1323 BCE",
      title: "Reign of Tutankhamun",
      description: "The boy king Tutankhamun rules during the 18th Dynasty of the New Kingdom.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      year: "51-30 BCE",
      title: "Cleopatra VII",
      description: "The last active ruler of the Ptolemaic Kingdom of Egypt, known for her relationships with Julius Caesar and Mark Antony.",
      image: "/placeholder.svg?height=200&width=300"
    }
  ]
  
  return (
    <section ref={ref} className="py-12 md:py-24 bg-muted">
      <div className="container">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Journey Through Egyptian History
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore the rich tapestry of Egyptian civilization spanning over 5,000 years.
          </p>
        </div>
        
        <HieroglyphicDivider className="mb-12" />
        
        <div className="relative mx-auto max-w-4xl">
          <motion.div 
            className="absolute left-9 top-0 bottom-0 w-1 bg-[#d4af37]/50"
            style={{ scaleY: scrollYProgress }}
          />
          
          <div className="space-y-16 md:space-y-24 relative">
            {timelineEvents.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative grid md:grid-cols-5 gap-6 md:gap-12 items-start"
              >
                <div className="md:col-span-2 flex md:justify-end">
                  <div className="relative z-10">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full border-4 border-muted bg-[#d4af37]/10 text-[#d4af37] font-bold">
                        <div className="text-center leading-tight">
                          <span className="text-xs block">
                            {event.year.split(" ")[0]}
                          </span>
                          <span className="text-xs block">
                            {event.year.split(" ")[1] || ""}
                          </span>
                        </div>
                      </div>
                      <div className="hidden md:block h-1 w-12 bg-[#d4af37]/50 -ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 relative">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 group">
                    <div className="relative">
                      <Image 
                        src={event.image || "/placeholder.svg"} 
                        alt={event.title} 
                        width={600} 
                        height={200} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 right-0 bg-[#d4af37] text-black px-3 py-1 text-xs font-bold">
                        {event.year}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button className="gap-2 bg-[#0c1e35] hover:bg-[#163156]" asChild>
            <Link href="/history">
              Explore More Egyptian History
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

