import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pyramids-404" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pyramids-404)" />
        </svg>
      </div>

      <div className="container relative z-10 text-center px-4">
        <div className="mb-8">
          <h1 className="font-heading text-9xl md:text-[200px] font-extrabold mb-4 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
            404
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-16 bg-egyptian-gold"></div>
            <MapPin className="h-8 w-8 text-egyptian-gold" />
            <div className="h-1 w-16 bg-egyptian-gold"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Lost in the Desert?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-2">
            This page seems to have been buried like an ancient tomb
          </p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track to discover Egypt's wonders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300"
          >
            <Link href="/" className="gap-2">
              <Home className="h-5 w-5" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0c1e35] font-semibold text-lg px-10 py-7 transition-all duration-300"
          >
            <Link href="/tours" className="gap-2">
              <Search className="h-5 w-5" />
              Browse Tours
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            href="/tours"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <MapPin className="h-8 w-8 text-egyptian-gold mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-lg mb-2">Explore Tours</h3>
            <p className="text-sm text-white/70">Discover our amazing tour packages</p>
          </Link>

          <Link
            href="/history"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <svg
              className="h-8 w-8 text-egyptian-gold mb-3 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Learn History</h3>
            <p className="text-sm text-white/70">Dive into ancient Egyptian history</p>
          </Link>

          <Link
            href="/contact"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <svg
              className="h-8 w-8 text-egyptian-gold mb-3 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <p className="text-sm text-white/70">We're here to help you plan</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
