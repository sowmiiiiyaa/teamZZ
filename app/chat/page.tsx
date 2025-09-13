"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
}

interface Chat {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  isGroup: boolean
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/student-sarah.jpg",
    lastMessage: "Hey! Are you free for the study session?",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    isGroup: false,
  },
  {
    id: "2",
    name: "CS Study Group",
    lastMessage: "Marcus: The assignment is due tomorrow",
    timestamp: "15 min ago",
    unreadCount: 5,
    isOnline: false,
    isGroup: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/student-emily.jpg",
    lastMessage: "Thanks for sharing the notes!",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    isGroup: false,
  },
]

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "sarah",
    senderName: "Sarah Chen",
    content: "Hey! Are you ready for tomorrow's presentation?",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: "2",
    senderId: "me",
    senderName: "You",
    content: "Yes! I've been working on the slides all morning",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: "3",
    senderId: "sarah",
    senderName: "Sarah Chen",
    content: "Great! Should we meet at the library to practice?",
    timestamp: "10:35 AM",
    type: "text",
  },
  {
    id: "4",
    senderId: "me",
    senderName: "You",
    content: "Perfect! See you at 2 PM in the study room",
    timestamp: "10:36 AM",
    type: "text",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-border bg-card">
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedChat?.id === chat.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && !chat.isGroup && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground">{chat.unreadCount}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedChat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-foreground">{selectedChat.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.isOnline ? "Online" : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === "me"
                              ? "bg-primary text-primary-foreground dark:glow-subtle"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="pr-10"
                      />
                      <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={sendMessage} className="gradient-purple dark:glow-subtle">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
