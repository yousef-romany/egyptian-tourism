"use client"

import { motion } from "framer-motion"
import { Star, TrendingUp, Award, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ReviewsStatsProps {
  totalReviews: number
  averageRating: number
  verifiedCount: number
  platformCounts: {
    tripadvisor: number
    viator: number
    klook: number
  }
}

export default function ReviewsStats({
  totalReviews,
  averageRating,
  verifiedCount,
  platformCounts
}: ReviewsStatsProps) {
  const verifiedPercentage = totalReviews > 0 ? Math.round((verifiedCount / totalReviews) * 100) : 0

  const platformLogos = {
    tripadvisor: {
      name: "TripAdvisor",
      color: "#00aa6c",
      logo: "T"
    },
    viator: {
      name: "Viator",
      color: "#2a2a2a",
      logo: "V"
    },
    klook: {
      name: "Klook",
      color: "#ff5722",
      logo: "K"
    }
  }

  const stats = [
    {
      label: "Total Reviews",
      value: totalReviews.toLocaleString(),
      icon: Star,
      color: "text-egyptian-gold"
    },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      icon: TrendingUp,
      color: "text-amber-500",
      suffix: "/5.0"
    },
    {
      label: "Verified Reviews",
      value: `${verifiedPercentage}%`,
      icon: CheckCircle2,
      color: "text-green-600"
    },
    {
      label: "Award Winner",
      value: "2024",
      icon: Award,
      color: "text-egyptian-gold"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-egyptian-gold/10 to-egyptian-gold/5 group-hover:from-egyptian-gold/20 group-hover:to-egyptian-gold/10 transition-all duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl lg:text-3xl font-bold">{stat.value}</span>
                      {stat.suffix && <span className="text-sm text-muted-foreground">{stat.suffix}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Platform Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-egyptian-gold/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-egyptian-gold" />
              Reviews Across Platforms
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(platformCounts).map(([platform, count]) => {
                const platformInfo = platformLogos[platform as keyof typeof platformLogos]
                const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0

                return (
                  <div key={platform} className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                      style={{ backgroundColor: platformInfo.color }}
                    >
                      {platformInfo.logo}
                    </div>
                    <p className="font-semibold text-sm mb-1">{platformInfo.name}</p>
                    <p className="text-2xl font-bold mb-1">{count}</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-1">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: platformInfo.color
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{percentage}% of total</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>{verifiedCount} Verified Reviews</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
          <Star className="h-4 w-4 text-egyptian-gold fill-egyptian-gold" />
          <span>4.8+ Average Rating</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
          <TrendingUp className="h-4 w-4 text-egyptian-gold" />
          <span>98% Positive Feedback</span>
        </div>
      </motion.div>
    </div>
  )
}
