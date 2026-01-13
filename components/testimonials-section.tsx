import { TestimonialCard } from "./testimonial-card"
import strapiAPI from "@/lib/api/strapi"
import { getLocale } from "next-intl/server"

interface TestimonialsSectionProps {
  limit?: number
  featured?: boolean
  tourId?: number
}

export async function TestimonialsSection({ limit = 6, featured = true, tourId }: TestimonialsSectionProps) {
  const locale = await getLocale()

  let testimonials = []

  if (tourId) {
    // Fetch testimonials for specific tour
    testimonials = await strapiAPI.testimonials.getByTour(tourId, locale)
  } else if (featured) {
    // Fetch featured testimonials
    testimonials = await strapiAPI.testimonials.getFeatured(locale, limit)
  } else {
    // Fetch all testimonials
    const { data } = await strapiAPI.testimonials.getAll({ locale })
    testimonials = data.slice(0, limit)
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from travelers who explored Egypt with us
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
