export interface Review {
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

export const reviews: Review[] = [
  // TripAdvisor Reviews
  {
    platform: "tripadvisor",
    name: "Sarah Johnson",
    location: "London, UK",
    date: "March 2023",
    rating: 5,
    title: "Unforgettable Pyramids Tour",
    content:
      "Our guide was incredibly knowledgeable about Egyptian history. The tour was well-organized and we never felt rushed. Seeing the pyramids at sunrise was magical!",
    tourName: "Giza Pyramids & Sphinx",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "tripadvisor",
    name: "Michael Chen",
    location: "Toronto, Canada",
    date: "February 2023",
    rating: 5,
    title: "Best Nile Cruise Experience",
    content:
      "The 3-day Nile cruise exceeded all expectations. The boat was luxurious, food was excellent, and the stops along the way were fascinating. Our guide Ahmed made the history come alive.",
    tourName: "Luxury Nile Cruise",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "tripadvisor",
    name: "Emma Wilson",
    location: "Sydney, Australia",
    date: "April 2023",
    rating: 4,
    title: "Great Cairo Museum Tour",
    content:
      "The Egyptian Museum was incredible, and our guide was very informative. The only reason for 4 stars instead of 5 is that it felt a bit rushed at times. Still highly recommended!",
    tourName: "Cairo Museum & Khan el-Khalili",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  // Viator Reviews
  {
    platform: "viator",
    name: "David Miller",
    location: "Chicago, USA",
    date: "January 2023",
    rating: 5,
    title: "Luxor Day Trip - Amazing!",
    content:
      "The Valley of the Kings was breathtaking. Our guide Mahmoud was exceptional - his knowledge of Egyptian history made the experience so much more meaningful. The lunch included was delicious too!",
    tourName: "Luxor Day Trip",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "viator",
    name: "Sophia Garcia",
    location: "Madrid, Spain",
    date: "December 2022",
    rating: 5,
    title: "Perfect Alexandria Tour",
    content:
      "Alexandria was beautiful and so different from Cairo. The Catacombs were fascinating and the Mediterranean views were stunning. Our guide was friendly and professional.",
    tourName: "Alexandria Day Tour",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "viator",
    name: "James Wilson",
    location: "Melbourne, Australia",
    date: "February 2023",
    rating: 4,
    title: "Great Desert Safari",
    content:
      "The White Desert is unlike anything I've ever seen. Camping under the stars was magical. The only improvement would be more comfortable transportation for the long drive.",
    tourName: "White Desert Overnight",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  // Klook Reviews
  {
    platform: "klook",
    name: "Hiroshi Tanaka",
    location: "Tokyo, Japan",
    date: "March 2023",
    rating: 5,
    title: "Perfect Hot Air Balloon Ride",
    content:
      "Seeing Luxor from a hot air balloon at sunrise was the highlight of our trip to Egypt. The views were spectacular and the pilot was very skilled. Worth every penny!",
    tourName: "Luxor Hot Air Balloon",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "klook",
    name: "Priya Patel",
    location: "Mumbai, India",
    date: "January 2023",
    rating: 5,
    title: "Excellent Sound & Light Show",
    content:
      "The Pyramids Sound and Light Show was magical! Seeing the Sphinx and Pyramids illuminated at night while learning about their history was an unforgettable experience.",
    tourName: "Pyramids Sound & Light Show",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    platform: "klook",
    name: "Thomas Schmidt",
    location: "Berlin, Germany",
    date: "February 2023",
    rating: 4,
    title: "Great Snorkeling Experience",
    content:
      "The Red Sea snorkeling was amazing with beautiful coral and fish. The boat was comfortable and the crew was friendly. Lunch could have been better, but overall a great day.",
    tourName: "Hurghada Snorkeling Trip",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function getReviews(): Review[] {
  return reviews
}

export function getReviewsByPlatform(
  platform: "tripadvisor" | "viator" | "klook"
): Review[] {
  return reviews.filter((review) => review.platform === platform)
}

export function getFeaturedReviews(limit: number = 9): Review[] {
  return reviews.slice(0, limit)
}
