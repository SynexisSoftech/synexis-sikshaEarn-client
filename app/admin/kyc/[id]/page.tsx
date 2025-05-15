"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, X } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

interface KycData {
  _id: string
  userId: string
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

export default function KycDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [kycData, setKycData] = useState<KycData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [reviewerComment, setReviewerComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchKycData()
  }, [params.id])

  const fetchKycData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/kyc/${params.id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch KYC data")
      }

      const data = await response.json()
      setKycData(data.data)

      if (data.data.reviewerComment) {
        setReviewerComment(data.data.reviewerComment)
      }
    } catch (err) {
      console.error("Error fetching KYC data:", err)
      setError("Failed to load KYC data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    setError("")
    setSuccess("")
    setSubmitting(true)

    try {
      const response = await fetch(`/api/admin/kyc/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          reviewerComment: status === "rejected" ? reviewerComment : undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${status} KYC verification`)
      }

      const data = await response.json()
      setKycData(data.data)
      setSuccess(`KYC verification ${status} successfully!`)
    } catch (err: any) {
      console.error(`Error ${status} KYC:`, err)
      setError(err.message || `Failed to ${status} KYC verification. Please try again.`)
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
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

  if (!kycData) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">KYC verification not found.</AlertDescription>
            </Alert>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => router.push("/admin/kyc")}>Back to List</Button>
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>KYC Verification Details</CardTitle>
              <CardDescription>Review user identity verification</CardDescription>
            </div>
            <div>{getStatusBadge(kycData.status)}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{kycData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{format(new Date(kycData.dateOfBirth), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium">{kycData.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{kycData.gender}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Address</h3>
            <p className="mt-1 font-medium">{kycData.fullAddress}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">ID Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">ID Type</p>
                <p className="font-medium">{kycData.idType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="font-medium">{kycData.idNumber}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">ID Documents</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500 mb-2">ID Front</p>
                <div className="border rounded-md overflow-hidden">
                  {/* In a real app, this would be the actual image URL */}
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="ID Front"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">ID Back</p>
                <div className="border rounded-md overflow-hidden">
                  {/* In a real app, this would be the actual image URL */}
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="ID Back"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Submission Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Submitted At</p>
                <p className="font-medium">{format(new Date(kycData.submittedAt), "PPP p")}</p>
              </div>
              {kycData.reviewedAt && (
                <div>
                  <p className="text-sm text-gray-500">Reviewed At</p>
                  <p className="font-medium">{format(new Date(kycData.reviewedAt), "PPP p")}</p>
                </div>
              )}
            </div>
          </div>

          {kycData.status === "pending" && (
            <div>
              <h3 className="text-lg font-medium">Review</h3>
              <div className="mt-2">
                <Textarea
                  placeholder="Add comments (required for rejection)"
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/kyc")}>
            Back to List
          </Button>

          {kycData.status === "pending" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                onClick={() => handleStatusUpdate("rejected")}
                disabled={submitting || !reviewerComment}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleStatusUpdate("approved")}
                disabled={submitting}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
