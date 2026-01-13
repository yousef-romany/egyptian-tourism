'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Star, BookOpen, User, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Tours',
      href: '/tours',
      icon: Map,
    },
    {
      name: 'Reviews',
      href: '/reviews',
      icon: Star,
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: BookOpen,
    },
    {
      name: 'Menu',
      href: '#',
      icon: Menu,
      isMenu: true,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const menuLinks = [
    { name: 'History', href: '/history' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Profile', href: '/profile' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Login', href: '/login' },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-egyptian-gold/20 shadow-2xl lg:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            if (item.isMenu) {
              return (
                <Sheet key={item.name} open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      className={cn(
                        'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                        active
                          ? 'text-egyptian-gold'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      aria-label="Menu"
                    >
                      <Icon className={cn('h-5 w-5', active && 'text-egyptian-gold')} />
                      <span className="text-xs font-medium">{item.name}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl border-t-2 border-egyptian-gold/30">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-egyptian-gold/20">
                        <div className="relative w-12 h-12 overflow-hidden">
                          <Image
                            src="/logo.png"
                            alt="Egydise Tours"
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-heading font-bold text-egyptian-gold">Egydise Tours</h2>
                          <p className="text-sm text-muted-foreground">Menu</p>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                          {menuLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={cn(
                                'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all',
                                isActive(link.href)
                                  ? 'border-egyptian-gold bg-egyptian-gold/10 text-egyptian-gold'
                                  : 'border-egyptian-gold/20 hover:border-egyptian-gold/40 hover:bg-egyptian-gold/5'
                              )}
                            >
                              <span className="font-medium text-sm">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-egyptian-gold/20">
                        <Button
                          asChild
                          className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black font-bold"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Link href="/book-now">Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                  active
                    ? 'text-egyptian-gold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5', active && 'text-egyptian-gold')} />
                <span className="text-xs font-medium">{item.name}</span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-egyptian-gold rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 lg:hidden" />
    </>
  )
}