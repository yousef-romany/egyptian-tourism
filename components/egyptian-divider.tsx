import { cn } from "@/lib/utils"

interface EgyptianDividerProps {
  className?: string
  variant?: "simple" | "elaborate"
}

export default function EgyptianDivider({ className, variant = "simple" }: EgyptianDividerProps) {
  return (
    <div className={cn("relative my-8 flex items-center justify-center", className)}>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-egyptian-gold/30"></div>

      {variant === "simple" ? (
        <div className="relative bg-background px-6 z-10 flex items-center text-primary text-[2rem]">
          𓂀𓏤𓏃𓇳𓏇𓋴𓏏𓅓𓏏
        </div>
      ) : (
        <div className="relative bg-background px-6 z-10 text-primary text-[2rem]">
          𓂀𓏤𓏃𓇳𓏇𓋴𓏏𓅓𓏏
        </div>
      )}
    </div>
  )
}

