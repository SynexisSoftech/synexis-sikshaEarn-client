"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Globe, MousePointer, ArrowRight, Clock, Calendar } from "lucide-react"

export default function TrafficPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Traffic Overview</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
              <div className="w-full md:w-auto">
                <div className="font-medium mb-2">Date Range</div>
                <Select defaultValue="last30">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7">Last 7 days</SelectItem>
                    <SelectItem value="last30">Last 30 days</SelectItem>
                    <SelectItem value="thismonth">This month</SelectItem>
                    <SelectItem value="lastmonth">Last month</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export Data</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Refresh</Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MousePointer className="h-5 w-5 text-indigo-500" />
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12,845</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +18% from last period
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-500" />
                    Unique Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8,492</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last period
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    Avg. Time on Site
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4:32</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +0:45 from last period
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-indigo-500" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18.7%</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +2.3% from last period
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Traffic by Day</CardTitle>
                <CardDescription>Click and visitor data for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-slate-400 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <div className="text-lg font-medium">Traffic Chart Visualization</div>
                    <div className="text-sm">Daily traffic data would be displayed here</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="mt-0 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-slate-400 text-center">
                      <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <div className="text-lg font-medium">Traffic Sources Chart</div>
                      <div className="text-sm">Pie chart visualization would be displayed here</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { source: "Direct", percentage: 35, visits: 2972, color: "bg-indigo-500" },
                      { source: "Organic Search", percentage: 28, visits: 2378, color: "bg-purple-500" },
                      { source: "Social Media", percentage: 22, visits: 1868, color: "bg-pink-500" },
                      { source: "Referral", percentage: 10, visits: 849, color: "bg-amber-500" },
                      { source: "Email", percentage: 5, visits: 425, color: "bg-emerald-500" },
                    ].map((source, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{source.source}</div>
                          <div className="text-sm text-slate-500">
                            {source.percentage}% ({source.visits} visits)
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Top Referrers</CardTitle>
                <CardDescription>Websites sending traffic to your affiliate links</CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Website</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Avg. Time on Site</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { website: "facebook.com", visits: 845, conversion: "22.4%", time: "3:45" },
                      { website: "youtube.com", visits: 632, conversion: "18.7%", time: "4:12" },
                      { website: "instagram.com", visits: 518, conversion: "20.1%", time: "2:58" },
                      { website: "twitter.com", visits: 392, conversion: "15.3%", time: "2:24" },
                      { website: "linkedin.com", visits: 287, conversion: "24.8%", time: "5:10" },
                    ].map((referrer, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{referrer.website}</TableCell>
                        <TableCell>{referrer.visits}</TableCell>
                        <TableCell>{referrer.conversion}</TableCell>
                        <TableCell>{referrer.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-0 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
              <div className="w-full md:w-auto relative">
                <Input placeholder="Search campaigns..." className="w-full md:w-80" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Create Campaign</Button>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Active Campaigns</CardTitle>
                <CardDescription>Performance of your marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>Conv. Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Summer Sale 2025",
                        date: "Apr 15, 2025",
                        clicks: 2845,
                        conversions: 532,
                        rate: "18.7%",
                        revenue: "₹ 42,560",
                      },
                      {
                        name: "Digital Marketing Course",
                        date: "Mar 22, 2025",
                        clicks: 1932,
                        conversions: 387,
                        rate: "20.0%",
                        revenue: "₹ 38,700",
                      },
                      {
                        name: "Web Development Bundle",
                        date: "Feb 10, 2025",
                        clicks: 1245,
                        conversions: 198,
                        rate: "15.9%",
                        revenue: "₹ 19,800",
                      },
                      {
                        name: "Communication Skills Workshop",
                        date: "Jan 05, 2025",
                        clicks: 987,
                        conversions: 245,
                        rate: "24.8%",
                        revenue: "₹ 24,500",
                      },
                      {
                        name: "Affiliate Program Launch",
                        date: "Dec 12, 2024",
                        clicks: 3245,
                        conversions: 678,
                        rate: "20.9%",
                        revenue: "₹ 67,800",
                      },
                    ].map((campaign, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.date}</TableCell>
                        <TableCell>{campaign.clicks}</TableCell>
                        <TableCell>{campaign.conversions}</TableCell>
                        <TableCell>{campaign.rate}</TableCell>
                        <TableCell className="font-medium text-indigo-700">{campaign.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
