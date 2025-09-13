"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Plus, Filter, Search, Calendar, Clock, Flag, CheckCircle2, Circle, Trash2, Edit } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "completed"
  dueDate: string
  category: string
  estimatedTime: string
  tags: string[]
}

const SAMPLE_TASKS: Task[] = [
  {
    id: 1,
    title: "Complete Data Structures Assignment",
    description: "Implement binary search tree with insertion, deletion, and traversal methods",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-10-16",
    category: "Computer Science",
    estimatedTime: "4h",
    tags: ["assignment", "coding", "algorithms"],
  },
  {
    id: 2,
    title: "Review Calculus Chapter 5",
    description: "Study integration techniques and practice problems 1-20",
    priority: "medium",
    status: "todo",
    dueDate: "2024-10-18",
    category: "Mathematics",
    estimatedTime: "2h",
    tags: ["study", "math", "integration"],
  },
  {
    id: 3,
    title: "Prepare Literature Presentation",
    description: "Create slides for Shakespeare analysis presentation",
    priority: "high",
    status: "todo",
    dueDate: "2024-10-20",
    category: "English",
    estimatedTime: "3h",
    tags: ["presentation", "literature", "shakespeare"],
  },
  {
    id: 4,
    title: "Physics Lab Report",
    description: "Write report on pendulum motion experiment",
    priority: "low",
    status: "completed",
    dueDate: "2024-10-14",
    category: "Physics",
    estimatedTime: "2h",
    tags: ["lab", "report", "physics"],
  },
  {
    id: 5,
    title: "Study Group Meeting Prep",
    description: "Prepare questions and materials for weekly study group",
    priority: "medium",
    status: "todo",
    dueDate: "2024-10-17",
    category: "General",
    estimatedTime: "1h",
    tags: ["study-group", "preparation"],
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS)
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "completed">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    category: "",
    estimatedTime: "",
    tags: [],
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  }

  const completionRate = Math.round((taskStats.completed / taskStats.total) * 100)

  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "todo" : task.status === "todo" ? "in-progress" : "completed"
          return { ...task, status: newStatus }
        }
        return task
      }),
    )
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const addTask = () => {
    if (!newTask.title) return

    const task: Task = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      title: newTask.title || "",
      description: newTask.description || "",
      priority: (newTask.priority as "low" | "medium" | "high") || "medium",
      status: "todo",
      dueDate: newTask.dueDate || "",
      category: newTask.category || "",
      estimatedTime: newTask.estimatedTime || "",
      tags: newTask.tags || [],
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
      category: "",
      estimatedTime: "",
      tags: [],
    })
    setIsAddDialogOpen(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Manager</h1>
          <p className="text-muted-foreground">Organize and track your assignments and deadlines</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedTime">Estimated Time</Label>
                  <Input
                    id="estimatedTime"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
                    placeholder="e.g., 2h"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addTask}>Add Task</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-foreground">{taskStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Flag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{taskStats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">{taskStats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Circle className="h-6 w-6 text-accent" />
              </div>
            </div>
            <Progress value={completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-foreground ${task.status === "completed" ? "line-through opacity-60" : ""}`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <Badge variant="outline" className="capitalize">
                      {task.priority}
                    </Badge>
                  </div>
                  <Badge variant="secondary">{task.category}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {task.estimatedTime && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.estimatedTime}
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms" : "Create your first task to get started"}
          </p>
        </div>
      )}
    </div>
  )
}
