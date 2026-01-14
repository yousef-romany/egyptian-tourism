"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import strapiAPI, { User as StrapiUser, Booking } from "@/lib/api/strapi"
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit,
  Check,
  Star,
  Clock,
  Loader2,
} from "lucide-react"
import { useTranslations } from 'next-intl'

export default function ProfileClient() {
  const { user: authUser, updateUser, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userProfile, setUserProfile] = useState<StrapiUser | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [wishlist, setWishlist] = useState<any[]>([])

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    nationality: "",
    bio: "",
  })

  const t = useTranslations('ProfilePage')

  // Load user data and bookings
  useEffect(() => {
    const loadData = async () => {
      if (!authUser) return

      try {
        setIsLoading(true)
        
        // Get user profile with relations
        const profileData = await strapiAPI.profile.get()
        setUserProfile(profileData)

        // Get user bookings
        const bookingsData = await strapiAPI.profile.getBookings()
        setBookings(bookingsData)

        // Get user wishlist
        const wishlistData = await strapiAPI.wishlist.get()
        setWishlist(wishlistData)

        // Initialize form data
        setFormData({
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          nationality: profileData.nationality || "",
          bio: profileData.bio || "",
        })
      } catch (error) {
        console.error("Failed to load profile data:", error)
        toast({
          title: t('Common.error'),
          description: t('Errors.tryAgain'),
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [authUser, toast])

  // Handle form submission
  const handleSaveProfile = async () => {
    if (!userProfile) return

    try {
      setIsSaving(true)
      
      // Combine first and last name for username if needed
      const updateData = {
        ...formData,
        username: userProfile.username, // Keep existing username
      }

      await updateUser(updateData)
      // Refresh user data after update
      const updatedUser = await strapiAPI.profile.get()
      setUserProfile(updatedUser)
      setIsEditing(false)
      
      toast({
        title: t('Common.success'),
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      console.error("Failed to update profile:", error)
      toast({
        title: t('Common.error'),
        description: error?.error?.message || t('Errors.tryAgain'),
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle password change
  const handleChangePassword = async () => {
    // This would open a password change dialog/modal
    toast({
      title: t('ProfilePage.settings'),
      description: "Password change functionality will be available soon.",
    })
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted pb-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-egyptian-gold" />
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-muted pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('Errors.pageNotFound')}</h1>
          <p className="text-muted-foreground mb-4">{t('Errors.somethingWentWrong')}</p>
          <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
            <Link href="/login">{t('Auth.login')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Separate bookings into upcoming and past
  const today = new Date()
  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.tourDate) > today && booking.status !== 'cancelled'
  )
  const pastBookings = bookings.filter(booking => 
    new Date(booking.tourDate) <= today || booking.status === 'cancelled' || booking.status === 'completed'
  )

  return (
    <div className="min-h-screen bg-muted pb-16">
      <div className="relative bg-[#0c1e35] text-white py-20 md:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1e35]/90 to-[#0c1e35]"></div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-egyptian-gold">
                <Image
                  src={strapiAPI.getMediaUrl(userProfile.avatar) || "/placeholder.svg"}
                  alt={`${userProfile.firstName || userProfile.username}`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-egyptian-gold text-black p-2 rounded-full">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl lg:text-7xl xl:text-8xl font-heading font-extrabold mb-8 bg-gradient-to-r from-white via-egyptian-gold to-white bg-clip-text text-transparent leading-tight">
                  {userProfile.firstName && userProfile.lastName 
                    ? `${userProfile.firstName} ${userProfile.lastName}` 
                    : userProfile.username
                  }
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-egyptian-gold/20 text-egyptian-gold border-egyptian-gold">
                    {t('ProfilePage.goldMember')}
                  </Badge>
                  <p className="text-white/70 text-sm">
                    {t('ProfilePage.memberSince')} {new Date(userProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="profile">{t('ProfilePage.profile')}</TabsTrigger>
                  <TabsTrigger value="bookings">{t('ProfilePage.bookings')}</TabsTrigger>
                  <TabsTrigger value="wishlist">{t('ProfilePage.wishlist')}</TabsTrigger>
                  <TabsTrigger value="settings">{t('ProfilePage.settings')}</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{t('ProfilePage.personalInfo')}</CardTitle>
                        <CardDescription>{t('ProfilePage.managePersonalDetails')}</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('Common.saving')}...
                          </>
                        ) : isEditing ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            {t('Common.save')}
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('Common.edit')}
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">{t('ProfilePage.firstName')}</Label>
                              <Input 
                                id="firstName" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">{t('ProfilePage.lastName')}</Label>
                              <Input 
                                id="lastName" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">{t('Auth.email')}</Label>
                            <Input id="email" value={userProfile.email} disabled />
                            <p className="text-sm text-muted-foreground">{t('Auth.contactSupport')}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">{t('ProfilePage.phone')}</Label>
                              <Input 
                                id="phone" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nationality">{t('ProfilePage.nationality')}</Label>
                              <Input 
                                id="nationality" 
                                value={formData.nationality}
                                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">{t('ProfilePage.address')}</Label>
                            <Input 
                              id="address" 
                              value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                              />
                            </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">{t('ProfilePage.bio')}</Label>
                            <Textarea 
                              id="bio" 
                              value={formData.bio}
                              onChange={(e) => setFormData({...formData, bio: e.target.value})}
                              rows={4}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <UserIcon className="h-5 w-5 text-egyptian-gold mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{t('ProfilePage.fullName')}</p>
                              <p className="font-medium">
                                {userProfile.firstName && userProfile.lastName 
                                  ? `${userProfile.firstName} ${userProfile.lastName}` 
                                  : userProfile.username
                                }
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-egyptian-gold mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{t('Auth.email')}</p>
                              <p className="font-medium">{userProfile.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-egyptian-gold mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{t('ProfilePage.phone')}</p>
                              <p className="font-medium">{userProfile.phone || t('Common.notProvided')}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-egyptian-gold mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{t('ProfilePage.address')}</p>
                              <p className="font-medium">{userProfile.address || t('Common.notProvided')}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-egyptian-gold mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{t('ProfilePage.nationality')}</p>
                              <p className="font-medium">{userProfile.nationality || t('Common.notProvided')}</p>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">{t('ProfilePage.bio')}</p>
                            <p>{userProfile.bio || t('ProfilePage.noBio')}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>{t('ProfilePage.accountSummary')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-egyptian-gold" />
                          <span>{t('ProfilePage.upcomingBookings')}</span>
                          <Badge>{upcomingBookings.length}</Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-egyptian-gold" />
                          <span>{t('ProfilePage.loyaltyPoints')}</span>
                          <Badge className="bg-egyptian-gold text-black">1,250</Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-egyptian-gold" />
                          <span>{t('ProfilePage.countriesVisited')}</span>
                          <Badge>3</Badge>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">{t('Footer.membershipBenefits')}</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                            <span>{t('HomePage.testimonials.discount')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                            <span>{t('HomePage.testimonials.priority')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                            <span>{t('HomePage.testimonials.freePickup')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                            <span>{t('HomePage.testimonials.exclusiveOffers')}</span>
                          </li>
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full">
                        {t('ProfilePage.viewMembershipDetails')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>{t('Footer.needHelp')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        {t('ContactPage.contactInfo')}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        {t('ContactPage.callUs')}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        {t('Navigation.faq')}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('ProfilePage.upcomingBookings')}</CardTitle>
                      <CardDescription>{t('ToursPage.upcomingBookings')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                              <div className="w-full md:w-32 h-24 relative rounded-md overflow-hidden">
                                <Image
                                  src={booking.tour?.image ? strapiAPI.getMediaUrl(booking.tour.image) : "/placeholder.svg"}
                                  alt={booking.tourName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                  <h3 className="font-bold text-lg">{booking.tourName}</h3>
                                  <Badge className="bg-green-100 text-green-800 md:ml-2 mt-1 md:mt-0 w-fit">
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.bookingReference')}</p>
                                    <p className="font-medium">{booking.bookingReference}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('TourPage.date')}</p>
                                    <p className="font-medium">{new Date(booking.tourDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.numberOfPeople')}</p>
                                    <p className="font-medium">{booking.numberOfPeople}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.totalPrice')}</p>
                                    <p className="font-medium">${booking.totalPrice}</p>
                                  </div>
                                </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <Button size="sm" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                                    {t('TourPage.viewDetails')}
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    {t('BookingPage.modifyBooking')}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">{t('ProfilePage.noUpcomingBookings')}</p>
                          <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            <Link href="/tours">{t('ProfilePage.exploreTours')}</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t('ProfilePage.pastBookings')}</CardTitle>
                      <CardDescription>{t('ToursPage.pastBookings')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pastBookings.length > 0 ? (
                        <div className="space-y-4">
                          {pastBookings.map((booking) => (
                            <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                              <div className="w-full md:w-32 h-24 relative rounded-md overflow-hidden">
                                <Image
                                  src={booking.tour?.image ? strapiAPI.getMediaUrl(booking.tour.image) : "/placeholder.svg"}
                                  alt={booking.tourName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                  <h3 className="font-bold text-lg">{booking.tourName}</h3>
                                  <Badge className="bg-gray-100 text-gray-800 md:ml-2 mt-1 md:mt-0 w-fit">
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.bookingReference')}</p>
                                    <p className="font-medium">{booking.bookingReference}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('TourPage.date')}</p>
                                    <p className="font-medium">{new Date(booking.tourDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.numberOfPeople')}</p>
                                    <p className="font-medium">{booking.numberOfPeople}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t('BookingPage.totalPrice')}</p>
                                    <p className="font-medium">${booking.totalPrice}</p>
                                  </div>
                                </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <Button size="sm" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                                    {t('ProfilePage.writeReview')}
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    {t('TourPage.viewDetails')}
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    {t('BookingPage.bookAgain')}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">{t('ProfilePage.noPastBookings')}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('ProfilePage.myWishlist')}</CardTitle>
                      <CardDescription>{t('ToursPage.subtitle')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {wishlist.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {wishlist.map((item) => (
                            <Link href={`/tours/${item.tour.slug}`} className="group block" key={item.id}>
                              <div className="border rounded-lg overflow-hidden group-hover:border-egyptian-gold transition-colors">
                                <div className="relative h-48">
                                  <Image
                                    src={item.tour.image ? strapiAPI.getMediaUrl(item.tour.image) : "/placeholder.svg?height=300&width=400"}
                                    alt={item.tour.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">
                                    ${item.tour.price}
                                  </Badge>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-bold text-lg mb-2">{item.tour.title}</h3>
                                  <div className="flex items-center gap-1 mb-2">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span>{item.tour.rating}</span>
                                    <span className="text-muted-foreground text-sm">({item.tour.reviews} {t('ToursPage.reviews')})</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{item.tour.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{item.tour.duration}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                                    {t('TourPage.bookThisTour')}
                                  </Button>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">{t('ProfilePage.noWishlistItems')}</p>
                          <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            <Link href="/tours">{t('ProfilePage.exploreTours')}</Link>
                          </Button>
                        </div>
                      )}
                      
                      {wishlist.length > 0 && (
                        <div className="mt-8 text-center">
                          <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            <Link href="/tours">{t('ProfilePage.exploreTours')}</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('ProfilePage.accountSettings')}</CardTitle>
                        <CardDescription>{t('ProfilePage.manageAccountPreferences')}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{t('Auth.emailNotifications')}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t('ProfilePage.receiveUpdates')}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{t('Auth.smsNotifications')}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t('ProfilePage.receiveTextUpdates')}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{t('ProfilePage.twoFactorAuthentication')}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t('ProfilePage.addExtraSecurity')}
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{t('Footer.newsletter')}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t('Footer.receiveMonthlyNewsletter')}
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black mt-4">
                          {t('Common.save')}
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="space-y-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('ProfilePage.passwordSecurity')}</CardTitle>
                          <CardDescription>{t('ProfilePage.managePasswordAndSecurity')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button variant="outline" className="w-full justify-start" onClick={handleChangePassword}>
                            <Shield className="mr-2 h-4 w-4" />
                            {t('Auth.changePassword')}
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Bell className="mr-2 h-4 w-4" />
                            {t('ProfilePage.manageLoginDevices')}
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <CreditCard className="mr-2 h-4 w-4" />
                            {t('ProfilePage.managePaymentMethods')}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>{t('Footer.privacySettings')}</CardTitle>
                          <CardDescription>{t('ProfilePage.controlDataAndPrivacy')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{t('ProfilePage.profileVisibility')}</h3>
                              <p className="text-sm text-muted-foreground">
                                {t('ProfilePage.allowOthersToSeeProfile')}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{t('ProfilePage.dataCollection')}</h3>
                              <p className="text-sm text-muted-foreground">
                                {t('ProfilePage.allowUsageData')}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <Button variant="outline" className="w-full mt-4">
                            {t('ProfilePage.downloadMyData')}
                          </Button>

                          <Button variant="destructive" className="w-full">
                            {t('ProfilePage.deleteAccount')}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
