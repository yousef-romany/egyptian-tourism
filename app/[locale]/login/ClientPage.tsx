"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, User, Facebook, Chrome } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useTranslations } from "next-intl"
import { useToast } from "@/hooks/use-toast"

export default function ClientLoginPage() {
  const router = useRouter()
  const { login, register, loginWithOAuth } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const t = useTranslations('Auth')

  // Login form state
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: t('Common.error'),
        description: t('Common.validationError'),
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    try {
      await login(loginEmail, loginPassword)
      toast({
        title: t('Common.success'),
        description: t('loginSuccess'),
      })
      router.push("/profile")
    } catch (error: any) {
      toast({
        title: t('Common.error'),
        description: error?.message || t('Common.error'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // OAuth login handlers
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithOAuth('google')
    } catch (error: any) {
      toast({
        title: t('Common.error'),
        description: error?.message || t('Common.error'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithOAuth('facebook')
    } catch (error: any) {
      toast({
        title: t('Common.error'),
        description: error?.message || t('Common.error'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Register form state
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName || !lastName || !registerEmail || !registerPassword) {
      toast({
        title: t('Common.error'),
        description: t('Common.validationError'),
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    try {
      await register({
        username: registerEmail.split('@')[0],
        email: registerEmail,
        password: registerPassword,
        firstName,
        lastName,
      })
      toast({
        title: t('Common.success'),
        description: t('signupSuccess'),
      })
      router.push("/profile")
    } catch (error: any) {
      toast({
        title: t('Common.error'),
        description: error?.message || t('Common.error'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted pb-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-[#0c1e35] to-[#1a3a5c] py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Welcome to <span className="text-egyptian-gold">WanderLand Egypt</span>
            </h1>
            <p className="text-lg text-gray-200">
              {t('loginSubtitle')}
            </p>
          </div>
        </div>

        {/* Login/Register Tabs */}
        <div className="w-full max-w-md mx-auto mt-8">
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="register">{t('signup')}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>{t('login')}</CardTitle>
                  <CardDescription>
                    {t('loginDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            className="pl-9"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t('passwordPlaceholder')}
                            className="pl-9 pr-9"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        {t('rememberMe')}
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
                      disabled={isLoading}
                    >
                      {isLoading ? t('loggingIn') : t('login')}
                    </Button>
                  </form>

                  {/* OAuth Login Options */}
                  <div className="mt-6 space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          {t('orContinueWith')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2"
                      >
                        <Chrome className="h-4 w-4" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleFacebookLogin}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>{t('register')}</CardTitle>
                  <CardDescription>
                    {t('registerDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t('firstName')}</Label>
                        <Input
                          id="first-name"
                          placeholder={t('firstNamePlaceholder')}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t('lastName')}</Label>
                        <Input
                          id="last-name"
                          placeholder={t('lastNamePlaceholder')}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                    <div>
                        <Label htmlFor="register-email">{t('email')}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                          id="register-email"
                          type="email"
                          placeholder={t('emailPlaceholder')}
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                        </div>
                      </div>
                    <div>
                        <Label htmlFor="register-password">{t('password')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t('passwordPlaceholder')}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t('confirmPasswordPlaceholder')}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm font-normal">
                          {t('acceptTerms')}
                        </Label>
                        <Link href="/terms" className="text-egyptian-gold hover:underline">
                          {t('termsOfService')}
                        </Link>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? t('creatingAccount') : t('createAccount')}
                      </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
