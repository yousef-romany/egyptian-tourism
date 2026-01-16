import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import EgyptianDivider from "@/components/egyptian-divider";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us - WanderLand Egypt",
  description:
    "Get in touch with WanderLand Egypt to plan your Egyptian adventure or ask any questions about our tours and services.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/50 to-[#0c1e35]/95"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/30 text-egyptian-gold font-bold text-sm backdrop-blur-sm">
                <Mail className="h-4 w-4" />
                Get in Touch
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Have questions or ready to plan your Egyptian adventure? We're here to help.
            </p>
            <EgyptianDivider className="my-10 bg-egyptian-gold/70 mx-auto" />

            {/* Response time badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Clock className="h-5 w-5 text-egyptian-gold" />
              <span className="text-sm font-semibold">Average response time: 2 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-0 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Message
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you're ready to book a tour, have questions about our
              services, or need assistance with an existing booking, our team is
              here to help. Fill out the form below, and we'll get back to you
              as soon as possible.
            </p>

            <ContactForm />
          </div>

          <div>
            <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-10 mb-8 border-2 border-egyptian-gold/20 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold flex items-center justify-center">
                  <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold">Contact Information</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Our Office</h4>
                    <p className="text-muted-foreground">
                      123 Tahrir Square, Cairo, Egypt
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Phone</h4>
                    <p className="text-muted-foreground">+20 123 456 7890</p>
                    <p className="text-muted-foreground">
                      +20 098 765 4321 (WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Email</h4>
                    <p className="text-muted-foreground">
                      info@WanderLand Egypt.com
                    </p>
                    <p className="text-muted-foreground">
                      bookings@WanderLand Egypt.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Office Hours</h4>
                    <p className="text-muted-foreground">
                      Sunday - Thursday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">
                      Friday - Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">(Egypt Time, GMT+2)</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <Link
                    href="https://facebook.com"
                    className="h-12 w-12 rounded-xl bg-background hover:bg-egyptian-gold flex items-center justify-center group transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <Facebook className="h-5 w-5 group-hover:text-black transition-colors" />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    className="h-12 w-12 rounded-xl bg-background hover:bg-egyptian-gold flex items-center justify-center group transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <Instagram className="h-5 w-5 group-hover:text-black transition-colors" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="h-12 w-12 rounded-xl bg-background hover:bg-egyptian-gold flex items-center justify-center group transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <Twitter className="h-5 w-5 group-hover:text-black transition-colors" />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    className="h-12 w-12 rounded-xl bg-background hover:bg-egyptian-gold flex items-center justify-center group transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <Youtube className="h-5 w-5 group-hover:text-black transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhanced Map Section */}
            <div className="rounded-2xl overflow-hidden h-[450px] relative shadow-2xl border-4 border-background group">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Map of our Cairo office location"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
                <div className="bg-background/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-egyptian-gold/30 transform transition-transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-6 w-6 text-egyptian-gold" />
                    <p className="font-bold text-lg">WanderLand Egypt Office</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    123 Tahrir Square, Cairo, Egypt
                  </p>
                  <Button size="sm" className="mt-3 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 md:py-28 bg-muted relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-egyptian-gold/10 border border-egyptian-gold/20 text-egyptian-gold font-semibold text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Quick Answers
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 bg-gradient-to-r from-foreground via-egyptian-gold to-foreground bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Find quick answers to common questions about our tours and services.
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl p-8 shadow-lg border-2 border-egyptian-gold/20 hover:border-egyptian-gold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl flex-1">
                  How far in advance should I book my tour?
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We recommend booking at least 2-3 months in advance, especially
                during peak season (October to April). For travel during
                holidays or specialized tours, 4-6 months advance booking is
                advisable.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg border-2 border-egyptian-gold/20 hover:border-egyptian-gold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl flex-1">
                  Do I need a visa to visit Egypt?
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Most visitors need a visa to enter Egypt. Many nationalities can
                obtain a visa on arrival or apply for an e-visa online before
                travel. We can provide guidance based on your nationality.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg border-2 border-egyptian-gold/20 hover:border-egyptian-gold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl flex-1">
                  What's included in your tour packages?
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our standard packages include accommodation, transportation
                within Egypt, daily breakfast, entrance fees, expert guides, and
                airport transfers. Specific inclusions are listed in each tour
                description.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg border-2 border-egyptian-gold/20 hover:border-egyptian-gold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 transition-colors">
                  <svg className="h-5 w-5 text-egyptian-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl flex-1">
                  Can you arrange custom or private tours?
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Yes, we specialize in creating customized itineraries tailored
                to your interests, timeframe, and budget. Contact us with your
                preferences, and we'll design your perfect Egyptian adventure.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Link href="/faq" className="inline-flex items-center gap-2">
                View All FAQs
                <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
