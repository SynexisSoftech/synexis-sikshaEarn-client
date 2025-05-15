"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, User } from "lucide-react"

interface AdminProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  image?: string
}

export default function AdminProfilePage() {
  const { data: session, update } = useSession()
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Name form state
  const [nameForm, setNameForm] = useState({
    firstName: "",
    lastName: "",
  })
  const [submittingName, setSubmittingName] = useState(false)

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [submittingPassword, setSubmittingPassword] = useState(false)

  useEffect(() => {
    fetchAdminProfile()
  }, [])

  const fetchAdminProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/profile")

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const data = await response.json()
      setProfile(data.data)

      // Pre-fill name form
      setNameForm({
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
      })
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("Failed to load profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNameForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSubmittingName(true)

    try {
      const response = await fetch("/api/admin/profile/name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nameForm),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update name")
      }

      const data = await response.json()
      setSuccess("Name updated successfully!")

      // Update session to reflect name change
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: `${nameForm.firstName} ${nameForm.lastName}`,
          },
        })
      }

      // Refresh profile data
      fetchAdminProfile()
    } catch (err: any) {
      console.error("Error updating name:", err)
      setError(err.message || "Failed to update name. Please try again.")
    } finally {
      setSubmittingName(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      return
    }

    setSubmittingPassword(true)

    try {
      const response = await fetch("/api/admin/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to change password")
      }

      setSuccess("Password changed successfully!")

      // Clear password form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err: any) {
      console.error("Error changing password:", err)
      setError(err.message || "Failed to change password. Please try again.")
    } finally {
      setSubmittingPassword(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <p>Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              {error && (
                <Alert className="mb-6 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Error</AlertTitle>
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                    {profile?.image ? (
                      <img
                        src={profile.image || "/placeholder.svg"}
                        alt={profile.firstName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {profile?.firstName} {profile?.lastName}
                    </h3>
                    <p className="text-gray-500">{profile?.email}</p>
                    <p className="text-sm mt-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full inline-block">
                      {profile?.role}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={nameForm.firstName}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={nameForm.lastName}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={submittingName}>
                    {submittingName ? "Updating..." : "Update Name"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="password">
              {error && (
                <Alert className="mb-6 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Error</AlertTitle>
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={submittingPassword}>
                  {submittingPassword ? "Changing Password..." : "Change Password"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
