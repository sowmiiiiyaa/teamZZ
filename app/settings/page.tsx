"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { Moon, Sun, Bell, User, Shield, LogOut, HelpCircle, Monitor, Palette } from "lucide-react"

export default function SettingsPage() {
  const { logout } = useAuth()
  const [settings, setSettings] = useState({
    displayMode: "dark",
    notifications: {
      taskReminders: true,
      friendRequests: true,
      projectUpdates: true,
      studyReminders: false,
      emailNotifications: true,
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      allowFriendRequests: true,
    },
  })

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const toggleTheme = () => {
    const newMode = settings.displayMode === "dark" ? "light" : "dark"
    setSettings({ ...settings, displayMode: newMode })
    document.documentElement.classList.toggle("dark")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Customize your app experience and preferences</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Display Mode */}
            <Card className="dark:glow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Display Mode
                </CardTitle>
                <CardDescription>Choose your preferred theme and appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {settings.displayMode === "dark" ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : (
                      <Sun className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <h4 className="font-medium text-foreground">Theme</h4>
                      <p className="text-sm text-muted-foreground">Currently using {settings.displayMode} mode</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={settings.displayMode}
                      onValueChange={(value) => {
                        setSettings({ ...settings, displayMode: value })
                        if (value === "dark") {
                          document.documentElement.classList.add("dark")
                        } else {
                          document.documentElement.classList.remove("dark")
                        }
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Monitor className="h-4 w-4 mr-2" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:glow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "taskReminders",
                    title: "Task Reminders",
                    description: "Get notified about upcoming deadlines and tasks",
                  },
                  {
                    key: "friendRequests",
                    title: "Friend Requests",
                    description: "Notifications when someone wants to connect",
                  },
                  {
                    key: "projectUpdates",
                    title: "Project Updates",
                    description: "Updates from collaborative projects",
                  },
                  {
                    key: "studyReminders",
                    title: "Study Reminders",
                    description: "Reminders for focus sessions and study time",
                  },
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    description: "Receive notifications via email",
                  },
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch
                      checked={settings.notifications[notification.key as keyof typeof settings.notifications]}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [notification.key]: checked,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="dark:glow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Details
                </CardTitle>
                <CardDescription>Manage your profile visibility and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, profileVisibility: value },
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Show Online Status</h4>
                    <p className="text-sm text-muted-foreground">Let friends see when you're online</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showOnlineStatus}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, showOnlineStatus: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Allow Friend Requests</h4>
                    <p className="text-sm text-muted-foreground">Let others send you friend requests</p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowFriendRequests}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, allowFriendRequests: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account */}
            <Card className="dark:glow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Account
                </CardTitle>
                <CardDescription>Account management and security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Account Security</h4>
                    <p className="text-sm text-muted-foreground">Manage passwords and security settings</p>
                  </div>
                  <Button variant="outline">Manage Security</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">Sign Out</h4>
                    <p className="text-sm text-muted-foreground">Sign out from your account</p>
                  </div>
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="dark:glow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Help & Support
                </CardTitle>
                <CardDescription>Get help and support for using the app</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex-col bg-transparent">
                    <HelpCircle className="h-5 w-5 mb-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="h-16 flex-col bg-transparent">
                    <Bell className="h-5 w-5 mb-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
