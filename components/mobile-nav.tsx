"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Home,
  Calendar,
  CheckSquare,
  Users,
  MessageCircle,
  UserPlus,
  BookOpen,
  FolderOpen,
  Timer,
  User,
  Settings,
  Menu,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Friends", href: "/friends", icon: UserPlus },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Projects", href: "/projects", icon: Users },
  { name: "Notes", href: "/notes", icon: BookOpen },
  { name: "Resources", href: "/marketplace", icon: FolderOpen },
  { name: "Focus Clock", href: "/focus", icon: Timer },
]

const bottomNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 w-80">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-6 py-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center dark:glow-primary">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <span className="text-lg font-semibold text-foreground">StudyHub</span>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12 px-4 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground dark:glow-subtle"
                        : "text-foreground hover:bg-muted/50",
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}

            <div className="py-4">
              <div className="h-px bg-border"></div>
            </div>

            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12 px-4 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground dark:glow-subtle"
                        : "text-foreground hover:bg-muted/50",
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center dark:glow-primary">
                <span className="text-sm font-medium text-primary-foreground">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Student</p>
                <p className="text-xs text-muted-foreground truncate">Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
