"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Upload, AlertCircle, CheckCircle2, Mail, ExternalLink, Clock, User, AtSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export default function AdminProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoadingName, setIsLoadingName] = useState(false)
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [nameSuccess, setNameSuccess] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")

  // User data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  })
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  // OTP related states
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [otpSending, setOtpSending] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  // Email verification states
  const [showEmailVerificationDialog, setShowEmailVerificationDialog] = useState(false)
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<"pending" | "verified" | "failed">("pending")
  const [emailVerificationTimer, setEmailVerificationTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData()
  }, [])

  // Function to fetch user data
  const fetchUserData = async () => {
    setIsLoadingUserData(true)
    try {
      const response = await fetch("/api/users")
      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }

      const data = await response.json()
      console.log("Fetched user data:", data)

      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        avatar: data.avatar || "",
      })

      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
      })

      if (data.avatar) {
        setProfileImage(data.avatar)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      toast({
        title: "Error",
        description: "Failed to load user data. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingUserData(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(`Updating ${name} field to: ${value}`)

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      }
      console.log("Updated form data:", updated)
      return updated
    })
  }

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload image to server
      uploadProfileImage(file)
    }
  }

  // Upload profile image
  const uploadProfileImage = async (file: File) => {
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const response = await fetch("/api/users/avatar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload profile image")
      }

      toast({
        title: "Success",
        description: "Profile image updated successfully",
      })
    } catch (error) {
      console.error("Error uploading profile image:", error)
      toast({
        title: "Error",
        description: "Failed to upload profile image. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace in OTP input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste for OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (pastedData.length <= 6 && /^\d+$/.test(pastedData)) {
      const newOtp = [...otp]
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newOtp[i] = pastedData[i]
      }
      setOtp(newOtp)

      // Focus the appropriate input after paste
      const focusIndex = Math.min(pastedData.length, 5)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  // Send OTP to current email
  const sendOtp = async () => {
    setOtpSending(true)
    setOtpError("")

    try {
      const response = await fetch("/api/auth/send-otp-old-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          newEmail: newEmail,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send OTP")
      }

      setOtpSent(true)
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your current email address.",
      })

      // Reset OTP sent status after 30 seconds
      setTimeout(() => {
        setOtpSent(false)
      }, 30000)
    } catch (error) {
      console.error("Error sending OTP:", error)
      setOtpError(error instanceof Error ? error.message : "Failed to send OTP. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setOtpSending(false)
    }
  }

  // Verify OTP and send verification email to new email
  const verifyOtp = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP")
      return
    }

    setVerifyingOtp(true)
    setOtpError("")

    try {
      const response = await fetch("/api/auth/verify-otp-and-send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpValue,
          currentEmail: userData.email,
          newEmail: newEmail,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Invalid OTP")
      }

      setOtpVerified(true)
      setShowOtpDialog(false)
      setShowEmailVerificationDialog(true)
      startVerificationTimer()
      toast({
        title: "OTP Verified",
        description: "Verification email has been sent to your new email address.",
      })
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setOtpError(error instanceof Error ? error.message : "Invalid OTP. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setVerifyingOtp(false)
    }
  }

  // Start the verification timer
  const startVerificationTimer = () => {
    setEmailVerificationTimer(300) // 5 minutes
    setTimerActive(true)

    const interval = setInterval(() => {
      setEmailVerificationTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Format the timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Verify email change
  const verifyEmailChange = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to verify email change")
      }

      // Update user data with new email
      setEmailVerificationStatus("verified")
      setUserData((prev) => ({
        ...prev,
        email: newEmail,
      }))

      // Close the dialog after a short delay
      setTimeout(() => {
        setShowEmailVerificationDialog(false)

        // Show success message
        toast({
          title: "Success",
          description: "Your email has been updated successfully.",
        })

        // Refresh user data
        fetchUserData()
      }, 1000)
    } catch (error) {
      console.error("Error verifying email change:", error)
      setEmailVerificationStatus("failed")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify email change. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      const response = await fetch("/api/auth/verify-otp-and-send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resend: true,
          currentEmail: userData.email,
          newEmail: newEmail,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to resend verification email")
      }

      setEmailVerificationStatus("pending")
      startVerificationTimer()
      toast({
        title: "Email Sent",
        description: "A new verification email has been sent.",
      })
    } catch (error) {
      console.error("Error resending verification email:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend verification email. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle name update
  const handleNameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitting name update with data:", {
      firstName: formData.firstName,
      lastName: formData.lastName,
    })

    setIsLoadingName(true)
    setNameSuccess(false)
    setNameError("")

    try {
      const response = await fetch("/api/users/name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update name")
      }

      const updatedData = await response.json()
      console.log("Name updated successfully:", updatedData)

      setNameSuccess(true)
      setUserData((prev) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }))

      toast({
        title: "Success",
        description: "Your name has been updated successfully.",
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setNameSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error updating name:", error)
      setNameError(error instanceof Error ? error.message : "Failed to update name. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update name. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingName(false)
    }
  }

  // Handle email update
  const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Initiating email update process with new email:", formData.email)

    if (formData.email === userData.email) {
      setEmailError("New email is the same as current email")
      return
    }

    setNewEmail(formData.email)
    setShowOtpDialog(true)
  }

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingPassword(true)
    setPasswordSuccess(false)
    setPasswordError("")

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Basic validation
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      setIsLoadingPassword(false)
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      setIsLoadingPassword(false)
      return
    }

    try {
      const response = await fetch("/api/users/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to change password")
      }

      setPasswordSuccess(true)
      e.currentTarget.reset()

      toast({
        title: "Success",
        description: "Your password has been changed successfully.",
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error changing password:", error)
      setPasswordError(error instanceof Error ? error.message : "Failed to change password. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to change password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingPassword(false)
    }
  }

  // For demo purposes - simulate email verification
  const simulateEmailVerification = () => {
    // In a real app, this would be triggered by the user clicking the link in their email
    // which would include a token. Here we're just simulating that process.
    verifyEmailChange("demo-token")
  }

  return (
    <div className="container max-w-4xl mx-auto py-4">
      {isLoadingUserData ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-primary mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-muted-foreground">Loading profile information...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 relative group">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-md">
                    <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} alt="Admin" />
                    <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                      {userData.firstName.charAt(0)}
                      {userData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Upload className="h-8 w-8 text-white" />
                    <span className="sr-only">Upload profile picture</span>
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <CardTitle>
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardDescription> Admin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last login:</span>
                    <span className="font-medium">Today, 10:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="font-medium">Jan 15, 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

         
          </div>

          {/* Profile tabs */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Profile tab */}
              <TabsContent value="profile">
                {/* Name Update Card */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Name Information</CardTitle>
                    <CardDescription>Update your first and last name</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {nameSuccess && (
                      <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your name has been updated successfully.</AlertDescription>
                      </Alert>
                    )}

                    {nameError && (
                      <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{nameError}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleNameUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                      </div>

                      <Button type="submit" className="w-full sm:w-auto" disabled={isLoadingName}>
                        {isLoadingName ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          <>
                            <User className="mr-2 h-4 w-4" />
                            Update Name
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Email Update Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Email Information</CardTitle>
                    <CardDescription>Update your email address</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {emailSuccess && (
                      <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your email has been updated successfully.</AlertDescription>
                      </Alert>
                    )}

                    {emailError && (
                      <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{emailError}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleEmailUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Changing your email requires verification via OTP and email confirmation
                        </p>
                      </div>

                      <Button type="submit" className="w-full sm:w-auto" disabled={isLoadingEmail}>
                        {isLoadingEmail ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          <>
                            <AtSign className="mr-2 h-4 w-4" />
                            Update Email
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Update your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {passwordSuccess && (
                      <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your password has been changed successfully.</AlertDescription>
                      </Alert>
                    )}

                    {passwordError && (
                      <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{passwordError}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          required
                          autoComplete="current-password"
                        />
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          required
                          autoComplete="new-password"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters long
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          autoComplete="new-password"
                        />
                      </div>

                      <Button type="submit" className="w-full sm:w-auto" disabled={isLoadingPassword}>
                        {isLoadingPassword ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Change Password
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Verification - Step 1</DialogTitle>
            <DialogDescription>
              We'll send a verification code to your current email ({userData.email}). Enter the code below to proceed.
            </DialogDescription>
          </DialogHeader>

          {otpError && (
            <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>{otpError}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-4">
            <div className="flex justify-center my-4">
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={sendOtp}
                disabled={otpSending || otpSent}
                className="text-sm"
              >
                {otpSending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : otpSent ? (
                  "Code Sent"
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {otpSent ? "Resend Code" : "Send Code"}
                  </>
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setShowOtpDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={verifyOtp} disabled={verifyingOtp || otp.join("").length !== 6}>
              {verifyingOtp ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Verification Dialog */}
      <Dialog open={showEmailVerificationDialog} onOpenChange={setShowEmailVerificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Verification - Step 2</DialogTitle>
            <DialogDescription>
              We've sent a verification link to your new email address ({newEmail}). Please check your Gmail and click
              the verification link to complete the process.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-6 py-4">
            {/* Email verification status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Verification Email Sent</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Please check your Gmail inbox for an email from us with the subject:</p>
                    <p className="font-medium mt-1">"Verify your email address for Admin Dashboard"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            {timerActive && (
              <div className="flex items-center justify-center">
                <Clock className="h-4 w-4 mr-2 text-amber-600" />
                <span className="text-sm text-amber-700">
                  Waiting for verification: {formatTime(emailVerificationTimer)}
                </span>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  1
                </div>
                <p className="text-sm">Open your Gmail inbox</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  2
                </div>
                <p className="text-sm">Find the email from Admin Dashboard</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <p className="text-sm">Click the "Verify Email Address" button in the email</p>
              </div>
            </div>

            {/* For demo purposes - simulate verification */}
            <div className="border-t pt-4 mt-2">
              <p className="text-sm text-center text-muted-foreground mb-3">For demonstration purposes:</p>
              <Button
                className="w-full"
                onClick={simulateEmailVerification}
                variant={emailVerificationStatus === "verified" ? "outline" : "default"}
              >
                {emailVerificationStatus === "verified" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Email Verified Successfully
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Simulate Email Verification
                  </>
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEmailVerificationDialog(false)}
              className="mt-3 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resendVerificationEmail}
              disabled={timerActive}
              className="mt-3 sm:mt-0"
            >
              Resend Verification Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
