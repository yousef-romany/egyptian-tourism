import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Forgot Password - Egydise Tours",
  description: "Reset your password for your Egydise Tours account.",
}

export default function ForgotPasswordPage() {
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="your.email@example.com" className="pl-9" />
              </div>
            </div>

            <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black">Send Reset Link</Button>
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

