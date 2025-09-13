"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, RotateCcw, Settings, Clock, Target, TrendingUp } from "lucide-react"

interface FocusSession {
  id: number
  task: string
  duration: number
  completedAt: string
  type: "focus" | "break"
}

const POMODORO_PRESETS = {
  classic: { focus: 25, shortBreak: 5, longBreak: 15 },
  extended: { focus: 50, shortBreak: 10, longBreak: 30 },
  short: { focus: 15, shortBreak: 3, longBreak: 10 },
}

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionType, setSessionType] = useState<"focus" | "shortBreak" | "longBreak">("focus")
  const [currentTask, setCurrentTask] = useState("")
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [preset, setPreset] = useState<keyof typeof POMODORO_PRESETS>("classic")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [sessions, setSessions] = useState<FocusSession[]>([
    { id: 1, task: "Study Data Structures", duration: 25, completedAt: "2024-10-15T10:30:00", type: "focus" },
    { id: 2, task: "Break", duration: 5, completedAt: "2024-10-15T10:35:00", type: "break" },
    { id: 3, task: "Review Calculus", duration: 25, completedAt: "2024-10-15T11:00:00", type: "focus" },
    { id: 4, task: "Break", duration: 5, completedAt: "2024-10-15T11:05:00", type: "break" },
  ])

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, timeLeft])

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      handleSessionComplete()
    }
  }, [timeLeft, isActive])

  const handleSessionComplete = () => {
    setIsActive(false)
    setIsPaused(false)

    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }

    // Add completed session to history
    const newSession: FocusSession = {
      id: sessions.length + 1,
      task: currentTask || (sessionType === "focus" ? "Focus Session" : "Break"),
      duration:
        sessionType === "focus"
          ? POMODORO_PRESETS[preset].focus
          : sessionType === "shortBreak"
            ? POMODORO_PRESETS[preset].shortBreak
            : POMODORO_PRESETS[preset].longBreak,
      completedAt: new Date().toISOString(),
      type: sessionType === "focus" ? "focus" : "break",
    }
    setSessions((prev) => [newSession, ...prev])

    if (sessionType === "focus") {
      setSessionsCompleted((prev) => prev + 1)
      // Auto-start break
      const breakType = (sessionsCompleted + 1) % 4 === 0 ? "longBreak" : "shortBreak"
      setSessionType(breakType)
      setTimeLeft(POMODORO_PRESETS[preset][breakType] * 60)
    } else {
      // Auto-start focus session
      setSessionType("focus")
      setTimeLeft(POMODORO_PRESETS[preset].focus * 60)
    }
  }

  const toggleTimer = () => {
    if (isActive) {
      setIsPaused(!isPaused)
    } else {
      setIsActive(true)
      setIsPaused(false)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    const duration =
      sessionType === "focus"
        ? POMODORO_PRESETS[preset].focus
        : sessionType === "shortBreak"
          ? POMODORO_PRESETS[preset].shortBreak
          : POMODORO_PRESETS[preset].longBreak
    setTimeLeft(duration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getSessionTypeLabel = () => {
    switch (sessionType) {
      case "focus":
        return "Focus Time"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
    }
  }

  const progress = () => {
    const totalTime =
      sessionType === "focus"
        ? POMODORO_PRESETS[preset].focus * 60
        : sessionType === "shortBreak"
          ? POMODORO_PRESETS[preset].shortBreak * 60
          : POMODORO_PRESETS[preset].longBreak * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Focus Clock</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">Sessions: {sessionsCompleted}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">{getSessionTypeLabel()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-blue-600 mb-4">{formatTime(timeLeft)}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${progress()}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="task">Current Task</Label>
                  <Input
                    id="task"
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    disabled={isActive && !isPaused}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <Button onClick={toggleTimer} size="lg" className="px-8">
                    {isActive && !isPaused ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        {isPaused ? "Resume" : "Start"}
                      </>
                    )}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings & Stats */}
        <div className="space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Preset</Label>
                <Select value={preset} onValueChange={(value: keyof typeof POMODORO_PRESETS) => setPreset(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic (25/5/15)</SelectItem>
                    <SelectItem value="extended">Extended (50/10/30)</SelectItem>
                    <SelectItem value="short">Short (15/3/10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sound">Sound Notifications</Label>
                <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span>{POMODORO_PRESETS[preset].focus}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Short Break:</span>
                  <span>{POMODORO_PRESETS[preset].shortBreak}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Long Break:</span>
                  <span>{POMODORO_PRESETS[preset].longBreak}m</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Today's Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{sessionsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(
                      sessions.filter((s) => s.type === "focus").reduce((acc, s) => acc + s.duration, 0) / 60,
                    )}
                    h
                  </div>
                  <div className="text-sm text-muted-foreground">Focus Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Session History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sessions.slice(0, 10).map((session) => (
              <div key={session.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${session.type === "focus" ? "bg-blue-600" : "bg-green-600"}`}
                  />
                  <span className="font-medium">{session.task}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{session.duration}m</span>
                  <span>{new Date(session.completedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
