"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import EgyptianDivider from "@/components/egyptian-divider"

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      avatar: "/api/placeholder/100/100?text=Sarah",
      rating: 5,
      tour: "Giza Pyramids & Sphinx",
      date: "November 2024",
      text: "This was absolutely the trip of a lifetime! Our guide Ahmed was incredibly knowledgeable and passionate about Egyptian history. The way he explained the construction techniques of the pyramids left us speechless. We even got to go inside the Great Pyramid - an experience I'll never forget. The entire experience was seamless from booking to the end of the tour. Highly recommend!",
      verified: true,
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      avatar: "/api/placeholder/100/100?text=Michael",
      rating: 5,
      tour: "Nile Cruise - Luxor to Aswan",
      date: "October 2024",
      text: "The 5-day Nile cruise exceeded all expectations. Every detail was thoughtfully planned. The temples along the way were breathtaking, and the boat was luxurious. Our Egyptologist guide brought history to life with fascinating stories about each temple we visited. The sunset views from the deck were absolutely magical. Can't wait to return!",
      verified: true,
    },
    {
      name: "Emma Thompson",
      location: "United Kingdom",
      avatar: "/api/placeholder/100/100?text=Emma",
      rating: 5,
      tour: "Luxor Hot Air Balloon",
      date: "December 2024",
      text: "Floating over the Valley of the Kings at sunrise was magical. The pilots were professional and made us feel safe the entire time. The views were absolutely stunning - you can see so much from above! We could spot Hatshepsut's Temple and the Colossi of Memnon from the air. The champagne breakfast after landing was a lovely touch. A must-do experience in Egypt.",
      verified: true,
    },
    {
      name: "Carlos Rodriguez",
      location: "Spain",
      avatar: "/api/placeholder/100/100?text=Carlos",
      rating: 5,
      tour: "White Desert Safari",
      date: "November 2024",
      text: "The 2-day camping experience in the White Desert was surreal. The rock formations are otherworldly, and sleeping under the stars in the middle of the desert was unforgettable. The food prepared by our Bedouin guides was delicious - I never knew desert cooking could be so good! The sunset over the chalk formations created the most incredible photos. Truly a once-in-a-lifetime adventure!",
      verified: true,
    },
    {
      name: "Lisa Wang",
      location: "Australia",
      avatar: "/api/placeholder/100/100?text=Lisa",
      rating: 5,
      tour: "Egyptian Museum Tour",
      date: "October 2024",
      text: "Our guide at the Egyptian Museum was phenomenal. She knew every detail about the artifacts and brought Tutankhamun's treasures to life. We spent hours exploring and never felt rushed. The Royal Mummy Room was the highlight - seeing actual pharaohs like Ramses II face-to-face was incredible! The stories behind each artifact made the history come alive in a way books never could.",
      verified: true,
    },
    {
      name: "James Miller",
      location: "Canada",
      avatar: "/api/placeholder/100/100?text=James",
      rating: 5,
      tour: "Abu Simbel Temples",
      date: "December 2024",
      text: "The early morning drive to Abu Simbel was absolutely worth it. These temples are spectacular - the scale is hard to comprehend until you're standing in front of them. Learning about the UNESCO relocation project added another layer of appreciation for the engineering marvel. The light show at sunset was breathtaking. Don't miss this! Our guide's knowledge of Nubian history was exceptional.",
      verified: true,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-egyptian-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-egyptian-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
            Testimonials
          </Badge>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Real experiences from real travelers who've discovered Egypt with us
          </p>
          <EgyptianDivider className="my-8" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Navigation buttons */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 h-12 w-12 rounded-full border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10 shadow-xl"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 h-12 w-12 rounded-full border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10 shadow-xl"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Testimonial cards */}
          <div className="relative h-[500px] md:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card className="h-full border-2 border-egyptian-gold/30 shadow-2xl bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-8 md:p-12 h-full flex flex-col">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <div className="h-16 w-16 rounded-full bg-egyptian-gold/10 flex items-center justify-center">
                        <Quote className="h-8 w-8 text-egyptian-gold fill-egyptian-gold" />
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-lg md:text-xl leading-relaxed mb-8 flex-1 text-foreground">
                      "{testimonials[currentIndex].text}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[currentIndex].rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                          {testimonials[currentIndex].verified && (
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                            >
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                        </p>
                        <p className="text-sm font-semibold text-egyptian-gold mt-1">
                          {testimonials[currentIndex].tour}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-egyptian-gold"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">5,000+</div>
              <div className="text-sm text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-egyptian-gold mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
