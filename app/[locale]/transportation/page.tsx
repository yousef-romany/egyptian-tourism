import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Car, Users, Calendar, MapPin, Star, ChevronRight, AlertCircle } from "lucide-react"
import EgyptianDivider from "@/components/egyptian-divider"
import Newsletter from "@/components/newsletter"
import { getAllTransportation, getTransportationByType, getFeaturedDrivers, Transportation, Driver } from "@/lib/data/transportation"
import { useTranslations, useLocale } from "next-intl"

export const metadata: Metadata = {
  title: "Transportation & Drivers - WanderLand Egypt",
  description: "Book reliable transportation and professional drivers for your Egyptian adventure.",
}

// Testimonial interface
interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  text: string
  rating: number
}

export default async function TransportationPage() {
  const t = useTranslations('Transportation')
  const locale = useLocale()
  
  // Fetch transportation options and drivers from backend
  let transportOptions: Transportation[] = []
  let featuredDrivers: Driver[] = []
  let transportationError: string | null = null
  let driversError: string | null = null

  try {
    transportOptions = await getAllTransportation()
  } catch (error) {
    console.error('Failed to fetch transportation options:', error)
    transportationError = t('transportationError')
  }

  try {
    featuredDrivers = await getFeaturedDrivers()
  } catch (error) {
    console.error('Failed to fetch drivers:', error)
    driversError = t('driversError')
  }

  // Function to filter transportation by type
  const filterByType = async (type: string) => {
    try {
      return await getTransportationByType(type)
    } catch (error) {
      console.error(`Failed to filter transportation by type ${type}:`, error)
      return []
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative bg-[#0c1e35] text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Egyptian landscape with car"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg text-white/80 mb-6">
              {t('subtitle')}
            </p>
            <EgyptianDivider className="my-6 bg-white/50" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">{t('ourOptions')}</h2>
          <p className="text-muted-foreground">
            {t('chooseOptions')}
          </p>
        </div>

        {transportationError ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">{transportationError}</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="all">{t('all')}</TabsTrigger>
              <TabsTrigger value="sedan">{t('sedan')}</TabsTrigger>
              <TabsTrigger value="suv">{t('suv')}</TabsTrigger>
              <TabsTrigger value="group">{t('group')}</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {!transportationError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transportOptions.map((option) => (
              <Card
                key={option.id}
                className="overflow-hidden border-egyptian-gold/20 hover:border-egyptian-gold/50 transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-48">
                  <Image src={option.image || "/placeholder.svg"} alt={option.name} fill className="object-cover" />
                  <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                    {t('priceFrom')}{option.priceDisplay}/day
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {option.capacity}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.floor(option.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{option.rating}</span>
                    <span className="text-xs text-muted-foreground">({option.reviews} {t('reviews')})</span>
                  </div>

                  <h3 className="font-medium mb-2">{t('features')}:</h3>
                  <ul className="space-y-1 mb-4">
                    {option.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-egyptian-gold flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="border rounded-md p-2 text-center">
                      <p className="text-muted-foreground">{t('perDay')}</p>
                      <p className="font-bold">${option.pricePerDay}</p>
                    </div>
                    <div className="border rounded-md p-2 text-center">
                      <p className="text-muted-foreground">{t('perHour')}</p>
                      <p className="font-bold">${option.pricePerHour}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                    <Link href={`/${locale}/transportation/book`}>{t('bookNow')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <section className="bg-muted py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">{t('featuredDrivers')}</h2>
              <p className="text-muted-foreground">
                {t('meetOurDrivers')}
              </p>
            </div>

            {driversError ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{driversError}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {featuredDrivers.map((driver) => (
                  <Card key={driver.id} className="border-egyptian-gold/20 overflow-hidden">
                    <div className="p-6 text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-egyptian-gold/20">
                        <Image
                          src={driver.photo || "/placeholder.svg"}
                          alt={driver.name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
                      <p className="text-muted-foreground mb-3">{t('experience')}: {driver.experience}</p>

                      <div className="flex items-center justify-center gap-1 mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= Math.floor(driver.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{driver.rating}</span>
                        <span className="text-xs text-muted-foreground">({driver.reviews} {t('reviews')})</span>
                      </div>

                      <div className="space-y-3 text-left">
                        <div>
                          <p className="text-sm font-medium">{t('languages')}:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {driver.languages.slice(0, 3).map((language, index) => (
                              <Badge key={index} variant="outline" className="bg-egyptian-gold/10">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t('specialties')}:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {driver.specialties.slice(0, 3).map((specialty, index) => (
                              <Badge key={index} variant="outline" className="bg-egyptian-gold/10">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                        {t('requestDriver')}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="container py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">{t('whyChooseUs')}</h2>
              <EgyptianDivider className="my-6 max-w-xs" />

              <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Car className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('wellMaintained')}</h3>
                  <p className="text-muted-foreground">
                    {t('wellMaintainedDesc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('professionalDrivers')}</h3>
                  <p className="text-muted-foreground">
                    {t('professionalDriversDesc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('flexibleBooking')}</h3>
                  <p className="text-muted-foreground">
                    {t('flexibleBookingDesc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-egyptian-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-egyptian-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('nationwideCoverage')}</h3>
                  <p className="text-muted-foreground">
                    {t('nationwideCoverageDesc')}
                  </p>
                </div>
              </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">{t('whatCustomersSay')}</h2>
              <EgyptianDivider className="my-6 max-w-xs mx-auto" />

              <div className="space-y-6">
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  location: "London, UK",
                  avatar: "/placeholder.svg?height=80&width=80",
                  text: t('testimonial1'),
                  rating: 5,
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  location: "Toronto, Canada",
                  avatar: "/placeholder.svg?height=80&width=80",
                  text: t('testimonial2'),
                  rating: 5,
                },
                {
                  id: 3,
                  name: "Emma Wilson",
                  location: "Sydney, Australia",
                  avatar: "/placeholder.svg?height=80&width=80",
                  text: t('testimonial3'),
                  rating: 5,
                },
              ].map((testimonial) => (
                <Card key={testimonial.id} className="border-egyptian-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0c1e35] text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="car-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M0,20 L10,0 L20,20 Z" fill="#fff" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#car-pattern)" />
            </svg>
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold mb-6 text-egyptian-gold">
                {t('readyToBook')}
              </h2>
              <p className="text-white/80 mb-8">
                {t('readyToBookDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                  <Link href={`/${locale}/transportation/book`}>{t('bookTransportation')}</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={`/${locale}/contact`}>{t('contactForCustom')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </section>
    </div>
  )
}
