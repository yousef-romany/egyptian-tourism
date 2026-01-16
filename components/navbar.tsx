"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ModeToggle from "./ModeToggle";
import MegaMenu from "./mega-menu";
import { CurrencySelector } from "./currency";
import { SearchInput } from "./search-input";
import { CartSidebar } from "./cart-sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: t("home"),
      href: `/${locale}`,
    },
    {
      name: t("tours"),
      href: `/${locale}/tours`,
    },
    {
      name: t("cairoPyramids"),
      href: `/${locale}/tours/cairo-pyramids`,
    },
    {
      name: t("luxorAswan"),
      href: `/${locale}/tours/luxor-aswan`,
    },
    {
      name: t("nileCruises"),
      href: `/${locale}/tours/nile-cruises`,
    },
    {
      name: t("desertAdventures"),
      href: `/${locale}/tours/desert-adventures`,
    },
    {
      name: t("history"),
      href: `/${locale}/history`,
    },
    {
      name: t("gallery"),
      href: `/${locale}/gallery`,
    },
    {
      name: t("shop"),
      href: `/${locale}/shop`,
    },
    {
      name: t("reviews"),
      href: `/${locale}/reviews`,
    },
    {
      name: t("faq"),
      href: `/${locale}/faq`,
    },
    {
      name: t("about"),
      href: `locale/contact`,
    },
    ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt={t('siteName')}
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <span className="text-xl font-bold">{t('siteName')}</span>
              </div>
            </Link>

            <div className="hidden md:block">
              <Button variant="ghost" size="sm" className="md:hidden" aria-label={t('menu')}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-egyptian-gold ${
                    pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex items-center justify-between py-4 border-b">
                  <div className="text-sm font-medium">
                    <span className="text-foreground">{t('hello')} {t('welcome')}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <LanguageSwitcher />
                </div>
              </SheetContent>
            </Sheet>

            {/* Search Bar */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label={t('search')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <CartSidebar />
              
              {/* User Authentication */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar?.url || ''} alt={user.username} />
                        <AvatarFallback>
                          {user.firstName?.[0] || user.username?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.username || user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/profile`} className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/wishlist`} className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('wishlist')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/track-order`} className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('trackOrder')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href={`/${locale}/login`}>
                      {t('login')}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/${locale}/register`}>
                      {t('register')}
                    </Link>
                  </Button>
                </div>
              )}
              
              <ModeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <SearchInput
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        variant="desktop"
      />
    </header>
  )
}
