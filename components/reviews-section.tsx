import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getReviewsByPlatform } from "@/lib/data/reviews"
import ReviewCard from "@/components/review-card"

export default function ReviewsSection() {
  const tripadvisorReviews = getReviewsByPlatform("tripadvisor")
  const viatorReviews = getReviewsByPlatform("viator")
  const klookReviews = getReviewsByPlatform("klook")

  return (
    <Tabs defaultValue="tripadvisor" className="mt-12">
      <div className="flex justify-center">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger
            value="tripadvisor"
            className="data-[state=active]:bg-[#00aa6c] data-[state=active]:text-white"
          >
            TripAdvisor
          </TabsTrigger>
          <TabsTrigger
            value="viator"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
          >
            Viator
          </TabsTrigger>
          <TabsTrigger
            value="klook"
            className="data-[state=active]:bg-[#ff5722] data-[state=active]:text-white"
          >
            Klook
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="tripadvisor" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tripadvisorReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="viator" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viatorReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="klook" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {klookReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
