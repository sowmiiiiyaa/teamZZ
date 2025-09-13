"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Calendar,
  CheckSquare,
  Settings,
  User,
  BookOpen,
  Timer,
  Users,
  MessageCircle,
  UserPlus,
  FolderOpen,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and quick stats",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    description: "Schedule and events",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    description: "To-do lists and deadlines",
  },
  {
    name: "Friends",
    href: "/friends",
    icon: UserPlus,
    description: "Connect with peers",
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageCircle,
    description: "Messages and discussions",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Users,
    description: "Team collaboration",
  },
  {
    name: "Notes",
    href: "/notes",
    icon: BookOpen,
    description: "Study materials",
  },
  {
    name: "Resources",
    href: "/marketplace",
    icon: FolderOpen,
    description: "Share and rent resources",
  },
  {
    name: "Focus Clock",
    href: "/focus",
    icon: Timer,
    description: "Pomodoro sessions",
  },
]

const bottomNavigation = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Personal information",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "App preferences",
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center dark:glow-primary">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">StudyHub</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm dark:glow-subtle"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  <span className="truncate">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>

        <Separator className="my-4 bg-sidebar-border" />

        <div className="space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm dark:glow-subtle"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  <span className="truncate">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* User info at bottom */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center dark:glow-primary">
            <span className="text-xs font-medium text-primary-foreground">JS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Student</p>
            <p className="text-xs text-muted-foreground truncate">Computer Science</p>
          </div>
        </div>
      </div>
    </div>
  )
}
