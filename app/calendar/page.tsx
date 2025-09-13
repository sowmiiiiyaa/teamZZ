"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Filter } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Computer Science Lecture",
    type: "class",
    date: "2024-10-15",
    time: "09:00",
    duration: "1.5h",
    location: "Room 201",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Mathematics Tutorial",
    type: "tutorial",
    date: "2024-10-15",
    time: "11:00",
    duration: "1h",
    location: "Room 105",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Project Deadline",
    type: "deadline",
    date: "2024-10-16",
    time: "23:59",
    duration: "",
    location: "Online Submission",
    color: "bg-red-500",
  },
  {
    id: 4,
    title: "Study Group",
    type: "study",
    date: "2024-10-17",
    time: "14:00",
    duration: "2h",
    location: "Library",
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Midterm Exam",
    type: "exam",
    date: "2024-10-18",
    time: "10:00",
    duration: "2h",
    location: "Exam Hall A",
    color: "bg-orange-500",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === "next" ? 1 : -1), 1))
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return SAMPLE_EVENTS.filter((event) => event.date === dateStr)
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1 border border-border/50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday = date.toDateString() === today.toDateString()
      const events = getEventsForDate(date)

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors ${
            isToday ? "bg-primary/10 border-primary/50" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                {event.title}
              </div>
            ))}
            {events.length > 2 && <div className="text-xs text-muted-foreground">+{events.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDays.push(date)
    }

    return (
      <div className="grid grid-cols-8 gap-px bg-border">
        <div className="bg-background p-4 font-medium">Time</div>
        {weekDays.map((date, index) => (
          <div key={index} className="bg-background p-4 text-center">
            <div className="font-medium">{DAYS[date.getDay()]}</div>
            <div
              className={`text-2xl ${
                date.toDateString() === today.toDateString() ? "text-primary font-bold" : "text-muted-foreground"
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}

        {/* Time slots */}
        {Array.from({ length: 12 }, (_, hour) => (
          <React.Fragment key={hour}>
            <div className="bg-background p-2 text-sm text-muted-foreground border-t border-border">{hour + 8}:00</div>
            {weekDays.map((date, dayIndex) => {
              const events = getEventsForDate(date).filter((event) => {
                const eventHour = Number.parseInt(event.time.split(":")[0])
                return eventHour === hour + 8
              })

              return (
                <div key={dayIndex} className="bg-background p-1 border-t border-border min-h-[60px]">
                  {events.map((event) => (
                    <div key={event.id} className={`text-xs p-2 rounded text-white mb-1 ${event.color}`}>
                      <div className="font-medium">{event.title}</div>
                      <div className="opacity-90">
                        {event.time} - {event.duration}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {MONTHS[currentMonth]} {currentYear}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                    Month
                  </Button>
                  <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                    Week
                  </Button>
                  <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                    Day
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === "month" && (
                <>
                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 gap-px bg-border mb-px">
                    {DAYS.map((day) => (
                      <div key={day} className="bg-muted p-3 text-center text-sm font-medium">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-px bg-border">{renderCalendarDays()}</div>
                </>
              )}

              {view === "week" && renderWeekView()}

              {view === "day" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {today.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div className="space-y-3">
                    {getEventsForDate(today).map((event) => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${event.color}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time} {event.duration && `(${event.duration})`}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-3 bg-transparent">
                Today
              </Button>
              <div className="text-sm">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                      {day[0]}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} className="h-6"></div>
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const date = new Date(currentYear, currentMonth, day)
                    const isToday = date.toDateString() === today.toDateString()
                    const hasEvents = getEventsForDate(date).length > 0

                    return (
                      <button
                        key={day}
                        className={`h-6 text-xs rounded hover:bg-muted transition-colors ${
                          isToday
                            ? "bg-primary text-primary-foreground font-bold"
                            : hasEvents
                              ? "bg-muted font-medium"
                              : ""
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SAMPLE_EVENTS.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{event.title}</h4>
                    <div className="text-xs text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { type: "Class", color: "bg-blue-500" },
                { type: "Tutorial", color: "bg-green-500" },
                { type: "Exam", color: "bg-orange-500" },
                { type: "Deadline", color: "bg-red-500" },
                { type: "Study Group", color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
