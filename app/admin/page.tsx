"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Award,
  ArrowUpRight,
  Calendar,
  TrendingUp,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7days")

  // Sample data for charts
  const enrollmentData = [
    { name: "Jan", count: 45 },
    { name: "Feb", count: 52 },
    { name: "Mar", count: 49 },
    { name: "Apr", count: 62 },
    { name: "May", count: 78 },
    { name: "Jun", count: 94 },
    { name: "Jul", count: 82 },
  ]

  const revenueData = [
    { name: "Jan", amount: 12500 },
    { name: "Feb", amount: 14200 },
    { name: "Mar", amount: 13800 },
    { name: "Apr", amount: 16500 },
    { name: "May", amount: 19200 },
    { name: "Jun", amount: 22500 },
    { name: "Jul", amount: 20100 },
  ]

  const categoryData = [
    { name: "Marketing", value: 65 },
    { name: "Development", value: 15 },
    { name: "Design", value: 10 },
    { name: "Analytics", value: 10 },
  ]

  const COLORS = ["#0891b2", "#0e7490", "#155e75", "#164e63"]

  const completionRateData = [
    { name: "Jan", rate: 68 },
    { name: "Feb", rate: 72 },
    { name: "Mar", rate: 70 },
    { name: "Apr", rate: 75 },
    { name: "May", rate: 78 },
    { name: "Jun", rate: 82 },
    { name: "Jul", rate: 78 },
  ]

  const recentEnrollments = [
    {
      id: 1,
      name: "Aarav Sharma",
      course: "Digital Marketing Fundamentals",
      date: "2 hours ago",
      amount: "Rs. 12,500",
      status: "completed",
    },
    {
      id: 2,
      name: "Priya Patel",
      course: "SEO Masterclass",
      date: "5 hours ago",
      amount: "Rs. 9,800",
      status: "processing",
    },
    {
      id: 3,
      name: "Rohan Thapa",
      course: "Social Media Strategy",
      date: "1 day ago",
      amount: "Rs. 15,000",
      status: "completed",
    },
    {
      id: 4,
      name: "Sita Gurung",
      course: "Content Marketing",
      date: "1 day ago",
      amount: "Rs. 8,500",
      status: "completed",
    },
    {
      id: 5,
      name: "Anish KC",
      course: "Google Ads Advanced",
      date: "2 days ago",
      amount: "Rs. 18,200",
      status: "processing",
    },
  ]

  const topCourses = [
    {
      id: 1,
      name: "Digital Marketing Fundamentals",
      students: 248,
      rating: 4.9,
      completion: 85,
      revenue: "Rs. 3,100,000",
    },
    {
      id: 2,
      name: "SEO Masterclass",
      students: 186,
      rating: 4.8,
      completion: 78,
      revenue: "Rs. 1,822,800",
    },
    {
      id: 3,
      name: "Social Media Strategy",
      students: 172,
      rating: 4.7,
      completion: 82,
      revenue: "Rs. 2,580,000",
    },
    {
      id: 4,
      name: "Content Marketing",
      students: 154,
      rating: 4.6,
      completion: 75,
      revenue: "Rs. 1,309,000",
    },
    {
      id: 5,
      name: "Google Ads Advanced",
      students: 132,
      rating: 4.8,
      completion: 80,
      revenue: "Rs. 2,402,400",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Admin User</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+12.5% from last month</span>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="mr-1 h-3 w-3" />
                    This month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+2 new this month</span>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Growing
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.3%</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+4.2% from last month</span>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <Award className="mr-1 h-3 w-3" />
                    Above target
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rs. 1.2M</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+18.2% from last month</span>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="mr-1 h-3 w-3" />
                    This month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enrollment Overview</CardTitle>
                    <CardDescription>Course enrollments for the past 7 months</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-3 w-3" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <RechartsTooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                      animationDuration={1500}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0891b2" stopOpacity={1} />
                        <stop offset="100%" stopColor="#0e7490" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue in NPR</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-3 w-3" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <RechartsTooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                      formatter={(value) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0e7490" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0e7490" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#0e7490"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Course Categories</CardTitle>
                <CardDescription>Distribution of courses by category</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1500}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-4 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Completion Rate Trend</CardTitle>
                <CardDescription>Monthly course completion rates</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={completionRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <RechartsTooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                      formatter={(value) => [`${value}%`, "Completion Rate"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#0891b2"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#0891b2" }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>Latest student enrollments and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="border-2 border-teal-100">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback className="bg-teal-100 text-teal-800">
                            {enrollment.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{enrollment.name}</p>
                          <p className="text-xs text-muted-foreground">{enrollment.course}</p>
                          <p className="text-xs text-muted-foreground">{enrollment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{enrollment.amount}</p>
                        <Badge
                          variant={enrollment.status === "completed" ? "default" : "outline"}
                          className={enrollment.status === "completed" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {enrollment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Enrollments
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
                <CardDescription>Courses with highest enrollment and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{course.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="mr-1 h-3 w-3" />
                            <span>{course.students} students</span>
                            <span className="mx-2">•</span>
                            <Award className="mr-1 h-3 w-3 text-yellow-500" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div className="text-right text-xs">
                          <p className="font-medium">{course.revenue}</p>
                          <p className="text-muted-foreground">Revenue</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Completion</span>
                          <span>{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
