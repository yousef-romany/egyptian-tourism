import { getFeaturedTours } from "@/lib/data/tours"
import { TourCarouselClient } from "./tour-carousel-client"

export default async function TourCarouselServer() {
  const tours = await getFeaturedTours(7)

  return <TourCarouselClient tours={tours} />
}
