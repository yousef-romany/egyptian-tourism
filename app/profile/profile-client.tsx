"use client"

import { useState } from "react"
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
import {
  User,
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
} from "lucide-react"

export default function ProfileClient() {
  const [isEditing, setIsEditing] = useState(false)

  const userProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001, USA",
    nationality: "American",
    joinDate: "March 2022",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Passionate traveler with a love for ancient history and culture. I've visited over 30 countries and Egypt has always been at the top of my bucket list!",
  }

  const upcomingBookings = [
    {
      id: "BK-2023-1234",
      tourName: "Giza Pyramids & Sphinx",
      date: "May 15, 2023",
      status: "Confirmed",
      price: "$89",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "BK-2023-1235",
      tourName: "Nile Dinner Cruise",
      date: "May 17, 2023",
      status: "Confirmed",
      price: "$65",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const pastBookings = [
    {
      id: "BK-2022-9876",
      tourName: "Luxor Valley of Kings",
      date: "November 10, 2022",
      status: "Completed",
      price: "$120",
      image: "/placeholder.svg?height=100&width=150",
      hasReview: true,
      rating: 5,
    },
    {
      id: "BK-2022-9875",
      tourName: "Alexandria Day Trip",
      date: "November 8, 2022",
      status: "Completed",
      price: "$95",
      image: "/placeholder.svg?height=100&width=150",
      hasReview: false,
    },
  ]

  return (
    <div className="min-h-screen bg-muted pb-16">
      <div className="relative bg-[#0c1e35] text-white py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1600"
            alt="Egyptian landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1e35]/90"></div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-egyptian-gold">
                <Image
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt={userProfile.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-egyptian-gold text-black p-2 rounded-full">
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">{userProfile.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-egyptian-gold/20 text-egyptian-gold border-egyptian-gold">Gold Member</Badge>
                <p className="text-white/70 text-sm">Member since {userProfile.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[600px] mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal details</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={userProfile.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={userProfile.email} />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={userProfile.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input id="nationality" defaultValue={userProfile.nationality} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue={userProfile.address} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" defaultValue={userProfile.bio} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-egyptian-gold mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{userProfile.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-egyptian-gold mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{userProfile.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-egyptian-gold mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{userProfile.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-egyptian-gold mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-medium">{userProfile.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Globe className="h-5 w-5 text-egyptian-gold mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Nationality</p>
                            <p className="font-medium">{userProfile.nationality}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Bio</p>
                          <p>{userProfile.bio}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Travel Preferences</CardTitle>
                    <CardDescription>Help us personalize your experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="interests">Travel Interests</Label>
                          <select id="interests" className="w-full border rounded-md p-2">
                            <option>Historical Sites</option>
                            <option>Cultural Experiences</option>
                            <option>Adventure Activities</option>
                            <option>Relaxation & Wellness</option>
                            <option>Culinary Experiences</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accommodation">Preferred Accommodation</Label>
                          <select id="accommodation" className="w-full border rounded-md p-2">
                            <option>Luxury Hotels</option>
                            <option>Mid-range Hotels</option>
                            <option>Budget-friendly Options</option>
                            <option>Boutique Hotels</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="trip-length">Typical Trip Length</Label>
                          <select id="trip-length" className="w-full border rounded-md p-2">
                            <option>1-3 days</option>
                            <option>4-7 days</option>
                            <option>1-2 weeks</option>
                            <option>More than 2 weeks</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">Travel Budget</Label>
                          <select id="budget" className="w-full border rounded-md p-2">
                            <option>Economy</option>
                            <option>Standard</option>
                            <option>Premium</option>
                            <option>Luxury</option>
                          </select>
                        </div>
                      </div>

                      <Button className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black mt-2">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-egyptian-gold" />
                        <span>Upcoming Tours</span>
                      </div>
                      <Badge>{upcomingBookings.length}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-egyptian-gold" />
                        <span>Loyalty Points</span>
                      </div>
                      <Badge className="bg-egyptian-gold text-black">1,250</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-egyptian-gold" />
                        <span>Countries Visited</span>
                      </div>
                      <Badge>3</Badge>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Membership Benefits</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                          <span>5% discount on all tours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                          <span>Priority booking for popular tours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                          <span>Free airport pickup on bookings over $300</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-egyptian-gold mt-0.5" />
                          <span>Exclusive member-only offers</span>
                        </li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Membership Details
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      FAQs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your scheduled tours and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                          <div className="w-full md:w-32 h-24 relative rounded-md overflow-hidden">
                            <Image
                              src={booking.image || "/placeholder.svg"}
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
                                <p className="text-sm text-muted-foreground">Booking ID</p>
                                <p className="font-medium">{booking.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium">{booking.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Price</p>
                                <p className="font-medium">{booking.price}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                                View Details
                              </Button>
                              <Button size="sm" variant="outline">
                                Modify Booking
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You don't have any upcoming bookings</p>
                      <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                        <Link href="/tours">Browse Tours</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Bookings</CardTitle>
                  <CardDescription>Your travel history with us</CardDescription>
                </CardHeader>
                <CardContent>
                  {pastBookings.length > 0 ? (
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                          <div className="w-full md:w-32 h-24 relative rounded-md overflow-hidden">
                            <Image
                              src={booking.image || "/placeholder.svg"}
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
                                <p className="text-sm text-muted-foreground">Booking ID</p>
                                <p className="font-medium">{booking.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium">{booking.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Price</p>
                                <p className="font-medium">{booking.price}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              {booking.hasReview ? (
                                <div className="flex items-center">
                                  <p className="text-sm mr-2">Your rating:</p>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < booking.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Button size="sm" className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                                  Write a Review
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm" variant="outline">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You don't have any past bookings</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Tours and experiences you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link href="/tours/giza-pyramids-sphinx" className="group block">
                    <div className="border rounded-lg overflow-hidden group-hover:border-egyptian-gold transition-colors">
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="Giza Pyramids & Sphinx"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">$89</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">Giza Pyramids & Sphinx</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span>4.9</span>
                          <span className="text-muted-foreground text-sm">(245 reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>Cairo</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>8 hours</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/tours/luxor-hot-air-balloon" className="group block">
                    <div className="border rounded-lg overflow-hidden group-hover:border-egyptian-gold transition-colors">
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="Luxor Hot Air Balloon"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">$120</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">Luxor Hot Air Balloon</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span>4.9</span>
                          <span className="text-muted-foreground text-sm">(203 reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>Luxor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>3 hours</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/tours/abu-simbel-temples" className="group block">
                    <div className="border rounded-lg overflow-hidden group-hover:border-egyptian-gold transition-colors">
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="Abu Simbel Temples"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 right-3 bg-egyptian-gold text-black font-bold">$140</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">Abu Simbel Temples</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span>4.9</span>
                          <span className="text-muted-foreground text-sm">(156 reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>Aswan</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>12 hours</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="mt-8 text-center">
                  <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                    <Link href="/tours">Explore More Tours</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your bookings and promotions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages for booking confirmations and updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter Subscription</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with travel tips and offers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black mt-4">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Manage Login Devices
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Manage Payment Methods
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your data and privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Profile Visibility</h3>
                        <p className="text-sm text-muted-foreground">Allow others to see your profile information</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Collection</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect usage data to improve our services
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      Download My Data
                    </Button>

                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

