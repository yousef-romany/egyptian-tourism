import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getReviewsByPlatform } from "@/lib/data/reviews"
import ReviewCard from "@/components/review-card"

export default async function ReviewsSection() {
  const tripadvisorReviews = await getReviewsByPlatform("tripadvisor")
  const viatorReviews = await getReviewsByPlatform("viator")
  const klookReviews = await getReviewsByPlatform("klook")

  const hasNoReviews = tripadvisorReviews.length === 0 && viatorReviews.length === 0 && klookReviews.length === 0

  if (hasNoReviews) {
    return (
      <div className="mt-12 text-center">
        <div className="max-w-2xl mx-auto p-8 bg-muted/30 rounded-2xl border border-egyptian-gold/20">
          <h3 className="text-2xl font-bold mb-4">Reviews Coming Soon</h3>
          <p className="text-muted-foreground text-lg">
            We're gathering reviews from our satisfied travelers. Check back soon to see what our customers are saying about their Egyptian adventures!
          </p>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="tripadvisor" className="mt-12">
      <div className="flex justify-center">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger
            value="tripadvisor"
            className="data-[state=active]:bg-[#00aa6c] data-[state=active]:text-white"
            disabled={tripadvisorReviews.length === 0}
          >
            TripAdvisor
          </TabsTrigger>
          <TabsTrigger
            value="viator"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
            disabled={viatorReviews.length === 0}
          >
            Viator
          </TabsTrigger>
          <TabsTrigger
            value="klook"
            className="data-[state=active]:bg-[#ff5722] data-[state=active]:text-white"
            disabled={klookReviews.length === 0}
          >
            Klook
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="tripadvisor" className="mt-6">
        {tripadvisorReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripadvisorReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No TripAdvisor reviews available at the moment.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="viator" className="mt-6">
        {viatorReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viatorReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Viator reviews available at the moment.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="klook" className="mt-6">
        {klookReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {klookReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No Klook reviews available at the moment.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
