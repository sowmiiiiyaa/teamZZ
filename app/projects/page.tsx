"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Users, Calendar, MessageSquare, FileText, GitBranch } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  members: Array<{
    id: string
    name: string
    avatar?: string
    role: string
  }>
  status: "active" | "completed" | "pending"
  category: string
  messagesCount: number
  filesCount: number
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Machine Learning Research Project",
    description: "Developing a neural network model for image classification using TensorFlow",
    progress: 75,
    dueDate: "Dec 15, 2024",
    members: [
      { id: "1", name: "Sarah Chen", avatar: "/student-sarah.jpg", role: "Lead" },
      { id: "2", name: "Marcus Johnson", role: "Developer" },
      { id: "3", name: "Emily Rodriguez", avatar: "/student-emily.jpg", role: "Researcher" },
    ],
    status: "active",
    category: "Computer Science",
    messagesCount: 24,
    filesCount: 12,
  },
  {
    id: "2",
    title: "Sustainable Energy Analysis",
    description: "Analyzing renewable energy adoption patterns across different regions",
    progress: 45,
    dueDate: "Jan 20, 2025",
    members: [
      { id: "4", name: "David Kim", role: "Analyst" },
      { id: "5", name: "Lisa Wang", avatar: "/student-lisa.jpg", role: "Lead" },
    ],
    status: "active",
    category: "Environmental Science",
    messagesCount: 18,
    filesCount: 8,
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Creating a student productivity app with React Native",
    progress: 100,
    dueDate: "Nov 30, 2024",
    members: [
      { id: "6", name: "Alex Thompson", role: "Developer" },
      { id: "7", name: "Maya Patel", role: "Designer" },
    ],
    status: "completed",
    category: "Software Engineering",
    messagesCount: 45,
    filesCount: 25,
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [projects] = useState(mockProjects)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "completed":
        return "Completed"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const activeProjects = projects.filter((p) => p.status === "active")
  const completedProjects = projects.filter((p) => p.status === "completed")

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground">Collaborate on academic projects with your peers</p>
            </div>
            <Button className="gradient-purple dark:glow-subtle">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Active ({activeProjects.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Completed ({completedProjects.length})
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow dark:glow-subtle">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(project.status)} text-white`}>
                          {getStatusText(project.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Members */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Team ({project.members.length})
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.dueDate}
                          </span>
                        </div>
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 4).map((member) => (
                            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.members.length > 4 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">+{project.members.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {project.messagesCount} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {project.filesCount} files
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 gradient-purple dark:glow-subtle">
                          Open Project
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completedProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow opacity-75">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
                        </div>
                        <Badge className="bg-blue-500 text-white">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Completed on {project.dueDate}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.members.length} members
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        View Archive
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Templates</CardTitle>
                  <CardDescription>Start your project with pre-built templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Project templates coming soon</p>
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
