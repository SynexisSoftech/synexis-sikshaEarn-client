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
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle2,
  XCircle,
  Filter,
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
import { Checkbox } from "@/components/ui/checkbox"
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

export default function CoursesPage() {
  const { toast } = useToast()
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      category: "Marketing",
      price: "Rs. 12,500",
      students: 248,
      rating: 4.9,
      status: "active",
      instructor: "Rajesh Sharma",
      duration: "8 weeks",
      lastUpdated: "2023-05-15",
      description: "A comprehensive introduction to digital marketing strategies and tools.",
      featured: true,
    },
    {
      id: 2,
      title: "SEO Masterclass",
      category: "Marketing",
      price: "Rs. 9,800",
      students: 186,
      rating: 4.8,
      status: "active",
      instructor: "Priya Patel",
      duration: "6 weeks",
      lastUpdated: "2023-06-22",
      description: "Learn advanced SEO techniques to rank higher in search engines.",
      featured: true,
    },
    {
      id: 3,
      title: "Social Media Strategy",
      category: "Marketing",
      price: "Rs. 15,000",
      students: 172,
      rating: 4.7,
      status: "active",
      instructor: "Anish KC",
      duration: "10 weeks",
      lastUpdated: "2023-04-10",
      description: "Master social media marketing across all major platforms.",
      featured: false,
    },
    {
      id: 4,
      title: "Content Marketing",
      category: "Marketing",
      price: "Rs. 8,500",
      students: 154,
      rating: 4.6,
      status: "active",
      instructor: "Sita Gurung",
      duration: "5 weeks",
      lastUpdated: "2023-07-05",
      description: "Create compelling content that drives engagement and conversions.",
      featured: false,
    },
    {
      id: 5,
      title: "Google Ads Advanced",
      category: "Marketing",
      price: "Rs. 18,200",
      students: 132,
      rating: 4.8,
      status: "active",
      instructor: "Rohan Thapa",
      duration: "12 weeks",
      lastUpdated: "2023-03-18",
      description: "Advanced techniques for Google Ads campaigns and optimization.",
      featured: true,
    },
    {
      id: 6,
      title: "Email Marketing Automation",
      category: "Marketing",
      price: "Rs. 11,000",
      students: 98,
      rating: 4.5,
      status: "draft",
      instructor: "Nisha Rai",
      duration: "7 weeks",
      lastUpdated: "2023-08-30",
      description: "Build automated email marketing campaigns that convert.",
      featured: false,
    },
    {
      id: 7,
      title: "WordPress Development",
      category: "Development",
      price: "Rs. 14,500",
      students: 112,
      rating: 4.6,
      status: "active",
      instructor: "Sunil Magar",
      duration: "9 weeks",
      lastUpdated: "2023-02-12",
      description: "Learn to build professional websites with WordPress.",
      featured: false,
    },
    {
      id: 8,
      title: "Graphic Design Essentials",
      category: "Design",
      price: "Rs. 10,800",
      students: 89,
      rating: 4.4,
      status: "active",
      instructor: "Meera Tamang",
      duration: "6 weeks",
      lastUpdated: "2023-05-25",
      description: "Master the fundamentals of graphic design for print and digital media.",
      featured: false,
    },
    {
      id: 9,
      title: "Data Analytics Basics",
      category: "Analytics",
      price: "Rs. 16,200",
      students: 76,
      rating: 4.7,
      status: "draft",
      instructor: "Aarav Sharma",
      duration: "11 weeks",
      lastUpdated: "2023-09-15",
      description: "Introduction to data analysis techniques and tools.",
      featured: false,
    },
  ]

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const coursesPerPage = 5
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)

  const handleAddCourse = (data) => {
    setIsAddCourseOpen(false)
    toast({
      title: "Course Added",
      description: "The course has been successfully added.",
    })
  }

  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    setIsEditCourseOpen(true)
  }

  const handleUpdateCourse = (data) => {
    setIsEditCourseOpen(false)
    toast({
      title: "Course Updated",
      description: "The course has been successfully updated.",
    })
  }

  const handleDeleteCourse = (courseId) => {
    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-3 pt-6 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Courses</h2>
          <p className="text-sm text-muted-foreground">Manage your courses and their content</p>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course for your platform. Fill in all the required fields.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" placeholder="Enter course title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter course description" rows={4} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select instructor" />
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
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (weeks)</Label>
                      <Input id="duration" type="number" placeholder="Enter duration" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Course Thumbnail</Label>
                    <Input id="thumbnail" type="file" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured">Featured Course</Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (Rs.)</Label>
                      <Input id="price" type="number" placeholder="Enter price" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discounted-price">Discounted Price (Rs.)</Label>
                      <Input id="discounted-price" type="number" placeholder="Enter discounted price" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-expiry">Discount Valid Until</Label>
                    <Input id="discount-expiry" type="date" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="subscription" />
                    <Label htmlFor="subscription">Offer Subscription Option</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>Create Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>Update the course information. Click save when you're done.</DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <Tabs defaultValue="basic" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Course Title</Label>
                      <Input id="edit-title" defaultValue={selectedCourse.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea id="edit-description" defaultValue={selectedCourse.description} rows={4} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Select defaultValue={selectedCourse.category.toLowerCase()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-instructor">Instructor</Label>
                        <Select defaultValue={selectedCourse.instructor.split(" ")[0].toLowerCase()}>
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
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-duration">Duration (weeks)</Label>
                        <Input id="edit-duration" type="number" defaultValue={selectedCourse.duration.split(" ")[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select defaultValue={selectedCourse.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-thumbnail">Course Thumbnail</Label>
                      <Input id="edit-thumbnail" type="file" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-featured" defaultChecked={selectedCourse.featured} />
                      <Label htmlFor="edit-featured">Featured Course</Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pricing" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Price (Rs.)</Label>
                        <Input id="edit-price" type="number" defaultValue={selectedCourse.price.replace("Rs. ", "")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-discounted-price">Discounted Price (Rs.)</Label>
                        <Input id="edit-discounted-price" type="number" placeholder="Enter discounted price" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-discount-expiry">Discount Valid Until</Label>
                      <Input id="edit-discount-expiry" type="date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="edit-subscription" />
                      <Label htmlFor="edit-subscription">Offer Subscription Option</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditCourseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCourse}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8 bg-white dark:bg-slate-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          {/* Mobile filters - shown when filter button is clicked */}
          <div className={`flex flex-col sm:hidden gap-2 ${isFilterOpen ? "block" : "hidden"}`}>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop filters - always visible on larger screens */}
          <div className="hidden sm:flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Course Cards View */}
      <div className="sm:hidden space-y-4">
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => (
            <Card key={course.id} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {course.featured && (
                          <Badge
                            variant="secondary"
                            className="h-5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          >
                            Featured
                          </Badge>
                        )}
                        <h3 className="font-medium text-base">{course.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{course.category}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => (window.location.href = `/admin/courses/${course.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => (window.location.href = `/admin/courses/${course.id}/content`)}
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Manage Content</span>
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
                                This action cannot be undone. This will permanently delete the course and remove all
                                associated data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCourse(course.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Price</span>
                      <span>{course.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Students</span>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-slate-500" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <Badge
                        variant={course.status === "active" ? "default" : "outline"}
                        className={
                          course.status === "active"
                            ? "bg-teal-500 hover:bg-teal-600 w-fit"
                            : course.status === "draft"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 w-fit"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 w-fit"
                        }
                      >
                        <span className="flex items-center gap-1">
                          {course.status === "active" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : course.status === "draft" ? (
                            <FileEdit className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {course.status}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-none shadow-md">
            <CardContent className="p-4 text-center py-8">
              <p className="text-muted-foreground">No courses found. Try adjusting your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.length > 0 ? (
                  paginatedCourses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {course.featured && (
                            <Badge
                              variant="secondary"
                              className="h-5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            >
                              Featured
                            </Badge>
                          )}
                          {course.title}
                        </div>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{course.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-slate-500" />
                          {course.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                          {course.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={course.status === "active" ? "default" : "outline"}
                          className={
                            course.status === "active"
                              ? "bg-teal-500 hover:bg-teal-600"
                              : course.status === "draft"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300"
                                : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                          }
                        >
                          <span className="flex items-center gap-1">
                            {course.status === "active" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : course.status === "draft" ? (
                              <FileEdit className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            {course.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-slate-500" />
                          {new Date(course.lastUpdated).toLocaleDateString()}
                        </div>
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
                            <DropdownMenuItem onClick={() => (window.location.href = `/admin/courses/${course.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => (window.location.href = `/admin/courses/${course.id}/content`)}
                            >
                              <FileEdit className="mr-2 h-4 w-4" />
                              <span>Manage Content</span>
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
                                    This action cannot be undone. This will permanently delete the course and remove all
                                    associated data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteCourse(course.id)}
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
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No courses found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Pagination */}
      {filteredCourses.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Showing {(currentPage - 1) * coursesPerPage + 1} to{" "}
            {Math.min(currentPage * coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageToShow = i + 1
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageToShow = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i
                  } else {
                    pageToShow = currentPage - 2 + i
                  }
                }

                return (
                  <Button
                    key={pageToShow}
                    variant={currentPage === pageToShow ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`h-8 w-8 ${currentPage === pageToShow ? "bg-teal-500 hover:bg-teal-600" : ""}`}
                  >
                    {pageToShow}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
