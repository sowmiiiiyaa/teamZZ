"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import {
  BookOpen,
  Clock,
  GraduationCap,
  ChevronRight,
  Trophy,
  Target,
  Users,
  TrendingUp,
  Bell,
  CalendarDays,
  MessageCircle,
  UserPlus,
} from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name || "Student"}!</h1>
          <p className="text-muted-foreground text-lg mt-1">Here's your productivity overview for today</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />3 Notifications
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 dark:glow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                <p className="text-2xl font-bold text-foreground">3.85</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.12 this semester
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 dark:glow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold text-foreground">12/18</p>
                <p className="text-xs text-muted-foreground mt-1">67% completion rate</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 dark:glow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Focus Time Today</p>
                <p className="text-2xl font-bold text-foreground">4.5h</p>
                <p className="text-xs text-muted-foreground mt-1">6 Pomodoro sessions</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 dark:glow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground mt-1">Next: Study Group</p>
              </div>
              <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Priority Tasks and Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Priority Tasks */}
          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Today's Priority Tasks
                </span>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Complete Data Structures Assignment",
                  course: "CS 201",
                  priority: "high",
                  due: "Due in 2 hours",
                },
                { title: "Review Calculus Notes", course: "MATH 151", priority: "medium", due: "Due tomorrow" },
                { title: "Prepare Literature Presentation", course: "ENG 102", priority: "high", due: "Due Friday" },
                { title: "Physics Lab Report", course: "PHYS 101", priority: "low", due: "Due next week" },
              ].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{task.due}</span>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"
                      }
                      className="ml-2 capitalize"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                  Event Tracker
                </span>
                <Button variant="ghost" size="sm" className="gradient-purple dark:glow-subtle">
                  Add Event
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Past Events</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Current Plans</p>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">5</p>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: "CS Study Group", time: "Today 3:00 PM", org: "Computer Science Club", type: "current" },
                  {
                    title: "Math Tutoring Session",
                    time: "Tomorrow 10:00 AM",
                    org: "Academic Support",
                    type: "upcoming",
                  },
                  {
                    title: "Project Presentation",
                    time: "Friday 2:00 PM",
                    org: "Software Engineering",
                    type: "upcoming",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.org}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">{event.time}</span>
                      <Badge variant={event.type === "current" ? "default" : "secondary"} className="ml-2 text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Social Features and Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Social Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Friends Online</p>
                    <p className="text-xs text-muted-foreground">8 of 24 friends</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Unread Messages</p>
                    <p className="text-xs text-muted-foreground">3 new messages</p>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Active Projects</p>
                    <p className="text-xs text-muted-foreground">2 collaborative</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Study Progress */}
          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { subject: "Computer Science", progress: 85, hours: "24h" },
                { subject: "Mathematics", progress: 92, hours: "18h" },
                { subject: "Physics", progress: 78, hours: "16h" },
                { subject: "English", progress: 88, hours: "12h" },
              ].map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground text-sm">{subject.subject}</h4>
                    <span className="text-xs text-muted-foreground">{subject.hours} this week</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{subject.progress}% Complete</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Perfect Week", description: "All tasks completed", date: "Today" },
                { title: "Focus Master", description: "8 hours focused study", date: "Yesterday" },
                { title: "Social Butterfly", description: "5 new connections", date: "This week" },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{achievement.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border dark:glow-subtle">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gradient-purple dark:glow-subtle">
                <Clock className="h-4 w-4 mr-2" />
                Start Focus Session
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Open Chat
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
