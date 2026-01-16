export default function FAQLoading() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="p-6 border border rounded-lg">
              <div className="h-6 bg-muted/20 rounded animate-pulse mb-4 w-16"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                <div className="h-4 bg-muted/30 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
