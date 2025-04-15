"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png"
import ModeToggle from "./ModeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

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
      name: "Home",
      href: "/",
    },
    {
      name: "Tours",
      href: "/tours",
      dropdown: [
        { name: "All Tours", href: "/tours" },
        { name: "Cairo & Pyramids", href: "/tours/cairo-pyramids" },
        { name: "Luxor & Aswan", href: "/tours/luxor-aswan" },
        { name: "Nile Cruises", href: "/tours/nile-cruises" },
        { name: "Red Sea", href: "/tours/red-sea" },
        { name: "Desert Adventures", href: "/tours/desert-adventures" },
      ],
    },
    {
      name: "Reviews",
      href: "/reviews",
    },
    {
      name: "History",
      href: "/history",
      dropdown: [
        { name: "Ancient Egypt", href: "/history/ancient-egypt" },
        { name: "Pharaohs & Dynasties", href: "/history/pharaohs" },
        { name: "Temples & Monuments", href: "/history/temples" },
        { name: "Egyptian Gods", href: "/history/egyptian-gods" },
      ],
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
              <Image
                src={logo}
                alt="Egydise Tours Logo"
                className="object-contain max-w-[200px]"
              />
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && setActiveDropdown(link.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors relative group",
                    isActive(link.href)
                      ? "text-egyptian-gold"
                      : "text-foreground hover:text-egyptian-gold"
                  )}
                >
                  <span className="flex items-center gap-1">
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeDropdown === link.name ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </span>
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-egyptian-gold"
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-egyptian-gold transition-all duration-300 group-hover:w-full" />
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 rounded-md bg-background border border-egyptian-gold/20 shadow-lg overflow-hidden z-50"
                      >
                        <div className="py-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={cn(
                                "block px-4 py-2 text-sm transition-colors",
                                isActive(item.href)
                                  ? "bg-egyptian-gold/10 text-egyptian-gold"
                                  : "hover:bg-egyptian-gold/5 hover:text-egyptian-gold"
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-egyptian-gold/10 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <ModeToggle />
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-10 pl-3 pr-8 rounded-md border border-egyptian-gold/30 focus:border-egyptian-gold focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              asChild
              variant="outline"
              className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 hover:text-egyptian-gold-dark"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
            >
              <Link href="/book-now">Book Now</Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] sm:w-[350px] border-l border-egyptian-gold/20 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-egyptian-gold/10">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Egydise Tours Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg font-heading font-bold tracking-wider text-egyptian-gold">
                      Egydise Tours
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full h-10 pl-9 pr-3 rounded-md border border-egyptian-gold/30 focus:border-egyptian-gold focus:outline-none"
                    />
                  </div>
                </div>

                <nav className="flex-1 overflow-auto py-2 px-4">
                  <ul className="space-y-1">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        {link.dropdown ? (
                          <div className="mb-1">
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === link.name
                                    ? null
                                    : link.name
                                )
                              }
                              className={cn(
                                "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive(link.href)
                                  ? "bg-egyptian-gold/10 text-egyptian-gold"
                                  : "hover:bg-egyptian-gold/5 hover:text-egyptian-gold"
                              )}
                            >
                              <span>{link.name}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  activeDropdown === link.name
                                    ? "rotate-180"
                                    : ""
                                )}
                              />
                            </button>

                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden ml-4 mt-1 border-l-2 border-egyptian-gold/20 pl-4"
                                >
                                  {link.dropdown.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className={cn(
                                          "block px-3 py-2 text-sm rounded-md transition-colors",
                                          isActive(item.href)
                                            ? "bg-egyptian-gold/10 text-egyptian-gold"
                                            : "hover:bg-egyptian-gold/5 hover:text-egyptian-gold"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              isActive(link.href)
                                ? "bg-egyptian-gold/10 text-egyptian-gold"
                                : "hover:bg-egyptian-gold/5 hover:text-egyptian-gold"
                            )}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="p-6 border-t border-egyptian-gold/10">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 hover:text-egyptian-gold-dark"
                    >
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
                    >
                      <Link
                        href="/book-now"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
