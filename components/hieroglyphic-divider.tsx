import { cn } from "@/lib/utils"

interface EgyptianDividerProps {
  className?: string
}

export default function HieroglyphicDivider({ className }: EgyptianDividerProps) {
  return (
    <div className={cn("relative h-12 my-8 flex items-center justify-center", className)}>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-egyptian-gold/30"></div>
      <div className="relative bg-background px-6 z-10 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 24" className="h-8 w-auto">
          {/* Ankh symbol */}
          <path
            d="M20 2c-3.3 0-6 2.7-6 6 0 2.1 1.1 3.9 2.7 5H8v3h3.3l-1.4 8h4.2l1.4-8h2.9l1.4 8h4.2l-1.4-8H26v-3h-8.7c1.6-1.1 2.7-2.9 2.7-5 0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"
            fill="#d4af37"
          />
          {/* Eye of Horus */}
          <path
            d="M60 4c-8 0-14 4-16 8 2 4 8 8 16 8s14-4 16-8c-2-4-8-8-16-8zm0 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
            fill="#d4af37"
          />
          {/* Scarab beetle */}
          <path
            d="M100 4c-3 0-5.5 1.5-7 3.5-1.5-2-4-3.5-7-3.5-4.4 0-8 3.6-8 8s3.6 8 8 8c3 0 5.5-1.5 7-3.5 1.5 2 4 3.5 7 3.5 4.4 0 8-3.6 8-8s-3.6-8-8-8zm-14 4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm14 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"
            fill="#d4af37"
          />
        </svg>
      </div>
    </div>
  )
}

