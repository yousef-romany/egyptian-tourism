"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Users, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(2, "Please select your country"),
  tourType: z.string().min(1, "Please select a tour type"),
  travelDate: z.string().min(1, "Please select a travel date"),
  numberOfTravelers: z.string().min(1, "Please enter number of travelers"),
  accommodation: z.string().min(1, "Please select accommodation preference"),
  specialRequests: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookNowPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    try {
      // Import strapi API
      const strapiAPI = (await import('@/lib/api/strapi')).default

      // Create booking in Strapi
      const booking = await strapiAPI.bookings.create({
        tourName: data.tourType,
        customerName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        numberOfPeople: parseInt(data.numberOfTravelers),
        tourDate: data.travelDate,
        totalPrice: 0, // Will be calculated by admin
        specialRequests: data.specialRequests || '',
        nationality: data.country,
      })

      console.log("Booking created:", booking)

      // Track booking completion in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'booking_completed', {
          tour_name: data.tourType,
          number_of_travelers: parseInt(data.numberOfTravelers),
          travel_date: data.travelDate,
          country: data.country,
          booking_reference: booking.bookingReference || `EGY-${booking.id}`,
          value: 0, // Will be updated when price is calculated
          currency: 'USD'
        })
      }

      // Store booking data in sessionStorage for confirmation page
      sessionStorage.setItem('bookingData', JSON.stringify({
        ...data,
        bookingRef: booking.bookingReference || `EGY-${booking.id}`,
        bookingId: booking.id
      }))

      setIsSubmitting(false)

      // Redirect to confirmation page
      router.push('/book-now/confirmation')

    } catch (error) {
      console.error("Booking failed:", error)
      setIsSubmitting(false)
      alert("Booking failed. Please try again or contact us directly.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-egyptian-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-egyptian-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-egyptian-gold/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-5 py-2.5 mb-8 shadow-lg">
              Book Your Adventure
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
              Start Your Egyptian Journey
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed">
              Fill out the form below and our team will contact you within 24 hours to customize your perfect Egyptian adventure.
            </p>
            <EgyptianDivider className="mx-auto my-10 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Enhanced Booking Form Section */}
      <section className="container py-20 md:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-egyptian-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {isSubmitted && (
              <Card className="mb-8 border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Booking Request Received!</h3>
                      <p className="text-green-700 dark:text-green-300">We'll contact you within 24 hours to confirm your booking.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-egyptian-gold/30 shadow-2xl">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-2">Booking Information</h2>
                <p className="text-muted-foreground text-lg mb-8">Please provide your details and preferences</p>
                <EgyptianDivider className="my-6" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Users className="h-6 w-6 text-egyptian-gold" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="john.doe@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          {...register("country")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="United States"
                        />
                        {errors.country && (
                          <p className="text-sm text-red-500">{errors.country.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <EgyptianDivider className="my-8" />

                  {/* Trip Details */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-egyptian-gold" />
                      Trip Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tourType">Tour Type *</Label>
                        <Select onValueChange={(value) => setValue("tourType", value)}>
                          <SelectTrigger className="border-2 focus:border-egyptian-gold">
                            <SelectValue placeholder="Select tour type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pyramids">Pyramids & Cairo</SelectItem>
                            <SelectItem value="luxor">Luxor & Aswan</SelectItem>
                            <SelectItem value="nile">Nile Cruise</SelectItem>
                            <SelectItem value="red-sea">Red Sea</SelectItem>
                            <SelectItem value="desert">Desert Adventures</SelectItem>
                            <SelectItem value="custom">Custom Tour</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.tourType && (
                          <p className="text-sm text-red-500">{errors.tourType.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="travelDate">Preferred Travel Date *</Label>
                        <Input
                          id="travelDate"
                          type="date"
                          {...register("travelDate")}
                          className="border-2 focus:border-egyptian-gold"
                        />
                        {errors.travelDate && (
                          <p className="text-sm text-red-500">{errors.travelDate.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numberOfTravelers">Number of Travelers *</Label>
                        <Input
                          id="numberOfTravelers"
                          type="number"
                          min="1"
                          {...register("numberOfTravelers")}
                          className="border-2 focus:border-egyptian-gold"
                          placeholder="2"
                        />
                        {errors.numberOfTravelers && (
                          <p className="text-sm text-red-500">{errors.numberOfTravelers.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accommodation">Accommodation Preference *</Label>
                        <Select onValueChange={(value) => setValue("accommodation", value)}>
                          <SelectTrigger className="border-2 focus:border-egyptian-gold">
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="budget">Budget (3-star)</SelectItem>
                            <SelectItem value="standard">Standard (4-star)</SelectItem>
                            <SelectItem value="luxury">Luxury (5-star)</SelectItem>
                            <SelectItem value="premium">Premium (5-star+)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.accommodation && (
                          <p className="text-sm text-red-500">{errors.accommodation.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <Textarea
                          id="specialRequests"
                          {...register("specialRequests")}
                          className="border-2 focus:border-egyptian-gold min-h-[120px]"
                          placeholder="Any dietary restrictions, accessibility needs, or special occasions we should know about..."
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/terms" className="text-egyptian-gold hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-egyptian-gold hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enhanced Why Book With Us */}
              <Card className="border-2 border-egyptian-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-egyptian-gold">
                <CardContent className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Why Book With Us?</h3>
                  <EgyptianDivider className="my-4" />
                  <div className="space-y-6">
                    <div className="flex gap-4 p-3 rounded-xl hover:bg-egyptian-gold/5 transition-all duration-300 group">
                      <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 group-hover:scale-110 transition-all duration-300">
                        <CheckCircle className="h-6 w-6 text-egyptian-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-egyptian-gold transition-colors">Best Price Guarantee</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We offer the best rates with no hidden fees
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 rounded-xl hover:bg-egyptian-gold/5 transition-all duration-300 group">
                      <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 group-hover:scale-110 transition-all duration-300">
                        <Clock className="h-6 w-6 text-egyptian-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-egyptian-gold transition-colors">24/7 Support</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Our team is available around the clock
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 rounded-xl hover:bg-egyptian-gold/5 transition-all duration-300 group">
                      <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 group-hover:scale-110 transition-all duration-300">
                        <Users className="h-6 w-6 text-egyptian-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-egyptian-gold transition-colors">Expert Guides</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          All tours led by certified Egyptologists
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 rounded-xl hover:bg-egyptian-gold/5 transition-all duration-300 group">
                      <div className="h-12 w-12 rounded-xl bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-egyptian-gold/20 group-hover:scale-110 transition-all duration-300">
                        <Calendar className="h-6 w-6 text-egyptian-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 group-hover:text-egyptian-gold transition-colors">Flexible Cancellation</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Free cancellation up to 48 hours before
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Contact Info */}
              <Card className="border-2 border-egyptian-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-egyptian-gold bg-gradient-to-br from-egyptian-gold/5 to-transparent">
                <CardContent className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Need Help?</h3>
                  <EgyptianDivider className="my-4" />
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-egyptian-gold/10 transition-all duration-300 group">
                      <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                        <Phone className="h-5 w-5 text-egyptian-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-egyptian-gold transition-colors">Call Us</p>
                        <p className="text-sm text-muted-foreground">+20 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-egyptian-gold/10 transition-all duration-300 group">
                      <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                        <Mail className="h-5 w-5 text-egyptian-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-egyptian-gold transition-colors">Email Us</p>
                        <p className="text-sm text-muted-foreground">info@egydisetours.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-egyptian-gold/10 transition-all duration-300 group">
                      <div className="h-10 w-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center group-hover:bg-egyptian-gold/20 transition-colors">
                        <Clock className="h-5 w-5 text-egyptian-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-egyptian-gold transition-colors">Working Hours</p>
                        <p className="text-sm text-muted-foreground">24/7 Available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
