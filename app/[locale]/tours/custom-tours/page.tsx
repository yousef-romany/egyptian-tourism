import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { CheckCircle, Calendar, Users, MapPin } from "lucide-react"

export const metadata = {
  title: "Custom Tours - WanderLand Egypt",
  description:
    "Create your perfect Egyptian adventure with our customizable tour packages tailored to your interests.",
}

export default function CustomToursPage() {
  const benefits = [
    {
      title: "Personalized Itinerary",
      description: "We'll create a custom itinerary based on your interests, time, and budget",
      icon: Calendar,
    },
    {
      title: "Flexible Schedule",
      description: "Travel at your own pace with flexible start dates and durations",
      icon: CheckCircle,
    },
    {
      title: "Private or Group",
      description: "Choose between private tours or small group experiences",
      icon: Users,
    },
    {
      title: "Unique Destinations",
      description: "Visit off-the-beaten-path locations and hidden gems",
      icon: MapPin,
    },
  ]

  const packages = [
    {
      name: "Essential Egypt",
      duration: "5-7 Days",
      description: "Perfect for first-time visitors wanting to see the highlights",
      includes: ["Pyramids & Sphinx", "Egyptian Museum", "Luxor Temples", "Nile Cruise"],
    },
    {
      name: "Complete Explorer",
      duration: "10-14 Days",
      description: "Comprehensive tour covering major sites and hidden gems",
      includes: ["Cairo & Giza", "Luxor & Valley of Kings", "Aswan & Abu Simbel", "Red Sea", "Desert Safari"],
    },
    {
      name: "Luxury Experience",
      duration: "Flexible",
      description: "Premium accommodations and exclusive experiences",
      includes: ["5-Star Hotels", "Private Guides", "Luxury Nile Cruise", "VIP Airport Service", "Hot Air Balloon"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Custom Tours"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/50 to-[#0c1e35]/95"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Customizable
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent">
              Design Your Dream Tour
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Create a personalized Egyptian adventure tailored perfectly to your interests and preferences
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-12 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300"
            >
              <Link href="/book-now">Start Planning</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            Why Choose a Custom Tour?
          </h2>
          <EgyptianDivider className="mx-auto my-8" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-egyptian-gold to-egyptian-gold-dark flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Package Examples */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
              Sample Tour Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              These are just starting points - we'll customize any package to match your exact preferences
            </p>
            <EgyptianDivider className="mx-auto my-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className="border-2 border-egyptian-gold/30 hover:border-egyptian-gold transition-all duration-300 hover:shadow-2xl"
              >
                <CardContent className="p-8">
                  <Badge className="bg-egyptian-gold text-black font-bold mb-4">{pkg.duration}</Badge>
                  <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm mb-3">Includes:</p>
                    {pkg.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-egyptian-gold flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    className="w-full mt-6 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-semibold"
                  >
                    <Link href="/book-now">Customize This Tour</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            Ready to Create Your Perfect Tour?
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Contact us today and let's design an unforgettable Egyptian adventure just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg px-12 py-7 shadow-2xl hover:shadow-egyptian-gold/50 transition-all duration-300"
            >
              <Link href="/book-now">Start Planning</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-egyptian-gold/50 hover:border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 font-semibold text-lg px-12 py-7"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
