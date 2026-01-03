"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .refine(
      (email) => {
        // Additional validation: no disposable email domains
        const disposableDomains = ["tempmail.com", "throwaway.email", "guerrillamail.com"]
        const domain = email.split("@")[1]
        return !disposableDomains.includes(domain)
      },
      {
        message: "Please use a permanent email address",
      }
    ),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Import Strapi API
      const strapiAPI = (await import('@/lib/api/strapi')).default

      // Subscribe to newsletter via Strapi
      await strapiAPI.newsletter.subscribe(data.email, 'website-footer')

      console.log("Newsletter subscription successful:", data.email)

      // Track newsletter signup in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          source: 'website-footer',
          method: 'email_form'
        })
      }

      setIsSubmitted(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error("Newsletter subscription failed:", error)
      // Still show success to user (don't expose backend errors)
      setIsSubmitted(true)
      reset()

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }
  }

  return (
    <section className="bg-muted py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="papyrus" patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill="none" />
            <path d="M0,0 L10,10 M10,0 L0,10" stroke="#d4af37" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#papyrus)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-8">
            Stay updated with our latest tours, Egyptian history insights, and exclusive offers.
          </p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3 justify-center"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-green-800 dark:text-green-400">Thank you for subscribing to our newsletter!</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      {...register("email")}
                      className={`h-12 pl-4 pr-4 border-egyptian-gold/30 focus:border-egyptian-gold ${
                        errors.email ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 px-6 bg-egyptian-gold hover:bg-egyptian-gold-dark text-black font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Subscribe
                      </span>
                    )}
                  </Button>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <p>{errors.email.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our <Link href="/privacy-policy">Privacy Policy</Link> and consent to receive
            updates from Egydise Tours.
          </p>
        </div>
      </div>
    </section>
  )
}
