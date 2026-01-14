"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import strapiAPI from "@/lib/api/strapi"
import { Mail, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, Lock } from "lucide-react"



export default function ResetPasswordPage() {
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Get the reset code from URL query parameter
    const resetCode = searchParams.get("code")
    if (resetCode) {
      setCode(resetCode)
    }
  }, [searchParams])

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number")
      return false
    }
    
    if (password !== passwordConfirmation) {
      setError("Passwords do not match")
      return false
    }
    
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePassword()) {
      return
    }

    try {
      setIsLoading(true)
      
      // Call Strapi's reset password endpoint
      await strapiAPI.auth.resetPassword(code, password, passwordConfirmation)
      
      setIsSuccess(true)
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      })
      
      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
      
    } catch (error: any) {
      console.error("Reset password error:", error)
      
      const errorMessage = error?.error?.message || "Failed to reset password. The link may have expired."
      setError(errorMessage)
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
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
                  <h1 className="text-2xl font-heading font-bold mb-2">Password Reset Successful</h1>
                  <p className="text-muted-foreground">
                    Your password has been reset successfully.<br />
                    You will be redirected to the login page shortly.
                  </p>
                </div>

                <Button asChild className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">
                  <Link href="/login">Go to Login</Link>
                </Button>
              </div>
            </CardContent>
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
          <h1 className="text-2xl font-heading font-bold mb-2">Reset Your Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Password</CardTitle>
            <CardDescription>Choose a strong password for your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password" 
                    className="pl-9 pr-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="passwordConfirmation" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password" 
                    className="pl-9 pr-9"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Password must:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Be at least 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one lowercase letter</li>
                  <li>Contain at least one number</li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
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