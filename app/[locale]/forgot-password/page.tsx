"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import strapiAPI from "@/lib/api/strapi"
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Forgot Password - Egydise Tours",
  description: "Reset your password for your Egydise Tours account.",
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      
      // Call Strapi's forgot password endpoint
      await strapiAPI.auth.forgotPassword(email)
      
      setIsSubmitted(true)
      
      toast({
        title: "Reset Email Sent",
        description: "If an account with this email exists, you will receive password reset instructions.",
      })
    } catch (error: any) {
      console.error("Forgot password error:", error)
      
      // Show a generic message even if email doesn't exist (security best practice)
      setIsSubmitted(true)
      
      toast({
        title: "Reset Email Sent",
        description: "If an account with this email exists, you will receive password reset instructions.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen bg-muted items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="relative w-10 h-10 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Egydise Tours Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-heading font-bold tracking-wider text-egyptian-gold">Egydise Tours</span>
              </div>
            </Link>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-heading font-bold mb-2">Check Your Email</h1>
                  <p className="text-muted-foreground">
                    We've sent password reset instructions to:<br />
                    <span className="font-medium">{email}</span>
                  </p>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Didn't receive the email?</p>
                  <p>Check your spam folder or</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-egyptian-gold hover:underline font-medium"
                  >
                    try a different email address
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Link
                href="/login"
                className="text-egyptian-gold hover:underline font-medium flex items-center gap-2 mx-auto mt-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Egydise Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-heading font-bold tracking-wider text-egyptian-gold">Egydise Tours</span>
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold mb-2">Forgot your password?</h1>
          <p className="text-muted-foreground">No worries, we'll send you reset instructions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col">
            <Link
              href="/login"
              className="text-egyptian-gold hover:underline font-medium flex items-center gap-2 mx-auto mt-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
