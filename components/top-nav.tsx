"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Bell, Search, Plus } from "lucide-react"

const quickActions = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tasks", href: "/tasks" },
  { name: "Calendar", href: "/calendar" },
  { name: "Focus", href: "/focus" },
]

export function TopNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Navigation */}
        <MobileNav />

        {/* Logo - Desktop */}
        <div className="hidden md:flex items-center space-x-2 mr-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center dark:glow-primary">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <span className="text-lg font-semibold text-foreground">StudyHub</span>
          </Link>
        </div>

        {/* Quick Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {quickActions.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground dark:glow-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Quick Add */}
          <Button size="sm" className="gradient-purple dark:glow-subtle">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Avatar */}
          <Link href="/profile">
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {user?.initials || "JS"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
