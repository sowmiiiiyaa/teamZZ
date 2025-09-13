"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/lib/auth"
import { Mail, Smartphone, Chrome, Eye, EyeOff, UserPlus, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const { login, loginWithGoogle, signUp, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailOrPhone.trim() || !password.trim()) return

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert("Passwords don't match!")
          return
        }
        await signUp(emailOrPhone, password)
      } else {
        await login(emailOrPhone, password)
      }
      router.push("/dashboard")
    } catch (error) {
      console.error("Authentication failed:", error)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google login failed:", error)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm dark:glow-subtle">
            <CardHeader className="space-y-4 text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 dark:glow-primary">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-sm"></div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                {isSignUp ? "Join our student community" : "Sign in to access your student portal"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailOrPhone" className="text-sm font-medium text-foreground">
                    Email or Mobile Number
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      {emailOrPhone.includes("@") ? <Mail className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                    </div>
                    <Input
                      id="emailOrPhone"
                      type="text"
                      placeholder="Enter your email or mobile number"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 gradient-purple hover:opacity-90 text-primary-foreground font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] dark:glow-subtle"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>{isSignUp ? "Creating Account..." : "Signing in..."}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {isSignUp ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                      <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-12 border-border hover:bg-muted/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] bg-transparent"
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Gmail
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  {isSignUp ? "Already have an account?" : "New to our platform?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {isSignUp ? "Sign in" : "Create account"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2024 Student Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
