"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Users, Award, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DashboardPage() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Income</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 5,800</div>
            <p className="text-xs text-indigo-100 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 35,850</div>
            <p className="text-xs text-slate-500 mt-1">+8% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 73,400</div>
            <p className="text-xs text-slate-500 mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Time Income</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. 3,60,000</div>
            <p className="text-xs text-slate-500 mt-1">Since you joined</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="col-span-6 md:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Your Profile</CardTitle>
            <CardDescription>Your account details and progress</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-indigo-100">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback className="text-2xl bg-indigo-600 text-white">BS</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Bishnu Shah</h3>
            <Badge className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Premium Member
            </Badge>

            <div className="w-full mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Affiliates
              </Button>
              <Button variant="outline" className="w-full">
                <Award className="mr-2 h-4 w-4" />
                Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-6 md:col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Leaderboard</CardTitle>
            <CardDescription>Top performers this week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-0">
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    { name: "Apil Dhung", amount: "₹ 4940", position: 2, image: "/placeholder.svg?height=96&width=96" },
                    { name: "Sujal Limb", amount: "₹ 5800", position: 1, image: "/placeholder.svg?height=96&width=96" },
                    { name: "Nabin Shar", amount: "₹ 800", position: 3, image: "/placeholder.svg?height=96&width=96" },
                  ].map((user, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-2 border-indigo-100">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-indigo-600 text-white">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            user.position === 1
                              ? "bg-yellow-500"
                              : user.position === 2
                                ? "bg-slate-400"
                                : "bg-amber-700"
                          }`}
                        >
                          {user.position}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-indigo-600 font-bold">{user.amount}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    {
                      name: "Digital Ga",
                      amount: "₹ 35850",
                      position: 1,
                      image: "/placeholder.svg?height=96&width=96",
                    },
                    {
                      name: "Sujal Limb",
                      amount: "₹ 73400",
                      position: 2,
                      image: "/placeholder.svg?height=96&width=96",
                    },
                    {
                      name: "Apil Dhung",
                      amount: "₹ 32500",
                      position: 3,
                      image: "/placeholder.svg?height=96&width=96",
                    },
                  ].map((user, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-2 border-indigo-100">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-indigo-600 text-white">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            user.position === 1
                              ? "bg-yellow-500"
                              : user.position === 2
                                ? "bg-slate-400"
                                : "bg-amber-700"
                          }`}
                        >
                          {user.position}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-indigo-600 font-bold">{user.amount}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="month" className="mt-0">
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    {
                      name: "Tahsin Ansari",
                      amount: "₹ 189900",
                      position: 1,
                      image: "/placeholder.svg?height=96&width=96",
                    },
                    { name: "Izhaan", amount: "₹ 135700", position: 2, image: "/placeholder.svg?height=96&width=96" },
                    {
                      name: "Nabin Sharma",
                      amount: "₹ 107200",
                      position: 3,
                      image: "/placeholder.svg?height=96&width=96",
                    },
                  ].map((user, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-2 border-indigo-100">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-indigo-600 text-white">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            user.position === 1
                              ? "bg-yellow-500"
                              : user.position === 2
                                ? "bg-slate-400"
                                : "bg-amber-700"
                          }`}
                        >
                          {user.position}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-indigo-600 font-bold">{user.amount}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Courses</CardTitle>
            <CardDescription>Your recently accessed courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Communication Skill", progress: 75, lastAccessed: "2 hours ago" },
              { title: "Digital Marketing", progress: 45, lastAccessed: "Yesterday" },
              { title: "Web Development", progress: 20, lastAccessed: "3 days ago" },
            ].map((course, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {course.title.substring(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{course.title}</h4>
                    <span className="text-xs text-slate-500">{course.lastAccessed}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <Progress value={course.progress} className="h-1.5 flex-1 mr-2" />
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/dashboard/mycourses">
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Payouts</CardTitle>
            <CardDescription>Your recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { amount: "Rs. 800", date: "Apr 27, 2025", status: "Success" },
              { amount: "Rs. 400", date: "Apr 12, 2025", status: "Success" },
              { amount: "Rs. 400", date: "Mar 08, 2025", status: "Success" },
              { amount: "Rs. 1200", date: "Feb 23, 2025", status: "Success" },
            ].map((payout, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{payout.amount}</div>
                    <div className="text-xs text-slate-500">{payout.date}</div>
                  </div>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">{payout.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/dashboard/payouts">
                View All Payouts
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Affiliate Stats</CardTitle>
            <CardDescription>Your affiliate performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="text-xs text-indigo-600 font-medium">Total Referrals</div>
                <div className="text-2xl font-bold mt-1">128</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-xs text-purple-600 font-medium">Active Referrals</div>
                <div className="text-2xl font-bold mt-1">86</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-green-600 font-medium">Conversion Rate</div>
                <div className="text-2xl font-bold mt-1">67%</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <div className="text-xs text-amber-600 font-medium">Avg. Commission</div>
                <div className="text-2xl font-bold mt-1">₹ 450</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/dashboard/affiliates">
                View Affiliate Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
