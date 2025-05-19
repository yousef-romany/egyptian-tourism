"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Play, MapPin } from "lucide-react";
import Link from "next/link";

export default function AnimatedHero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const pyramidVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const hieroglyphVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0c1e35] text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Egyptian landscape"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-[#d4af37]/30 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-[#d4af37]/30 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#d4af37]/10 rounded-full"></div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container relative z-10 py-20 md:py-32 lg:py-40"
      >
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Experience the Magic of{" "}
                <span className="text-[#d4af37]">Ancient Egypt</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-md">
                Discover the wonders of Egypt with our award-winning tours. From
                the majestic pyramids to the serene Nile River.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#d4af37] hover:bg-[#c09c2c] text-black flex items-center gap-2"
                  asChild
                >
                  <Link href="/tours">
                    <MapPin className="h-4 w-4" />
                    Explore Tours
                  </Link>
                </Button>
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="border-white/30 hover:bg-white/10 flex items-center gap-2"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Watch Video
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={hieroglyphVariants}
              className="mt-12 hidden md:block"
            >
              <div className="flex gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-12 bg-[#d4af37]/20 rounded-sm flex items-center justify-center"
                  >
                    <div className="w-4 h-6 border-[1px] border-[#d4af37]/40"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={pyramidVariants}
            className="relative h-[300px] md:h-[400px] flex items-center justify-center"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]"
            >
              <Image
                src="/placeholder.svg?height=350&width=350"
                alt="Egyptian pyramid"
                fill
                className="object-contain"
              />

              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/50"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/50"></div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-8 md:mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl max-w-3xl mx-auto border border-white/10"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Destination
              </label>
              <select className="w-full bg-white/10 border border-white/20 rounded-md p-2">
                <option className="!text-white/10 hover:!text-white">
                  Cairo
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Luxor
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Aswan
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Alexandria
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Hurghada
                </option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Tour Type
              </label>
              <select className="w-full bg-white/10 border border-white/20 rounded-md p-2">
                <option className="!text-white/10 hover:!text-white">
                  All Tours
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Historical
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Adventure
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Cultural
                </option>
                <option className="!text-white/10 hover:!text-white">
                  Relaxation
                </option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block opacity-0">
                Search
              </label>
              <Button className="bg-[#d4af37] hover:bg-[#c09c2c] text-black w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
