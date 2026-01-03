"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      privacy: false,
    },
  })

  const privacyValue = watch("privacy")

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Import Strapi API
      const strapiAPI = (await import('@/lib/api/strapi')).default

      // Map inquiry type to subject
      const subjectMap: Record<string, string> = {
        general: "General Inquiry",
        booking: "New Booking Request",
        existing: "Existing Booking",
        custom: "Custom Tour Request",
        feedback: "Feedback",
      }

      // Submit contact form to Strapi
      await strapiAPI.contact.submit({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        subject: subjectMap[data.inquiryType] || data.inquiryType,
        message: data.message,
      })

      console.log("Contact form submitted successfully")

      // Track contact form submission in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          inquiry_type: data.inquiryType,
          has_phone: !!data.phone,
          form_location: 'contact_page'
        })
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })

      setIsSubmitted(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error("Contact form submission failed:", error)

      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-green-900 dark:text-green-100">
            Message Sent Successfully!
          </h3>
          <p className="text-green-800 dark:text-green-300 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-500 text-green-700 hover:bg-green-50 dark:text-green-300"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-muted/30 p-8 rounded-2xl border border-egyptian-gold/10 hover:border-egyptian-gold/20 transition-colors"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType">
              Inquiry Type <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setValue("inquiryType", value)}>
              <SelectTrigger id="inquiryType" className={errors.inquiryType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select an inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="booking">New Booking</SelectItem>
                <SelectItem value="existing">Existing Booking</SelectItem>
                <SelectItem value="custom">Custom Tour Request</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            {errors.inquiryType && (
              <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your inquiry or tour preferences"
              className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={privacyValue}
              onCheckedChange={(checked) => setValue("privacy", checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-egyptian-gold hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and consent to Egydise Tours processing my data.{" "}
                <span className="text-red-500">*</span>
              </Label>
              {errors.privacy && (
                <p className="text-sm text-red-500">{errors.privacy.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-egyptian-gold to-egyptian-gold-dark hover:from-egyptian-gold-dark hover:to-egyptian-gold text-black font-bold text-lg py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group disabled:opacity-50"
          >
            <span className="inline-flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </span>
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
