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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  BookOpen,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Edit,
  Trash,
  Eye,
  Clock,
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
import { Progress } from "@/components/ui/progress"

export default function StudentsPage() {
  const { toast } = useToast()
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")

  // Sample students data
  const students = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      enrolledCourses: [
        { id: 1, name: "Digital Marketing Fundamentals", progress: 85 },
        { id: 5, name: "Google Ads Advanced", progress: 42 },
        { id: 9, name: "Data Analytics Basics", progress: 10 },
      ],
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      status: "active",
      phone: "+977-9801234567",
      address: "Kathmandu, Nepal",
      totalSpent: "Rs. 46,900",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      enrolledCourses: [
        { id: 2, name: "SEO Masterclass", progress: 92 },
        { id: 3, name: "Social Media Strategy", progress: 78 },
      ],
      joinDate: "2023-02-22",
      lastActive: "5 hours ago",
      status: "active",
      phone: "+977-9802345678",
      address: "Pokhara, Nepal",
      totalSpent: "Rs. 24,800",
    },
    {
      id: 3,
      name: "Rohan Thapa",
      email: "rohan.thapa@example.com",
      enrolledCourses: [
        { id: 1, name: "Digital Marketing Fundamentals", progress: 100 },
        { id: 3, name: "Social Media Strategy", progress: 65 },
        { id: 5, name: "Google Ads Advanced", progress: 88 },
        { id: 6, name: "Email Marketing Automation", progress: 30 },
      ],
      joinDate: "2023-03-10",
      lastActive: "1 day ago",
      status: "active",
      phone: "+977-9803456789",
      address: "Lalitpur, Nepal",
      totalSpent: "Rs. 56,700",
    },
    {
      id: 4,
      name: "Sita Gurung",
      email: "sita.gurung@example.com",
      enrolledCourses: [{ id: 4, name: "Content Marketing", progress: 45 }],
      joinDate: "2023-04-05",
      lastActive: "3 days ago",
      status: "inactive",
      phone: "+977-9804567890",
      address: "Bhaktapur, Nepal",
      totalSpent: "Rs. 8,500",
    },
    {
      id: 5,
      name: "Anish KC",
      email: "anish.kc@example.com",
      enrolledCourses: [
        { id: 2, name: "SEO Masterclass", progress: 75 },
        { id: 5, name: "Google Ads Advanced", progress: 60 },
      ],
      joinDate: "2023-05-18",
      lastActive: "1 week ago",
      status: "active",
      phone: "+977-9805678901",
      address: "Biratnagar, Nepal",
      totalSpent: "Rs. 28,000",
    },
    {
      id: 6,
      name: "Nisha Rai",
      email: "nisha.rai@example.com",
      enrolledCourses: [
        { id: 1, name: "Digital Marketing Fundamentals", progress: 95 },
        { id: 3, name: "Social Media Strategy", progress: 82 },
        { id: 6, name: "Email Marketing Automation", progress: 68 },
      ],
      joinDate: "2023-06-07",
      lastActive: "2 days ago",
      status: "active",
      phone: "+977-9806789012",
      address: "Dharan, Nepal",
      totalSpent: "Rs. 38,500",
    },
    {
      id: 7,
      name: "Rajesh Shrestha",
      email: "rajesh.shrestha@example.com",
      enrolledCourses: [
        { id: 1, name: "Digital Marketing Fundamentals", progress: 100 },
        { id: 2, name: "SEO Masterclass", progress: 100 },
        { id: 3, name: "Social Media Strategy", progress: 100 },
        { id: 5, name: "Google Ads Advanced", progress: 90 },
        { id: 7, name: "WordPress Development", progress: 55 },
      ],
      joinDate: "2023-07-12",
      lastActive: "4 hours ago",
      status: "active",
      phone: "+977-9807890123",
      address: "Butwal, Nepal",
      totalSpent: "Rs. 70,000",
    },
    {
      id: 8,
      name: "Meera Tamang",
      email: "meera.tamang@example.com",
      enrolledCourses: [
        { id: 4, name: "Content Marketing", progress: 25 },
        { id: 8, name: "Graphic Design Essentials", progress: 40 },
      ],
      joinDate: "2023-08-30",
      lastActive: "2 weeks ago",
      status: "inactive",
      phone: "+977-9808901234",
      address: "Chitwan, Nepal",
      totalSpent: "Rs. 19,300",
    },
    {
      id: 9,
      name: "Sunil Magar",
      email: "sunil.magar@example.com",
      enrolledCourses: [{ id: 7, name: "WordPress Development", progress: 72 }],
      joinDate: "2023-09-15",
      lastActive: "1 day ago",
      status: "active",
      phone: "+977-9809012345",
      address: "Birgunj, Nepal",
      totalSpent: "Rs. 14,500",
    },
  ]

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesCourse =
      courseFilter === "all" || student.enrolledCourses.some((course) => course.name === courseFilter)

    return matchesSearch && matchesStatus && matchesCourse
  })

  // Get unique course names for filter
  const allCourses = Array.from(
    new Set(students.flatMap((student) => student.enrolledCourses.map((course) => course.name))),
  )

  // Pagination
  const studentsPerPage = 5
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage)

  const handleAddStudent = (data) => {
    setIsAddStudentOpen(false)
    toast({
      title: "Student Added",
      description: "The student has been successfully added.",
    })
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setIsEditStudentOpen(true)
  }

  const handleUpdateStudent = (data) => {
    setIsEditStudentOpen(false)
    toast({
      title: "Student Updated",
      description: "The student has been successfully updated.",
    })
  }

  const handleDeleteStudent = (studentId) => {
    toast({
      title: "Student Deleted",
      description: "The student has been successfully deleted.",
    })
  }

  const handleSendEmail = (student) => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${student.name}.`,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Students</h2>
          <p className="text-muted-foreground">Manage your students and their enrollments</p>
        </div>
        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Create a new student account. Fill in all the required fields.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="personal" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter address" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <Input id="profile-image" type="file" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="courses" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Assign Courses</Label>
                    <div className="border rounded-md p-4 space-y-2">
                      {allCourses.map((course, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input type="checkbox" id={`course-${index}`} className="rounded border-gray-300" />
                          <Label htmlFor={`course-${index}`}>{course}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any notes about this student" rows={3} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>Update the student information. Click save when you're done.</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <Tabs defaultValue="personal" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input id="edit-name" defaultValue={selectedStudent.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input id="edit-email" type="email" defaultValue={selectedStudent.email} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Phone Number</Label>
                        <Input id="edit-phone" defaultValue={selectedStudent.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select defaultValue={selectedStudent.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-address">Address</Label>
                      <Textarea id="edit-address" defaultValue={selectedStudent.address} rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-profile-image">Profile Image</Label>
                      <Input id="edit-profile-image" type="file" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="courses" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>Enrolled Courses</Label>
                      <div className="border rounded-md p-4 space-y-4">
                        {selectedStudent.enrolledCourses.map((course, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`edit-course-${index}`}
                                  className="rounded border-gray-300"
                                  defaultChecked
                                />
                                <Label htmlFor={`edit-course-${index}`}>{course.name}</Label>
                              </div>
                              <Badge
                                variant={course.progress === 100 ? "default" : "outline"}
                                className={course.progress === 100 ? "bg-green-500" : ""}
                              >
                                {course.progress}% Complete
                              </Badge>
                            </div>
                            <Progress value={course.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Add New Courses</Label>
                      <div className="border rounded-md p-4 space-y-2">
                        {allCourses
                          .filter((course) => !selectedStudent.enrolledCourses.some((c) => c.name === course))
                          .map((course, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input type="checkbox" id={`add-course-${index}`} className="rounded border-gray-300" />
                              <Label htmlFor={`add-course-${index}`}>{course}</Label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditStudentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStudent}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search students..."
            className="w-full pl-8 bg-white dark:bg-slate-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {allCourses.map((course, index) => (
                <SelectItem key={index} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-teal-100">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback className="bg-teal-100 text-teal-800">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-slate-500" />
                        {student.enrolledCourses.length}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-500" />
                        {new Date(student.joinDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-500" />
                        {student.lastActive}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.status === "active" ? "default" : "outline"}
                        className={
                          student.status === "active"
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }
                      >
                        <span className="flex items-center gap-1">
                          {student.status === "active" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {student.status}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{student.totalSpent}</TableCell>
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
                          <DropdownMenuItem onClick={() => (window.location.href = `/admin/students/${student.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(student)}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Send Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => (window.location.href = `/admin/students/${student.id}/courses`)}
                          >
                            <GraduationCap className="mr-2 h-4 w-4" />
                            <span>View Courses</span>
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
                                  This action cannot be undone. This will permanently delete the student and remove all
                                  associated data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteStudent(student.id)}
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
                    No students found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * studentsPerPage + 1} to{" "}
            {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
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
