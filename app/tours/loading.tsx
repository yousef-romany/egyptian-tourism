import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ToursLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Skeleton className="h-8 w-32 mb-6 bg-white/20" />
            <Skeleton className="h-16 w-full mb-6 bg-white/20" />
            <Skeleton className="h-6 w-3/4 mb-8 bg-white/20" />
          </div>
        </div>
      </section>

      {/* Tours Grid Skeleton */}
      <section className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Tours Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="flex justify-between mb-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-48" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-[240px] w-full" />
                  <CardContent className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
