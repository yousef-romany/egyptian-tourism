"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { getStoredUser } from "@/lib/api/strapi"
import strapiAPI from "@/lib/api/strapi"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const user = getStoredUser()

  useEffect(() => {
    // Check if user is authenticated
    if (!strapiAPI.auth.isAuthenticated()) {
      router.push("/login?redirect=/admin")
      return
    }

    // Check if user is admin (you can add role check here)
    const currentUser = getStoredUser()
    if (!currentUser) {
      router.push("/login?redirect=/admin")
      return
    }

    // TODO: Add admin role check
    // if (currentUser.role?.type !== 'admin') {
    //   router.push('/')
    //   return
    // }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    strapiAPI.auth.logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-egyptian-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: TrendingUp, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-egyptian-gold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-card border-r
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 hidden lg:block">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-egyptian-gold flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Egydise Tours</h1>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              </Link>
            </div>

            <Separator className="hidden lg:block" />

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-egyptian-gold/10 hover:text-egyptian-gold"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <Separator />

            {/* User Info & Logout */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-3 p-2">
                <div className="h-10 w-10 rounded-full bg-egyptian-gold/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-egyptian-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.username || user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
