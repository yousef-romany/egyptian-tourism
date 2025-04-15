"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from "framer-motion"

interface ReviewCardProps {
  platform: "tripadvisor" | "viator" | "klook"
  name: string
  location: string
  date: string
  rating: number
  title: string
  content: string
  tourName: string
  avatar: string
}

export default function ReviewCard({
  platform,
  name,
  location,
  date,
  rating,
  title,
  content,
  tourName,
  avatar
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  
  const platformColors = {
    tripadvisor: "bg-[#00aa6c]",
    viator: "bg-[#2a2a2a]",
    klook: "bg-[#ff5722]"
  }
  
  const platformNames = {
    tripadvisor: "TripAdvisor",
    viator: "Viator",
    klook: "Klook"
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300">
        <div className={`${platformColors[platform]} text-white px-4 py-2 text-sm font-medium`}>
          {platformNames[platform]}
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-muted-foreground">{location}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          
          <h3 className="font-bold mb-2">{title}</h3>
          
          <div className="relative">
            <p className={`text-sm text-muted-foreground ${!expanded && "line-clamp-3"}`}>
              {content}
            </p>
            {content.length > 120 && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="text-xs font-medium text-[#d4af37] flex items-center gap-1 mt-2"
              >
                {expanded ? (
                  <>
                    Show less
                    <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Read more
                    <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t text-xs">
            <span className="text-muted-foreground">Tour: </span>
            <span className="font-medium">{tourName}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

