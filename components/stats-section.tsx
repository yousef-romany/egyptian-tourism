"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Users, Award, MapPin, Star, Calendar, Globe } from "lucide-react"

interface StatProps {
  value: number
  label: string
  icon: React.ElementType
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix
      }
    })
  }, [springValue, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

function StatCard({ value, label, icon: Icon, suffix = "", prefix = "" }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1e35] to-[#1a3a5f] p-8 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.3),transparent_70%)]"></div>
        </div>

        {/* Icon */}
        <div className="relative mb-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark shadow-lg">
            <Icon className="h-8 w-8 text-black" />
          </div>
        </div>

        {/* Counter */}
        <div className="relative">
          <div className="text-5xl font-bold mb-2 font-heading bg-gradient-to-r from-white to-egyptian-gold bg-clip-text text-transparent">
            <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
          </div>
          <p className="text-lg text-white/80 font-medium">{label}</p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-egyptian-gold/20 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-300"></div>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const stats: StatProps[] = [
    {
      value: 15000,
      label: "Happy Travelers",
      icon: Users,
      suffix: "+",
    },
    {
      value: 15,
      label: "Years of Experience",
      icon: Award,
      suffix: "+",
    },
    {
      value: 50,
      label: "Tours Available",
      icon: MapPin,
      suffix: "+",
    },
    {
      value: 4.9,
      label: "Average Rating",
      icon: Star,
      suffix: "",
    },
    {
      value: 365,
      label: "Days Operating",
      icon: Calendar,
      suffix: "",
    },
    {
      value: 85,
      label: "Countries Served",
      icon: Globe,
      suffix: "+",
    },
  ]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-egyptian-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-egyptian-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
              <Award className="h-4 w-4" />
              Our Achievements
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delivering exceptional travel experiences across Egypt for over a decade
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of satisfied travelers who have experienced the magic of Egypt with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse Our Tours
            </a>
            <a
              href="/reviews"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-egyptian-gold/50 hover:border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 font-semibold rounded-lg transition-all duration-300"
            >
              Read Reviews
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
