"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  BookPlus,
  CreditCard,
  FileCheck,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+5 new this month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 1,245,890</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+18% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
            <FileCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-amber-500 mt-1">
              <Clock className="mr-1 h-3 w-3" />
              <span>Requires attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">New Users (This Month)</div>
                    <div className="text-sm font-medium">245</div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Active Users</div>
                    <div className="text-sm font-medium">1,876 (65.9%)</div>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Premium Users</div>
                    <div className="text-sm font-medium">986 (34.7%)</div>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Verified Affiliates</div>
                    <div className="text-sm font-medium">128 (4.5%)</div>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
                <Button className="w-full" variant="outline">
                  View Detailed User Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Payment System</div>
                      <div className="text-xs text-slate-500">All payment gateways operational</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Course Delivery</div>
                      <div className="text-xs text-slate-500">Video streaming and content delivery</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="font-medium">Affiliate Tracking</div>
                      <div className="text-xs text-slate-500">Minor delays in tracking</div>
                    </div>
                  </div>
                  <Badge className="bg-amber-500">Degraded</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">User Authentication</div>
                      <div className="text-xs text-slate-500">Login and registration systems</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>

                <Button className="w-full" variant="outline">
                  View System Status
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">KYC Verifications</div>
                      <div className="text-xs text-slate-500">8 pending approvals</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Review
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Withdrawal Requests</div>
                      <div className="text-xs text-slate-500">12 pending approvals</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Review
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <BookPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Course Approvals</div>
                      <div className="text-xs text-slate-500">3 pending reviews</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Signups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Rahul Sharma", time: "2 hours ago", plan: "Premium" },
                  { name: "Priya Patel", time: "5 hours ago", plan: "Basic" },
                  { name: "Amit Kumar", time: "Yesterday", plan: "Premium" },
                  { name: "Neha Singh", time: "Yesterday", plan: "Basic" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.time}</div>
                      </div>
                    </div>
                    <Badge className={user.plan === "Premium" ? "bg-purple-500" : "bg-slate-500"}>{user.plan}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { amount: "₹ 4,500", type: "Course Purchase", status: "Completed", time: "2 hours ago" },
                  { amount: "₹ 2,800", type: "Affiliate Payout", status: "Processing", time: "5 hours ago" },
                  { amount: "₹ 12,000", type: "Course Purchase", status: "Completed", time: "Yesterday" },
                  { amount: "₹ 3,600", type: "Subscription", status: "Completed", time: "Yesterday" },
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === "Course Purchase"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {transaction.type === "Course Purchase" ? (
                          <CreditCard className="h-4 w-4" />
                        ) : (
                          <DollarSign className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.amount}</div>
                        <div className="text-xs text-slate-500">{transaction.time}</div>
                      </div>
                    </div>
                    <Badge className={transaction.status === "Completed" ? "bg-green-500" : "bg-amber-500"}>
                      {transaction.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">System Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "User Signup",
                  details: "New user registered: Rahul Sharma",
                  time: "2 hours ago",
                  icon: <UserPlus className="h-4 w-4 text-emerald-500" />,
                },
                {
                  action: "Course Added",
                  details: "New course added: Advanced Digital Marketing",
                  time: "3 hours ago",
                  icon: <BookPlus className="h-4 w-4 text-indigo-500" />,
                },
                {
                  action: "Payment Processed",
                  details: "Payment of ₹12,000 processed for order #45678",
                  time: "4 hours ago",
                  icon: <CreditCard className="h-4 w-4 text-green-500" />,
                },
                {
                  action: "KYC Approved",
                  details: "KYC verification approved for Amit Kumar",
                  time: "5 hours ago",
                  icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                },
                {
                  action: "Affiliate Joined",
                  details: "New affiliate joined: Priya Patel",
                  time: "6 hours ago",
                  icon: <UserPlus className="h-4 w-4 text-purple-500" />,
                },
                {
                  action: "Withdrawal Request",
                  details: "Withdrawal request of ₹5,400 from Neha Singh",
                  time: "8 hours ago",
                  icon: <DollarSign className="h-4 w-4 text-amber-500" />,
                },
                {
                  action: "System Update",
                  details: "System updated to version 2.4.0",
                  time: "Yesterday",
                  icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
                },
                {
                  action: "Course Updated",
                  details: "Course 'Web Development Fundamentals' updated",
                  time: "Yesterday",
                  icon: <BookOpen className="h-4 w-4 text-indigo-500" />,
                },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="mt-0.5">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-slate-500">{activity.details}</div>
                    <div className="text-xs text-slate-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-slate-400 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <div className="text-lg font-medium">Revenue Chart</div>
                    <div className="text-sm">Monthly revenue data visualization</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-green-600 font-medium">This Month</div>
                    <div className="text-2xl font-bold mt-1">₹ 245,890</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+18% from last month</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 font-medium">Last Month</div>
                    <div className="text-2xl font-bold mt-1">₹ 208,450</div>
                    <div className="flex items-center text-xs text-blue-600 mt-1">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+12% from previous</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">User Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-slate-400 text-center">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <div className="text-lg font-medium">User Growth Chart</div>
                    <div className="text-sm">Monthly user acquisition data</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-xs text-purple-600 font-medium">New Users</div>
                    <div className="text-2xl font-bold mt-1">245</div>
                    <div className="flex items-center text-xs text-purple-600 mt-1">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+24% from last month</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <div className="text-xs text-amber-600 font-medium">Churn Rate</div>
                    <div className="text-2xl font-bold mt-1">3.2%</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      <span>-0.8% from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Platform Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Course Completion Rate</div>
                    <div className="text-sm font-medium">68%</div>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="text-xs text-slate-500">Percentage of enrolled users who complete courses</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Affiliate Conversion Rate</div>
                    <div className="text-sm font-medium">18.7%</div>
                  </div>
                  <Progress value={19} className="h-2" />
                  <div className="text-xs text-slate-500">Percentage of affiliate link clicks that convert</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Premium Subscription Rate</div>
                    <div className="text-sm font-medium">34.7%</div>
                  </div>
                  <Progress value={35} className="h-2" />
                  <div className="text-xs text-slate-500">Percentage of users on premium plans</div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Average Session Duration</div>
                    <div className="text-sm font-medium">24 min</div>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-xs text-slate-500">Average time users spend on the platform per session</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Mobile Usage</div>
                    <div className="text-sm font-medium">62%</div>
                  </div>
                  <Progress value={62} className="h-2" />
                  <div className="text-xs text-slate-500">Percentage of users accessing via mobile devices</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Support Ticket Resolution</div>
                    <div className="text-sm font-medium">92%</div>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="text-xs text-slate-500">Percentage of support tickets resolved within 24 hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
