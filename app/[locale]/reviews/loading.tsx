import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-32 mx-auto mb-6 bg-egyptian-gold/20" />
            <Skeleton className="h-20 w-96 mx-auto mb-8 bg-egyptian-gold/20" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-10 bg-egyptian-gold/20" />
            <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 bg-egyptian-gold/20" />
                ))}
              </div>
              <div className="text-left">
                <Skeleton className="h-8 w-16 mb-1 bg-egyptian-gold/20" />
                <Skeleton className="h-4 w-20 bg-egyptian-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews Skeleton */}
      <section className="container py-20 md:py-28 bg-muted/50 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Skeleton className="h-6 w-24 mx-auto mb-4 bg-egyptian-gold/20" />
          <Skeleton className="h-12 w-48 mx-auto mb-6 bg-egyptian-gold/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-egyptian-gold/20" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="border-2 border-egyptian-gold/20 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-20 w-20 rounded-full bg-egyptian-gold/20" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-32 mb-2 bg-egyptian-gold/20" />
                  <Skeleton className="h-4 w-24 bg-egyptian-gold/20" />
                </div>
              </div>
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-6 bg-egyptian-gold/20" />
                ))}
              </div>
              <Skeleton className="h-4 w-full mb-2 bg-egyptian-gold/20" />
              <Skeleton className="h-4 w-full mb-2 bg-egyptian-gold/20" />
              <Skeleton className="h-4 w-3/4 mb-6 bg-egyptian-gold/20" />
              <div className="pt-4 border-t-2 border-egyptian-gold/10">
                <Skeleton className="h-4 w-16 bg-egyptian-gold/20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Reviews Skeleton */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Skeleton className="h-6 w-32 mx-auto mb-4 bg-egyptian-gold/20" />
            <Skeleton className="h-12 w-64 mx-auto mb-6 bg-egyptian-gold/20" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-egyptian-gold/20" />
          </div>
          <div className="flex justify-center mb-12">
            <div className="grid w-full max-w-2xl grid-cols-3 h-auto p-2 bg-background/60 backdrop-blur-sm rounded-2xl border-2 border-egyptian-gold/20 gap-2">
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} className="h-12 w-24 rounded-xl bg-egyptian-gold/20" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="border-2 border-egyptian-gold/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-egyptian-gold/20" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-1 bg-egyptian-gold/20" />
                    <Skeleton className="h-3 w-16 bg-egyptian-gold/20" />
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Skeleton key={j} className="h-5 w-5 bg-egyptian-gold/20" />
                  ))}
                </div>
                <Skeleton className="h-3 w-full mb-2 bg-egyptian-gold/20" />
                <Skeleton className="h-3 w-full mb-2 bg-egyptian-gold/20" />
                <Skeleton className="h-3 w-4/5 mb-4 bg-egyptian-gold/20" />
                <div className="pt-4 border-t-2 border-egyptian-gold/10">
                  <Skeleton className="h-3 w-12 bg-egyptian-gold/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}