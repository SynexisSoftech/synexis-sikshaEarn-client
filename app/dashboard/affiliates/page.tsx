"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Users, TrendingUp, Calendar, ArrowUpRight } from "lucide-react"

export default function AffiliatesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="affiliates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="affiliates">My Affiliates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="invite">Invite New</TabsTrigger>
          </TabsList>

          <TabsContent value="affiliates" className="mt-0 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
              <div className="w-full md:w-auto relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input placeholder="Search affiliates..." className="pl-9 w-full md:w-80" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Affiliate
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Apil Dhung",
                        image: "/placeholder.svg?height=40&width=40",
                        date: "Apr 15, 2025",
                        status: "Active",
                        referrals: 12,
                        earnings: "₹ 4,940",
                      },
                      {
                        name: "Sujal Limb",
                        image: "/placeholder.svg?height=40&width=40",
                        date: "Mar 22, 2025",
                        status: "Active",
                        referrals: 18,
                        earnings: "₹ 5,800",
                      },
                      {
                        name: "Nabin Shar",
                        image: "/placeholder.svg?height=40&width=40",
                        date: "Feb 10, 2025",
                        status: "Inactive",
                        referrals: 3,
                        earnings: "₹ 800",
                      },
                      {
                        name: "Tahsin Ansari",
                        image: "/placeholder.svg?height=40&width=40",
                        date: "Jan 05, 2025",
                        status: "Active",
                        referrals: 24,
                        earnings: "₹ 18,990",
                      },
                      {
                        name: "Digital Ga",
                        image: "/placeholder.svg?height=40&width=40",
                        date: "Dec 12, 2024",
                        status: "Active",
                        referrals: 32,
                        earnings: "₹ 35,850",
                      },
                    ].map((affiliate, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={affiliate.image || "/placeholder.svg"} alt={affiliate.name} />
                              <AvatarFallback className="bg-indigo-600 text-white">
                                {affiliate.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{affiliate.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{affiliate.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              affiliate.status === "Active"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-slate-400 hover:bg-slate-500"
                            }
                          >
                            {affiliate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{affiliate.referrals}</TableCell>
                        <TableCell className="font-medium">{affiliate.earnings}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-500" />
                    Total Affiliates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">86</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    New This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">14</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18.5%</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +2.3% from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Affiliates</CardTitle>
                <CardDescription>Based on earnings in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Tahsin Ansari", earnings: "₹ 18,990", referrals: 24, conversion: "22.3%" },
                    { name: "Digital Ga", earnings: "₹ 15,850", referrals: 18, conversion: "21.5%" },
                    { name: "Sujal Limb", earnings: "₹ 12,800", referrals: 15, conversion: "18.9%" },
                    { name: "Apil Dhung", earnings: "₹ 9,940", referrals: 12, conversion: "17.2%" },
                    { name: "Nabin Sharma", earnings: "₹ 7,200", referrals: 9, conversion: "24.8%" },
                  ].map((affiliate, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-medium">{affiliate.name}</div>
                          <div className="text-xs text-slate-500">{affiliate.referrals} referrals</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-700">{affiliate.earnings}</div>
                        <div className="text-xs text-green-600">{affiliate.conversion} conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invite" className="mt-0 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Invite New Affiliates</CardTitle>
                <CardDescription>Grow your network by inviting new affiliates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-1">Affiliate Program Benefits</h3>
                      <ul className="text-indigo-700 space-y-1 text-sm">
                        <li>• Earn up to 30% commission on every referral</li>
                        <li>• Multi-tier commission structure</li>
                        <li>• Weekly payouts with no minimum threshold</li>
                        <li>• Comprehensive marketing materials and support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Invite by Email</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter email address" className="flex-1" />
                      <Button className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap">Send Invitation</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bulk Invite</Label>
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-indigo-500" />
                        <div className="font-medium">Upload CSV file with email addresses</div>
                        <div className="text-xs text-slate-500">CSV format with email in first column</div>
                        <Input type="file" className="hidden" id="csvUpload" accept=".csv" />
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => document.getElementById("csvUpload")?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Share Invitation Link</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value="https://learninghub.com/join?ref=KH1000017"
                          readOnly
                          className="pr-24 bg-slate-50"
                        />
                        <Button
                          className="absolute right-1 top-1 h-8 bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => {
                            navigator.clipboard.writeText("https://learninghub.com/join?ref=KH1000017")
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}

function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
