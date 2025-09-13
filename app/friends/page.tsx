"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MessageCircle, Users, UserCheck, Clock } from "lucide-react"

interface Friend {
  id: string
  name: string
  email: string
  avatar?: string
  status: "online" | "offline" | "away"
  mutualFriends: number
  lastSeen?: string
}

const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@student.edu",
    avatar: "/student-sarah.jpg",
    status: "online",
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@student.edu",
    status: "away",
    mutualFriends: 3,
    lastSeen: "2 hours ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@student.edu",
    avatar: "/student-emily.jpg",
    status: "offline",
    mutualFriends: 8,
    lastSeen: "Yesterday",
  },
]

const mockSuggestions: Friend[] = [
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@student.edu",
    status: "online",
    mutualFriends: 2,
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@student.edu",
    avatar: "/student-lisa.jpg",
    status: "offline",
    mutualFriends: 4,
    lastSeen: "3 days ago",
  },
]

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState(mockFriends)
  const [suggestions, setSuggestions] = useState(mockSuggestions)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const addFriend = (friendId: string) => {
    const friend = suggestions.find((s) => s.id === friendId)
    if (friend) {
      setFriends([...friends, friend])
      setSuggestions(suggestions.filter((s) => s.id !== friendId))
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Friends</h1>
              <p className="text-muted-foreground">Connect and collaborate with fellow students</p>
            </div>
            <Button className="gradient-purple dark:glow-subtle">
              <UserPlus className="h-4 w-4 mr-2" />
              Find Friends
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Suggestions ({suggestions.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Requests (2)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {friends.map((friend) => (
                  <Card key={friend.id} className="hover:shadow-lg transition-shadow dark:glow-subtle">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{friend.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {friend.mutualFriends} mutual
                            </Badge>
                            {friend.status === "offline" && friend.lastSeen && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {friend.lastSeen}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={suggestion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {suggestion.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{suggestion.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{suggestion.email}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {suggestion.mutualFriends} mutual friends
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => addFriend(suggestion.id)}
                        className="w-full mt-4 gradient-purple dark:glow-subtle"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Friend
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Friend Requests</CardTitle>
                  <CardDescription>People who want to connect with you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending friend requests</p>
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
