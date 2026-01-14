"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/admin/stat-card"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { BookingTable } from "@/components/admin/booking-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Package,
  Star,
  Loader2,
} from "lucide-react"
import strapiAPI from "@/lib/api/strapi"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [overview, setOverview] = useState<any>(null)
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [bookingsMeta, setBookingsMeta] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })
  const [topTours, setTopTours] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const { toast } = useToast()

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const [overviewData, chartData, bookingsData, toursData] = await Promise.all([
        strapiAPI.adminDashboard.getOverview(),
        strapiAPI.adminDashboard.getRevenueChart(30),
        strapiAPI.adminDashboard.getBookings(1, 10),
        strapiAPI.adminDashboard.getTopTours(5),
      ])

      setOverview(overviewData)
      setRevenueData(chartData)
      setBookings(bookingsData.data)
      setBookingsMeta(bookingsData.meta)
      setTopTours(toursData)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookingsPageChange = async (page: number) => {
    try {
      setBookingsLoading(true)
      const data = await strapiAPI.adminDashboard.getBookings(page, 10)
      setBookings(data.data)
      setBookingsMeta(data.meta)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      })
    } finally {
      setBookingsLoading(false)
    }
  }

  const handleStatusFilter = async (status: string) => {
    try {
      setBookingsLoading(true)
      const filterStatus = status === "all" ? undefined : status
      const data = await strapiAPI.adminDashboard.getBookings(1, 10, filterStatus)
      setBookings(data.data)
      setBookingsMeta(data.meta)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to filter bookings",
        variant: "destructive",
      })
    } finally {
      setBookingsLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    try {
      setBookingsLoading(true)
      const data = await strapiAPI.adminDashboard.getBookings(1, 10, undefined, query)
      setBookings(data.data)
      setBookingsMeta(data.meta)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search bookings",
        variant: "destructive",
      })
    } finally {
      setBookingsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-egyptian-gold mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your tours.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${overview?.revenue?.total?.toFixed(2) || 0}`}
          icon={DollarSign}
          description="All time"
        />
        <StatCard
          title="Total Bookings"
          value={overview?.bookings?.total || 0}
          icon={Calendar}
          description={`${overview?.bookings?.confirmed || 0} confirmed`}
        />
        <StatCard
          title="Pending Bookings"
          value={overview?.bookings?.pending || 0}
          icon={Package}
          description="Awaiting confirmation"
        />
        <StatCard
          title="Total Users"
          value={overview?.users?.total || 0}
          icon={Users}
          description="Registered customers"
        />
      </div>

      {/* Charts & Tables */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="tours">Top Tours</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              title="This Month"
              value={`$${overview?.revenue?.thisMonth?.toFixed(2) || 0}`}
              icon={TrendingUp}
              description="Current month revenue"
              className="lg:col-span-1"
            />
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          {bookingsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-egyptian-gold" />
            </div>
          ) : (
            <BookingTable
              bookings={bookings}
              meta={bookingsMeta}
              onPageChange={handleBookingsPageChange}
              onStatusFilter={handleStatusFilter}
              onSearch={handleSearch}
            />
          )}
        </TabsContent>

        <TabsContent value="tours" className="space-y-6">
          <Card className="border-egyptian-gold/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-egyptian-gold" />
                Top Performing Tours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTours.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No tour data available yet
                  </p>
                ) : (
                  topTours.map((tour, index) => (
                    <div
                      key={tour.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-egyptian-gold/20 text-egyptian-gold font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{tour.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {tour.bookings} bookings
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-egyptian-gold">
                          ${tour.revenue.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
