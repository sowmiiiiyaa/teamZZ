"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { BookOpen, Users, Calendar } from "lucide-react"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      name: "Computer Science 201",
      code: "CS 201",
      instructor: "Dr. Sarah Johnson",
      progress: 85,
      grade: "A-",
      credits: 3,
      schedule: "MWF 10:00-11:00 AM",
      students: 45,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Mathematics 151",
      code: "MATH 151",
      instructor: "Prof. Michael Chen",
      progress: 92,
      grade: "A",
      credits: 4,
      schedule: "TTh 2:00-3:30 PM",
      students: 38,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "English Literature 102",
      code: "ENG 102",
      instructor: "Dr. Emily Rodriguez",
      progress: 78,
      grade: "B+",
      credits: 3,
      schedule: "MWF 1:00-2:00 PM",
      students: 32,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Physics 201",
      code: "PHYS 201",
      instructor: "Dr. James Wilson",
      progress: 88,
      grade: "A-",
      credits: 4,
      schedule: "TTh 10:00-11:30 AM",
      students: 28,
      color: "bg-orange-500",
    },
    {
      id: 5,
      name: "History 150",
      code: "HIST 150",
      instructor: "Prof. Lisa Thompson",
      progress: 95,
      grade: "A",
      credits: 3,
      schedule: "MWF 9:00-10:00 AM",
      students: 42,
      color: "bg-red-500",
    },
    {
      id: 6,
      name: "Chemistry 101",
      code: "CHEM 101",
      instructor: "Dr. Robert Davis",
      progress: 72,
      grade: "B",
      credits: 4,
      schedule: "TTh 3:00-4:30 PM",
      students: 35,
      color: "bg-teal-500",
    },
  ]

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
            <p className="text-muted-foreground text-lg">Manage your enrolled courses and track your progress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-card border-border hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                        <span className="text-sm font-medium text-muted-foreground">{course.code}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {course.grade}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.credits} Credits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.students} Students</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.schedule}</span>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-transparent" variant="outline">
                      View Course Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Course Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">6</div>
                    <div className="text-sm text-muted-foreground">Total Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">21</div>
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">3.85</div>
                    <div className="text-sm text-muted-foreground">Current GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">85%</div>
                    <div className="text-sm text-muted-foreground">Avg Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
