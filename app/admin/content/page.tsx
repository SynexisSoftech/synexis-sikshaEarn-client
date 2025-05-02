"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  FileEdit,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  FileText,
  ImageIcon,
  Video,
  File,
  LinkIcon,
  Upload,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContentPage() {
  const { toast } = useToast()
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [isEditContentOpen, setIsEditContentOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedContent, setSelectedContent] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample content data
  const contentItems = [
    {
      id: 1,
      title: "Introduction to Digital Marketing",
      type: "blog",
      status: "published",
      author: "Rajesh Sharma",
      createdAt: "2023-05-15",
      updatedAt: "2023-05-20",
      views: 1245,
      featured: true,
      excerpt: "Learn the fundamentals of digital marketing in this comprehensive guide.",
      tags: ["marketing", "digital", "beginner"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "SEO Best Practices for 2023",
      type: "blog",
      status: "published",
      author: "Priya Patel",
      createdAt: "2023-06-10",
      updatedAt: "2023-06-15",
      views: 982,
      featured: true,
      excerpt: "Stay ahead of the competition with these SEO best practices for 2023.",
      tags: ["seo", "marketing", "strategy"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Social Media Marketing Strategies",
      type: "blog",
      status: "published",
      author: "Anish KC",
      createdAt: "2023-07-05",
      updatedAt: "2023-07-10",
      views: 756,
      featured: false,
      excerpt: "Effective social media marketing strategies to grow your audience.",
      tags: ["social media", "marketing", "strategy"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Content Marketing Workshop",
      type: "video",
      status: "published",
      author: "Sita Gurung",
      createdAt: "2023-08-12",
      updatedAt: "2023-08-15",
      views: 543,
      featured: false,
      excerpt: "A comprehensive workshop on content marketing strategies.",
      tags: ["content", "marketing", "workshop"],
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "45:30",
    },
    {
      id: 5,
      title: "Google Ads Campaign Setup Guide",
      type: "tutorial",
      status: "published",
      author: "Rohan Thapa",
      createdAt: "2023-09-08",
      updatedAt: "2023-09-12",
      views: 678,
      featured: true,
      excerpt: "Step-by-step guide to setting up effective Google Ads campaigns.",
      tags: ["google ads", "ppc", "tutorial"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Email Marketing Templates",
      type: "resource",
      status: "published",
      author: "Nisha Rai",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-10",
      views: 432,
      featured: false,
      excerpt: "Download these email marketing templates for your campaigns.",
      tags: ["email", "marketing", "templates"],
      thumbnail: "/placeholder.svg?height=200&width=300",
      downloads: 215,
    },
    {
      id: 7,
      title: "WordPress Development Basics",
      type: "blog",
      status: "draft",
      author: "Sunil Magar",
      createdAt: "2023-11-02",
      updatedAt: "2023-11-05",
      views: 0,
      featured: false,
      excerpt: "Learn the basics of WordPress development in this guide.",
      tags: ["wordpress", "development", "web"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Graphic Design Principles",
      type: "video",
      status: "published",
      author: "Meera Tamang",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-05",
      views: 321,
      featured: false,
      excerpt: "Understanding the fundamental principles of graphic design.",
      tags: ["design", "graphic", "principles"],
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "32:15",
    },
    {
      id: 9,
      title: "Data Analytics Tools Comparison",
      type: "blog",
      status: "scheduled",
      author: "Aarav Sharma",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15",
      views: 0,
      featured: false,
      excerpt: "A comparison of popular data analytics tools for businesses.",
      tags: ["analytics", "data", "tools"],
      thumbnail: "/placeholder.svg?height=200&width=300",
      scheduledFor: "2024-02-01",
    },
  ]

  // Filter content based on search query and filters
  const filteredContent = contentItems.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || content.type === typeFilter
    const matchesStatus = statusFilter === "all" || content.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage)
  const paginatedContent = filteredContent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddContent = (data) => {
    setIsAddContentOpen(false)
    toast({
      title: "Content Added",
      description: "The content has been successfully added.",
    })
  }

  const handleEditContent = (content) => {
    setSelectedContent(content)
    setIsEditContentOpen(true)
  }

  const handleUpdateContent = (data) => {
    setIsEditContentOpen(false)
    toast({
      title: "Content Updated",
      description: "The content has been successfully updated.",
    })
  }

  const handleDeleteContent = (contentId) => {
    toast({
      title: "Content Deleted",
      description: "The content has been successfully deleted.",
    })
  }

  const getContentTypeIcon = (type) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "tutorial":
        return <FileEdit className="h-4 w-4" />
      case "resource":
        return <File className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-teal-500 hover:bg-teal-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Published
          </Badge>
        )
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300"
          >
            <FileEdit className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        )
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
          >
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Content</h2>
          <p className="text-muted-foreground">Manage your blog posts, videos, and other content</p>
        </div>
        <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Content</DialogTitle>
              <DialogDescription>
                Create new content for your platform. Fill in all the required fields.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Publishing</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter content title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" placeholder="Enter a short description" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Content Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="resource">Resource</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select author" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rajesh">Rajesh Sharma</SelectItem>
                          <SelectItem value="priya">Priya Patel</SelectItem>
                          <SelectItem value="anish">Anish KC</SelectItem>
                          <SelectItem value="sita">Sita Gurung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="marketing, digital, beginner" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail Image</Label>
                    <div className="flex items-center gap-4">
                      <Input id="thumbnail" type="file" />
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Write your content here..." rows={12} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                    <Button variant="outline" size="sm">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Add Link
                    </Button>
                    <Button variant="outline" size="sm">
                      <File className="mr-2 h-4 w-4" />
                      Add File
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input id="seo-title" placeholder="Enter SEO title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">SEO Description</Label>
                    <Textarea id="seo-description" placeholder="Enter SEO description" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input id="slug" placeholder="enter-url-slug" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Publishing Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Schedule Date</Label>
                      <Input id="schedule-date" type="datetime-local" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured">Featured Content</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsAddContentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContent}>Create Content</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Content Dialog */}
        <Dialog open={isEditContentOpen} onOpenChange={setIsEditContentOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
              <DialogDescription>Update the content information. Click save when you're done.</DialogDescription>
            </DialogHeader>
            {selectedContent && (
              <Tabs defaultValue="basic" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Publishing</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title</Label>
                      <Input id="edit-title" defaultValue={selectedContent.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-excerpt">Excerpt</Label>
                      <Textarea id="edit-excerpt" defaultValue={selectedContent.excerpt} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-type">Content Type</Label>
                        <Select defaultValue={selectedContent.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                            <SelectItem value="resource">Resource</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-author">Author</Label>
                        <Select defaultValue={selectedContent.author.split(" ")[0].toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rajesh">Rajesh Sharma</SelectItem>
                            <SelectItem value="priya">Priya Patel</SelectItem>
                            <SelectItem value="anish">Anish KC</SelectItem>
                            <SelectItem value="sita">Sita Gurung</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                      <Input id="edit-tags" defaultValue={selectedContent.tags.join(", ")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-thumbnail">Thumbnail Image</Label>
                      <div className="flex flex-col gap-4">
                        <img
                          src={selectedContent.thumbnail || "/placeholder.svg"}
                          alt="Thumbnail"
                          className="w-40 h-24 object-cover rounded-md border"
                        />
                        <div className="flex items-center gap-4">
                          <Input id="edit-thumbnail" type="file" />
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-content">Content</Label>
                      <Textarea id="edit-content" placeholder="Write your content here..." rows={12} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Add Video
                      </Button>
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                      <Button variant="outline" size="sm">
                        <File className="mr-2 h-4 w-4" />
                        Add File
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="seo" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-seo-title">SEO Title</Label>
                      <Input id="edit-seo-title" defaultValue={selectedContent.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-seo-description">SEO Description</Label>
                      <Textarea id="edit-seo-description" defaultValue={selectedContent.excerpt} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-slug">URL Slug</Label>
                      <Input id="edit-slug" defaultValue={selectedContent.title.toLowerCase().replace(/\s+/g, "-")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Publishing Status</Label>
                        <Select defaultValue={selectedContent.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-schedule-date">Schedule Date</Label>
                        <Input
                          id="edit-schedule-date"
                          type="datetime-local"
                          defaultValue={selectedContent.scheduledFor}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-featured" defaultChecked={selectedContent.featured} />
                      <Label htmlFor="edit-featured">Featured Content</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditContentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateContent}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search content..."
            className="w-full pl-8 bg-white dark:bg-slate-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="blog">Blog Posts</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="tutorial">Tutorials</SelectItem>
              <SelectItem value="resource">Resources</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContent.length > 0 ? (
                paginatedContent.map((content) => (
                  <TableRow key={content.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden">
                          <img
                            src={content.thumbnail || "/placeholder.svg"}
                            alt={content.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {content.title}
                            {content.featured && (
                              <Badge
                                variant="secondary"
                                className="h-5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{content.excerpt}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getContentTypeIcon(content.type)}
                        <span className="capitalize">{content.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{content.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-500" />
                        {new Date(content.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(content.status)}</TableCell>
                    <TableCell>
                      <div className="font-medium">{content.views.toLocaleString()}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => (window.location.href = `/admin/content/${content.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditContent(content)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the content and remove it
                                  from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteContent(content.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No content found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredContent.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredContent.length)} of {filteredContent.length} items
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-teal-500 hover:bg-teal-600" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
