import { getFeaturedTours } from "@/lib/data/tours"
import { TourCarouselClient } from "./tour-carousel-client"

export default function TourCarouselServer() {
  const tours = getFeaturedTours(7)

  return <TourCarouselClient tours={tours} />
}
