"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"
import {
  User,
  Lock,
  Camera,
  Github,
  Linkedin,
  MessageSquare,
  Code,
  Trophy,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Edit,
} from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Student",
    username: "johnstudent",
    email: user?.email || "john.student@edu.com",
    bio: "Computer Science student passionate about AI and machine learning. Always eager to collaborate on innovative projects.",
    pronouns: "he/him",
    isPrivate: false,
    contacts: {
      github: "johnstudent",
      leetcode: "john_codes",
      hackerrank: "johnstudent",
      linkedin: "john-student-cs",
      discord: "johnstudent#1234",
    },
  })

  const handleSave = () => {
    // Save profile data logic here
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="gradient-purple dark:glow-subtle">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="gradient-purple dark:glow-subtle">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="contacts">Social Links</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="dark:glow-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your profile picture, name, and bio information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                          {user?.initials || "JS"}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          variant="secondary"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{profileData.name}</h3>
                      <p className="text-muted-foreground">@{profileData.username}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{profileData.pronouns}</Badge>
                        <Badge variant={profileData.isPrivate ? "destructive" : "default"}>
                          {profileData.isPrivate ? "Private" : "Public"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pronouns">Pronouns</Label>
                      <Select
                        value={profileData.pronouns}
                        onValueChange={(value) => setProfileData({ ...profileData, pronouns: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="he/him">he/him</SelectItem>
                          <SelectItem value="she/her">she/her</SelectItem>
                          <SelectItem value="they/them">they/them</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Account Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        Make your profile private to control who can see your information
                      </p>
                    </div>
                    <Switch
                      checked={profileData.isPrivate}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, isPrivate: checked })}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="dark:glow-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Update your password and manage account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="h-12 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground">Permanently log out from all devices and sessions</p>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <Card className="dark:glow-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Social Links & Contacts
                  </CardTitle>
                  <CardDescription>Connect your social profiles and coding platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        value={profileData.contacts.github}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            contacts: { ...profileData.contacts, github: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Your GitHub username"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={profileData.contacts.linkedin}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            contacts: { ...profileData.contacts, linkedin: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Your LinkedIn profile"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leetcode" className="flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        LeetCode
                      </Label>
                      <Input
                        id="leetcode"
                        value={profileData.contacts.leetcode}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            contacts: { ...profileData.contacts, leetcode: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Your LeetCode username"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hackerrank" className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        HackerRank
                      </Label>
                      <Input
                        id="hackerrank"
                        value={profileData.contacts.hackerrank}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            contacts: { ...profileData.contacts, hackerrank: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Your HackerRank username"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="discord" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discord
                      </Label>
                      <Input
                        id="discord"
                        value={profileData.contacts.discord}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            contacts: { ...profileData.contacts, discord: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Your Discord username#1234"
                        className="h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
