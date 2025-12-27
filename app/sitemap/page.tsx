import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EgyptianDivider from "@/components/egyptian-divider"
import { Home, Map, Calendar, BookOpen, Phone, Info, Shield, FileText } from "lucide-react"

export const metadata = {
  title: "Sitemap - Egydise Tours",
  description: "Navigate through all pages and sections of Egydise Tours website.",
}

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Tours",
      icon: Map,
      links: [
        { name: "All Tours", href: "/tours" },
        { name: "Cairo & Pyramids", href: "/tours/cairo-pyramids" },
        { name: "Luxor & Aswan", href: "/tours/luxor-aswan" },
        { name: "Nile Cruises", href: "/tours/nile-cruises" },
        { name: "Red Sea", href: "/tours/red-sea" },
        { name: "Desert Adventures", href: "/tours/desert-adventures" },
        { name: "Custom Tours", href: "/tours/custom-tours" },
      ],
    },
    {
      title: "History & Culture",
      icon: BookOpen,
      links: [
        { name: "History Overview", href: "/history" },
        { name: "Ancient Egypt", href: "/history/ancient-egypt" },
        { name: "Pharaohs & Dynasties", href: "/history/pharaohs" },
        { name: "Temples & Monuments", href: "/history/temples" },
        { name: "Egyptian Gods", href: "/history/egyptian-gods" },
      ],
    },
    {
      title: "Booking & Services",
      icon: Calendar,
      links: [
        { name: "Book Now", href: "/book-now" },
        { name: "Reviews", href: "/reviews" },
        { name: "Blog & Travel Guide", href: "/blog" },
        { name: "Photo Gallery", href: "/gallery" },
        { name: "Transportation", href: "/transportation" },
        { name: "Transportation Booking", href: "/transportation/book" },
      ],
    },
    {
      title: "User Account",
      icon: Info,
      links: [
        { name: "Login", href: "/login" },
        { name: "Profile", href: "/profile" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "Forgot Password", href: "/forgot-password" },
      ],
    },
    {
      title: "Legal & Policies",
      icon: Shield,
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Navigation
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6">
              Sitemap
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Quick navigation to all pages and sections of our website
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {siteStructure.map((section, index) => (
            <Card
              key={index}
              className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center shadow-lg">
                    <section.icon className="h-6 w-6 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <EgyptianDivider className="my-4" />
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-egyptian-gold transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-egyptian-gold/50 group-hover:bg-egyptian-gold transition-colors"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold rounded-md shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-egyptian-gold/50 hover:border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 font-semibold rounded-md transition-all duration-300"
            >
              <FileText className="h-5 w-5" />
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
