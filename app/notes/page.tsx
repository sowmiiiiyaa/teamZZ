"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  FileText,
  Upload,
  Download,
  Star,
  Eye,
  Edit,
  Trash2,
  FolderOpen,
  BookOpen,
  Video,
  ImageIcon,
} from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
  subject: string
  type: "note" | "document" | "video" | "image"
  tags: string[]
  createdAt: string
  updatedAt: string
  isFavorite: boolean
  fileSize?: string
  fileUrl?: string
}

interface Folder {
  id: number
  name: string
  subject: string
  noteCount: number
  color: string
}

const SAMPLE_NOTES: Note[] = [
  {
    id: 1,
    title: "Data Structures - Binary Trees",
    content: "Binary trees are hierarchical data structures where each node has at most two children...",
    subject: "Computer Science",
    type: "note",
    tags: ["algorithms", "trees", "data-structures"],
    createdAt: "2024-10-10",
    updatedAt: "2024-10-12",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Calculus Integration Formulas",
    content: "∫ x^n dx = (x^(n+1))/(n+1) + C\n∫ e^x dx = e^x + C\n∫ sin(x) dx = -cos(x) + C...",
    subject: "Mathematics",
    type: "note",
    tags: ["calculus", "integration", "formulas"],
    createdAt: "2024-10-08",
    updatedAt: "2024-10-10",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Shakespeare Hamlet Analysis",
    content: "Hamlet's soliloquy 'To be or not to be' represents the central theme of existential crisis...",
    subject: "English Literature",
    type: "document",
    tags: ["shakespeare", "hamlet", "analysis"],
    createdAt: "2024-10-05",
    updatedAt: "2024-10-07",
    isFavorite: true,
    fileSize: "2.4 MB",
    fileUrl: "/documents/hamlet-analysis.pdf",
  },
  {
    id: 4,
    title: "Physics Lab - Pendulum Motion",
    content: "Video recording of pendulum experiment showing simple harmonic motion principles...",
    subject: "Physics",
    type: "video",
    tags: ["lab", "pendulum", "motion"],
    createdAt: "2024-10-03",
    updatedAt: "2024-10-03",
    isFavorite: false,
    fileSize: "45.2 MB",
    fileUrl: "/videos/pendulum-lab.mp4",
  },
  {
    id: 5,
    title: "Chemistry Periodic Table",
    content: "High-resolution periodic table with electron configurations and atomic properties...",
    subject: "Chemistry",
    type: "image",
    tags: ["periodic-table", "elements", "reference"],
    createdAt: "2024-09-28",
    updatedAt: "2024-09-28",
    isFavorite: true,
    fileSize: "1.8 MB",
    fileUrl: "/images/periodic-table.png",
  },
]

const SAMPLE_FOLDERS: Folder[] = [
  { id: 1, name: "Computer Science", subject: "CS", noteCount: 15, color: "bg-blue-500" },
  { id: 2, name: "Mathematics", subject: "MATH", noteCount: 12, color: "bg-green-500" },
  { id: 3, name: "Physics", subject: "PHYS", noteCount: 8, color: "bg-purple-500" },
  { id: 4, name: "English Literature", subject: "ENG", noteCount: 6, color: "bg-orange-500" },
  { id: 5, name: "Chemistry", subject: "CHEM", noteCount: 10, color: "bg-red-500" },
]

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES)
  const [folders] = useState<Folder[]>(SAMPLE_FOLDERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    content: "",
    subject: "",
    type: "note",
    tags: [],
  })

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject
    const matchesType = selectedType === "all" || note.type === selectedType
    return matchesSearch && matchesSubject && matchesType
  })

  const toggleFavorite = (noteId: number) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note)))
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const addNote = () => {
    if (!newNote.title || !newNote.content) return

    const note: Note = {
      id: Math.max(...notes.map((n) => n.id)) + 1,
      title: newNote.title || "",
      content: newNote.content || "",
      subject: newNote.subject || "",
      type: (newNote.type as "note" | "document" | "video" | "image") || "note",
      tags: newNote.tags || [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      isFavorite: false,
    }

    setNotes([note, ...notes])
    setNewNote({ title: "", content: "", subject: "", type: "note", tags: [] })
    setIsAddNoteOpen(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-500"
      case "video":
        return "bg-red-500"
      case "image":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes & Resources</h1>
          <p className="text-muted-foreground">Organize and access your study materials</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Enter note title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={newNote.subject}
                      onValueChange={(value) => setNewNote({ ...newNote, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="English Literature">English Literature</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Enter your notes here..."
                    rows={8}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newNote.tags?.join(", ")}
                    onChange={(e) =>
                      setNewNote({ ...newNote, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                    }
                    placeholder="e.g., algorithms, data-structures, important"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addNote}>Create Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="notes">All Notes</TabsTrigger>
          <TabsTrigger value="folders">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="English Literature">English Literature</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="note">Notes</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>

          {/* Notes Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredNotes.map((note) => (
              <Card key={note.id} className="bg-card border-border hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${getTypeColor(note.type)}`}
                      >
                        {getTypeIcon(note.type)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base line-clamp-1">{note.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{note.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => toggleFavorite(note.id)}>
                        <Star
                          className={`h-4 w-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>

                  {note.fileSize && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Size: {note.fileSize}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Create your first note to get started"}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="folders" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                className="bg-card border-border hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${folder.color}`}>
                      <FolderOpen className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {folder.noteCount} {folder.noteCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
