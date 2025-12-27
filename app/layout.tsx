import type React from "react"
import "./globals.css";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { OrganizationJsonLd } from "@/components/tour-json-ld"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const heading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata = {
  title: "Egydise Tours - Experience the Magic of Egypt",
  description:
    "Discover the wonders of Egypt with our award-winning tours. From the majestic pyramids to the serene Nile River.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className={`${inter.variable} ${heading.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



