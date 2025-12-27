"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Car, Users, MapPin, Calendar, CheckCircle, Clock } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const transportSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  pickupLocation: z.string().min(2, "Please enter pickup location"),
  dropoffLocation: z.string().min(2, "Please enter drop-off location"),
  pickupDate: z.string().min(1, "Please select pickup date"),
  pickupTime: z.string().min(1, "Please select pickup time"),
  numberOfPassengers: z.string().min(1, "Please enter number of passengers"),
})

type TransportFormData = z.infer<typeof transportSchema>

export default function TransportationBookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransportFormData>({
    resolver: zodResolver(transportSchema),
  })

  const onSubmit = async (data: TransportFormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Transportation booking:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const vehicles = [
    { type: "Standard Sedan", capacity: "1-3 passengers", price: "From $30/day" },
    { type: "Luxury Sedan", capacity: "1-3 passengers", price: "From $60/day" },
    { type: "SUV", capacity: "4-6 passengers", price: "From $80/day" },
    { type: "Van", capacity: "7-12 passengers", price: "From $120/day" },
    { type: "Bus", capacity: "13-30 passengers", price: "From $200/day" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0c1e35] via-[#1a3a5f] to-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.15),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark text-black font-bold text-base px-4 py-1.5 mb-6 shadow-lg">
              Transportation
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6">
              Book Your Transportation
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comfortable and reliable transportation for your Egyptian adventure
            </p>
            <EgyptianDivider className="mx-auto my-8 bg-egyptian-gold/70" />
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {isSubmitted && (
              <Card className="mb-8 border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Booking Received!</h3>
                      <p className="text-green-700 dark:text-green-300">We'll contact you soon to confirm your transportation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-egyptian-gold/30 shadow-2xl">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-2">Transportation Details</h2>
                <p className="text-muted-foreground text-lg mb-8">Please provide your transportation requirements</p>
                <EgyptianDivider className="my-6" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        className="border-2 focus:border-egyptian-gold"
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="border-2 focus:border-egyptian-gold"
                        placeholder="john@example.com"
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

                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <Select onValueChange={(value) => setValue("vehicleType", value)}>
                        <SelectTrigger className="border-2 focus:border-egyptian-gold">
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle, idx) => (
                            <SelectItem key={idx} value={vehicle.type.toLowerCase().replace(/\s/g, "-")}>
                              {vehicle.type} ({vehicle.capacity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.vehicleType && (
                        <p className="text-sm text-red-500">{errors.vehicleType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location *</Label>
                      <Input
                        id="pickupLocation"
                        {...register("pickupLocation")}
                        className="border-2 focus:border-egyptian-gold"
                        placeholder="Cairo Airport"
                      />
                      {errors.pickupLocation && (
                        <p className="text-sm text-red-500">{errors.pickupLocation.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dropoffLocation">Drop-off Location *</Label>
                      <Input
                        id="dropoffLocation"
                        {...register("dropoffLocation")}
                        className="border-2 focus:border-egyptian-gold"
                        placeholder="Giza Hotel"
                      />
                      {errors.dropoffLocation && (
                        <p className="text-sm text-red-500">{errors.dropoffLocation.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date *</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        {...register("pickupDate")}
                        className="border-2 focus:border-egyptian-gold"
                      />
                      {errors.pickupDate && (
                        <p className="text-sm text-red-500">{errors.pickupDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Pickup Time *</Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        {...register("pickupTime")}
                        className="border-2 focus:border-egyptian-gold"
                      />
                      {errors.pickupTime && (
                        <p className="text-sm text-red-500">{errors.pickupTime.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="numberOfPassengers">Number of Passengers *</Label>
                      <Input
                        id="numberOfPassengers"
                        type="number"
                        min="1"
                        {...register("numberOfPassengers")}
                        className="border-2 focus:border-egyptian-gold"
                        placeholder="2"
                      />
                      {errors.numberOfPassengers && (
                        <p className="text-sm text-red-500">{errors.numberOfPassengers.message}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Book Transportation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Vehicle Options */}
              <Card className="border-2 border-egyptian-gold/30 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Vehicle Options</h3>
                  <EgyptianDivider className="my-4" />
                  <div className="space-y-4">
                    {vehicles.map((vehicle, idx) => (
                      <div key={idx} className="border-b border-muted pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Car className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-bold">{vehicle.type}</h4>
                            <p className="text-sm text-muted-foreground">{vehicle.capacity}</p>
                            <p className="text-sm font-semibold text-egyptian-gold mt-1">{vehicle.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="border-2 border-egyptian-gold/30 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Why Book With Us?</h3>
                  <EgyptianDivider className="my-4" />
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Professional Drivers</p>
                        <p className="text-sm text-muted-foreground">Licensed and experienced</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">24/7 Availability</p>
                        <p className="text-sm text-muted-foreground">Always ready to serve</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Users className="h-5 w-5 text-egyptian-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Comfortable Vehicles</p>
                        <p className="text-sm text-muted-foreground">Modern and well-maintained</p>
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
