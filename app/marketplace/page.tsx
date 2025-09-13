"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  Download,
  Upload,
  BookOpen,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  Code,
  Heart,
  Share2,
} from "lucide-react"

interface Resource {
  id: number
  title: string
  description: string
  type: "notes" | "video" | "audio" | "image" | "code" | "document"
  subject: string
  author: string
  rating: number
  downloads: number
  price: number
  tags: string[]
  thumbnail: string
  uploadedAt: string
  isFavorite: boolean
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: "Advanced Calculus Study Guide",
    description: "Comprehensive notes covering derivatives, integrals, and applications with solved examples.",
    type: "notes",
    subject: "Mathematics",
    author: "Sarah Chen",
    rating: 4.8,
    downloads: 1250,
    price: 0,
    tags: ["calculus", "derivatives", "integrals", "math"],
    thumbnail: "/calculus-study-guide.jpg",
    uploadedAt: "2024-10-10",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Data Structures Visualization",
    description: "Interactive video series explaining trees, graphs, and algorithms with animations.",
    type: "video",
    subject: "Computer Science",
    author: "Alex Rodriguez",
    rating: 4.9,
    downloads: 890,
    price: 15,
    tags: ["data-structures", "algorithms", "programming", "visualization"],
    thumbnail: "/data-structures-visualization.png",
    uploadedAt: "2024-10-08",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Organic Chemistry Reactions",
    description: "Audio lectures covering major organic reactions with mechanisms and examples.",
    type: "audio",
    subject: "Chemistry",
    author: "Dr. Maria Lopez",
    rating: 4.6,
    downloads: 567,
    price: 8,
    tags: ["organic-chemistry", "reactions", "mechanisms", "chemistry"],
    thumbnail: "/organic-chemistry-reactions.jpg",
    uploadedAt: "2024-10-05",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Python Programming Cheat Sheet",
    description: "Quick reference guide for Python syntax, functions, and common libraries.",
    type: "document",
    subject: "Programming",
    author: "John Smith",
    rating: 4.7,
    downloads: 2100,
    price: 0,
    tags: ["python", "programming", "cheat-sheet", "reference"],
    thumbnail: "/placeholder-kzw3v.png",
    uploadedAt: "2024-10-12",
    isFavorite: true,
  },
  {
    id: 5,
    title: "Physics Formula Collection",
    description: "Complete collection of physics formulas with derivations and applications.",
    type: "notes",
    subject: "Physics",
    author: "Emma Wilson",
    rating: 4.5,
    downloads: 780,
    price: 5,
    tags: ["physics", "formulas", "mechanics", "thermodynamics"],
    thumbnail: "/placeholder-u2a4p.png",
    uploadedAt: "2024-10-07",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Web Development Bootcamp",
    description: "Complete web development course covering HTML, CSS, JavaScript, and React.",
    type: "video",
    subject: "Web Development",
    author: "Tech Academy",
    rating: 4.9,
    downloads: 1500,
    price: 25,
    tags: ["web-development", "html", "css", "javascript", "react"],
    thumbnail: "/web-development-bootcamp.png",
    uploadedAt: "2024-10-01",
    isFavorite: false,
  },
]

const subjects = ["All", "Mathematics", "Computer Science", "Chemistry", "Physics", "Programming", "Web Development"]
const resourceTypes = ["All", "notes", "video", "audio", "document", "image", "code"]

export default function MarketplacePage() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [activeTab, setActiveTab] = useState("browse")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "notes":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "document":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject
    const matchesType = selectedType === "All" || resource.type === selectedType

    return matchesSearch && matchesSubject && matchesType
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  const toggleFavorite = (id: number) => {
    setResources((prev) =>
      prev.map((resource) => (resource.id === id ? { ...resource, isFavorite: !resource.isFavorite } : resource)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resource Marketplace</h1>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          <TabsTrigger value="uploads">My Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low</SelectItem>
                      <SelectItem value="price-high">Price: High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(resource.id)}
                  >
                    <Heart className={`h-4 w-4 ${resource.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-white/90 text-black">
                    {getTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <div className="text-right">
                      {resource.price === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        <span className="font-bold text-green-600">${resource.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>by {resource.author}</span>
                    <Badge variant="outline">{resource.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      {resource.price === 0 ? "Download" : "Purchase"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedResources.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.isFavorite)
              .map((resource) => (
                <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-black">
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>by {resource.author}</span>
                      <Badge variant="outline">{resource.subject}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      {resource.price === 0 ? "Download" : "Purchase"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          {resources.filter((r) => r.isFavorite).length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground">Start browsing and add resources to your favorites!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="uploads" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Share your knowledge</h3>
              <p className="text-muted-foreground mb-4">Upload your study materials and help other students succeed.</p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Resource
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
