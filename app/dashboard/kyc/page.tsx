"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { format } from "date-fns"

interface KycData {
  _id: string
  fullName: string
  dateOfBirth: string
  nationality: string
  gender: string
  fullAddress: string
  idType: string
  idNumber: string
  idFront: string
  idBack: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewerComment?: string
}

export default function KycPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [kycData, setKycData] = useState<KycData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    gender: "Male",
    fullAddress: "",
    idType: "Passport",
    idNumber: "",
    idFront: "",
    idBack: "",
  })
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null)
  const [idBackFile, setIdBackFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

    fetchKycData()
  }, [session, router])

  const fetchKycData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/user/kyc")

      if (response.status === 404) {
        // No KYC data found, that's okay
        setKycData(null)
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch KYC data")
      }

      const data = await response.json()
      setKycData(data.data)

      // Pre-fill form if we need to update
      if (data.data && (data.data.status === "pending" || data.data.status === "rejected")) {
        setFormData({
          fullName: data.data.fullName,
          dateOfBirth: new Date(data.data.dateOfBirth).toISOString().split("T")[0],
          nationality: data.data.nationality,
          gender: data.data.gender,
          fullAddress: data.data.fullAddress,
          idType: data.data.idType,
          idNumber: data.data.idNumber,
          idFront: data.data.idFront,
          idBack: data.data.idBack,
        })
      }
    } catch (err) {
      console.error("Error fetching KYC data:", err)
      setError("Failed to load KYC data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]

    if (side === "front") {
      setIdFrontFile(file)
    } else {
      setIdBackFile(file)
    }

    // In a real app, you would upload to a storage service and get a URL
    // For this example, we'll simulate it with a placeholder
    const fileUrl = `/uploads/${file.name}`
    setFormData((prev) => ({ ...prev, [side === "front" ? "idFront" : "idBack"]: fileUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)

    try {
      // In a real app, you would first upload the files to a storage service
      // and then use the returned URLs in the form data

      const method = kycData ? "PATCH" : "POST"
      const response = await fetch("/api/user/kyc", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dateOfBirth: new Date(formData.dateOfBirth),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit KYC verification")
      }

      const data = await response.json()
      setKycData(data.data)
      setSuccess(kycData ? "KYC information updated successfully!" : "KYC verification submitted successfully!")

      // Refresh data
      fetchKycData()
    } catch (err: any) {
      console.error("Error submitting KYC:", err)
      setError(err.message || "Failed to submit KYC verification. Please try again.")
    } finally {
      setSubmitting(false)
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

  // If KYC is approved, show status
  if (kycData && kycData.status === "approved") {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>KYC Verification</CardTitle>
            <CardDescription>Your identity has been verified</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Verification Approved</AlertTitle>
              <AlertDescription className="text-green-700">
                Your KYC verification has been approved on{" "}
                {kycData.reviewedAt ? format(new Date(kycData.reviewedAt), "PPP") : "N/A"}.
              </AlertDescription>
            </Alert>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p>{kycData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{format(new Date(kycData.dateOfBirth), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p>{kycData.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p>{kycData.gender}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Address</h3>
                <p className="mt-1">{kycData.fullAddress}</p>
              </div>

              <div>
                <h3 className="font-medium">ID Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">ID Type</p>
                    <p>{kycData.idType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Number</p>
                    <p>{kycData.idNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If KYC is rejected, show form with rejection reason
  const showRejectionMessage = kycData && kycData.status === "rejected"

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification</CardTitle>
          <CardDescription>
            {kycData ? "Update your KYC information" : "Submit your identity verification"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showRejectionMessage && kycData.reviewerComment && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Verification Rejected</AlertTitle>
              <AlertDescription className="text-red-700">{kycData.reviewerComment}</AlertDescription>
            </Alert>
          )}

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Textarea
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">ID Verification</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleSelectChange("idType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Passport">Passport</SelectItem>
                      <SelectItem value="National ID">National ID</SelectItem>
                      <SelectItem value="Driver's License">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idFront">ID Front</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("idFront")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Front
                    </Button>
                    <Input
                      id="idFront"
                      name="idFront"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "front")}
                      className="hidden"
                    />
                  </div>
                  {idFrontFile && <p className="text-sm mt-1">{idFrontFile.name}</p>}
                  {formData.idFront && !idFrontFile && <p className="text-sm mt-1">ID front already uploaded</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idBack">ID Back</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("idBack")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Back
                    </Button>
                    <Input
                      id="idBack"
                      name="idBack"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "back")}
                      className="hidden"
                    />
                  </div>
                  {idBackFile && <p className="text-sm mt-1">{idBackFile.name}</p>}
                  {formData.idBack && !idBackFile && <p className="text-sm mt-1">ID back already uploaded</p>}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : kycData ? "Update KYC Information" : "Submit KYC Verification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
