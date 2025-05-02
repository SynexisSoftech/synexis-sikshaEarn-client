"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Globe, Bell, Shield, Key, Mail, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been successfully saved.",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-teal-100">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl bg-teal-100 text-teal-800">AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="admin@knowledgehub.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+977-9801234567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Administrator" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      rows={4} 
                      defaultValue="Administrator at Knowledge Hub Nepal with expertise in digital marketing and education technology."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Update your site details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Knowledge Hub Nepal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input id="site-url" defaultValue="www.knowledgehubnepal.com" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="info@knowledgehubnepal.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+977-01-4567890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={2} defaultValue="Kathmandu, Nepal" />
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your admin dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-br from-teal-500 to-teal-600 cursor-pointer border-2 border-teal-500" />
                    <span className="text-sm">Teal (Default)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer" />
                    <span className="text-sm">Blue</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-full rounded-md bg-gradient-to-br from-purple-500 to-purple-600 cursor-pointer" />
                    <span className="text-sm">Purple</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Display Mode</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-32 w-full rounded-md bg-white border cursor-pointer">
                      <div className="h-6 w-full bg-slate-200 rounded-t-md"></div>
                      <div className="p-2">
                        <div className="h-4 w-2/3 bg-slate-100 rounded-sm mb-2"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded-sm"></div>
                      </div>
                    </div>
                    <span className="text-sm">Light Mode</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-32 w-full rounded-md bg-slate-900 border border-slate-700 cursor-pointer">
                      <div className="h-6 w-full bg-slate-800 rounded-t-md"></div>
                      <div className="p-2">
                        <div className="h-4 w-2/3 bg-slate-800 rounded-sm mb-2"></div>
                        <div className="h-4 w-1/2 bg-slate-800 rounded-sm"></div>
                      </div>
                    </div>
                    <span className="text-sm">Dark Mode</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-collapsed">Collapsed Sidebar by Default</Label>
                    <p className="text-sm text-muted-foreground">Start with a collapsed sidebar for more screen space</p>
                  </div>
                  <Switch id="sidebar-collapsed" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Interface Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for a more compact interface</p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Student Enrollments</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when a new student enrolls</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Course Reviews</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for new course reviews</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for new payments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Push Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for critical alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Digest
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Digest Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  Password
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Two-Factor Authentication
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" disabled>Set Up Two-Factor Authentication</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Login Sessions
                </h3>
                <div className="space-y-3">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Kathmandu, Nepal • Chrome on Windows</p>
                        <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Log Out of All Devices
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced settings for your platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable debug mode for troubleshooting</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cache System</Label>
                      <p className="text-sm text-muted-foreground">Enable caching for better performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Integration</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" defaultValue="sk_live_51NXxXXXXXXXXXXXXXXXXXXXX" type="password" />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Your API key is sensitive. Do\
