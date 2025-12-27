"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Mail, Calendar, Users, MapPin, Phone, Home } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Link from "next/link"

export default function BookingConfirmationPage() {
  // In a real application, this would come from the URL params or state management
  const bookingRef = `EGY-${Date.now().toString().slice(-6)}`
  const bookingDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    tourType: "Pyramids & Cairo",
    travelDate: "2024-03-15",
    numberOfTravelers: "2",
    accommodation: "Luxury (5-star)",
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.2),transparent_70%)]"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center shadow-2xl animate-bounce">
                <CheckCircle className="h-14 w-14 text-white" />
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Booking Confirmed
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              Thank You!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed">
              Your booking request has been successfully submitted
            </p>
            <p className="text-lg text-white/80">
              Booking Reference: <span className="font-bold text-egyptian-gold">{bookingRef}</span>
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-white/30" />
          </div>
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="container py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-500/50 shadow-2xl mb-8">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-start gap-4 mb-8 pb-8 border-b">
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">What Happens Next?</h2>
                  <p className="text-muted-foreground text-lg">
                    Our travel experts will review your booking request and contact you within 24 hours to:
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      Confirm your tour details and customize your itinerary
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      Provide a detailed quote with pricing and inclusions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      Answer any questions you may have
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      Arrange payment and finalize your booking
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-6">Your Booking Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-semibold">{bookingDetails.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-semibold">{bookingDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="font-semibold">{bookingDetails.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tour Type</p>
                      <p className="font-semibold">{bookingDetails.tourType}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Travel Date</p>
                      <p className="font-semibold">{new Date(bookingDetails.travelDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Number of Travelers</p>
                      <p className="font-semibold">{bookingDetails.numberOfTravelers} Travelers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Home className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Accommodation</p>
                      <p className="font-semibold">{bookingDetails.accommodation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Confirmation
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 border-egyptian-gold/50 hover:border-egyptian-gold hover:bg-egyptian-gold/10"
                >
                  <Link href="/tours">Browse More Tours</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-2 border-egyptian-gold/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Important Information</h3>
              <EgyptianDivider className="my-4" />
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                  A confirmation email has been sent to {bookingDetails.email}
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                  Please check your spam folder if you don't see our email
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                  Keep your booking reference ({bookingRef}) for future correspondence
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-egyptian-gold mt-0.5 flex-shrink-0" />
                  Our team is available 24/7 if you have any questions
                </p>
              </div>

              <div className="mt-6 p-4 bg-egyptian-gold/10 rounded-lg border border-egyptian-gold/30">
                <p className="text-sm font-medium">
                  Need to make changes? Contact us at{" "}
                  <a href="mailto:info@egydisetours.com" className="text-egyptian-gold hover:underline font-bold">
                    info@egydisetours.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+201234567890" className="text-egyptian-gold hover:underline font-bold">
                    +20 123 456 789
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button asChild variant="ghost" size="lg">
              <Link href="/" className="gap-2">
                <Home className="h-5 w-5" />
                Return to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
