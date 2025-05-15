"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Eye } from "lucide-react"

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

export default function AdminKycPage() {
  const router = useRouter()
  const [kycData, setKycData] = useState<KycData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchKycData()
  }, [activeTab])

  const fetchKycData = async () => {
    try {
      setLoading(true)
      const url = activeTab === "all" ? "/api/admin/kyc" : `/api/admin/kyc?status=${activeTab}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch KYC data")
      }

      const data = await response.json()
      setKycData(data.data)
    } catch (err) {
      console.error("Error fetching KYC data:", err)
      setError("Failed to load KYC data. Please try again.")
    } finally {
      setLoading(false)
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

  const viewKycDetails = (id: string) => {
    router.push(`/admin/kyc/${id}`)
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification Management</CardTitle>
          <CardDescription>Review and manage user KYC verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {loading ? (
                <div className="flex justify-center py-10">
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <div className="text-red-500 py-4">{error}</div>
              ) : kycData.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No KYC verifications found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ID Type</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kycData.map((kyc) => (
                      <TableRow key={kyc._id}>
                        <TableCell className="font-medium">{kyc.fullName}</TableCell>
                        <TableCell>{kyc.idType}</TableCell>
                        <TableCell>{format(new Date(kyc.submittedAt), "PPP")}</TableCell>
                        <TableCell>{getStatusBadge(kyc.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => viewKycDetails(kyc._id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
