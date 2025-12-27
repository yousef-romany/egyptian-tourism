import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0c1e35] text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Egydise Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-heading font-bold tracking-wider text-egyptian-gold">Egydise Tours</span>
            </div>
            <p className="text-white/70 mb-6">
              Experience the magic of ancient Egypt with our expert-guided tours. From the majestic pyramids to the
              serene Nile River, we bring Egypt's wonders to life.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-egyptian-gold/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-egyptian-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Egyptian History
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-egyptian-gold">Popular Tours</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tours/cairo-pyramids" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Cairo & Pyramids
                </Link>
              </li>
              <li>
                <Link href="/tours/luxor-aswan" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Luxor & Aswan
                </Link>
              </li>
              <li>
                <Link href="/tours/nile-cruises" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Nile Cruises
                </Link>
              </li>
              <li>
                <Link href="/tours/red-sea" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Red Sea Resorts
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/desert-adventures"
                  className="text-white/70 hover:text-egyptian-gold transition-colors"
                >
                  Desert Adventures
                </Link>
              </li>
              <li>
                <Link href="/tours/custom-tours" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-egyptian-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70">123 Tahrir Square, Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-egyptian-gold flex-shrink-0" />
                <Link href="tel:+201234567890" className="text-white/70 hover:text-egyptian-gold transition-colors">
                  +20 123 456 7890
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-egyptian-gold flex-shrink-0" />
                <Link
                  href="mailto:info@egydise-tours.com"
                  className="text-white/70 hover:text-egyptian-gold transition-colors"
                >
                  info@egydise-tours.com
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-egyptian-gold"
                />
                <Button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">&copy; {currentYear} Egydise Tours. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <Link href="/terms" className="hover:text-egyptian-gold transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-egyptian-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/sitemap" className="hover:text-egyptian-gold transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

