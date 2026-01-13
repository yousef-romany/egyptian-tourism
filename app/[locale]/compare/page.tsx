import { redirect } from "next/navigation"
import { ComparisonTable } from "@/components/comparison-table"
import { ComparisonBar } from "@/components/comparison-bar"
import strapiAPI from "@/lib/api/strapi"
import { getLocale } from "next-intl/server"

export default async function ComparePage({
  searchParams
}: {
  searchParams: { tours?: string }
}) {
  const locale = await getLocale()

  // Get tour IDs from URL params
  const tourIds = searchParams.tours?.split(',').map(Number).filter(Boolean) || []

  if (tourIds.length < 2 || tourIds.length > 4) {
    redirect('/tours')
  }

  // Fetch tour data
  const tours = await Promise.all(
    tourIds.map(async (id) => {
      try {
        return await strapiAPI.tours.getById(id, locale)
      } catch {
        return null
      }
    })
  )

  const validTours = tours.filter(tour => tour !== null)

  if (validTours.length < 2) {
    redirect('/tours')
  }

  return (
    <>
      <div className="container py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Compare Tours</h1>
          <p className="text-muted-foreground">
            Comparing {validTours.length} tour{validTours.length > 1 ? 's' : ''}
          </p>
        </div>
        <ComparisonTable tours={validTours} />
      </div>
      <ComparisonBar />
    </>
  )
}
