"use client"

import React, { useState, useEffect } from "react"
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
    <div>
      Profile Client component rendering.
    </div>
  )
}
