"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Check, AlertCircle, FileText } from "lucide-react"

export default function KYCPage() {
  const [kycStatus, setKycStatus] = useState<"pending" | "verified" | "rejected" | "not-submitted">("not-submitted")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const submitKYC = () => {
    setKycStatus("pending")
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs defaultValue="verification" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="verification">KYC Verification</TabsTrigger>
            <TabsTrigger value="status">Verification Status</TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="mt-0 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <CardDescription>Please provide your personal details for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per documents)</Label>
                    <Input id="fullName" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nepal">Nepal</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" placeholder="Enter your full address" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Identity Verification</CardTitle>
                <CardDescription>Upload documents to verify your identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                      <SelectItem value="national">National ID Card</SelectItem>
                      <SelectItem value="voter">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input id="idNumber" placeholder="Enter your ID number" />
                </div>

                <div className="space-y-2">
                  <Label>Upload ID Front</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-indigo-500" />
                      <div className="font-medium">Click to upload or drag and drop</div>
                      <div className="text-xs text-slate-500">SVG, PNG, JPG or PDF (max. 5MB)</div>
                      <Input
                        type="file"
                        className="hidden"
                        id="frontId"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById("frontId")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload ID Back</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-indigo-500" />
                      <div className="font-medium">Click to upload or drag and drop</div>
                      <div className="text-xs text-slate-500">SVG, PNG, JPG or PDF (max. 5MB)</div>
                      <Input
                        type="file"
                        className="hidden"
                        id="backId"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById("backId")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="border rounded-lg divide-y">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-indigo-500" />
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-xs text-slate-500">{file.size}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={submitKYC}>
                    Submit for Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="mt-0 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Verification Status</CardTitle>
                <CardDescription>Check the status of your KYC verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {kycStatus === "not-submitted" && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle className="h-16 w-16 text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No KYC Submitted</h3>
                    <p className="text-slate-500 mb-6">You haven't submitted your KYC verification yet.</p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => document.getElementById("verification-tab")?.click()}
                    >
                      Start Verification
                    </Button>
                  </div>
                )}

                {kycStatus === "pending" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">Verification In Progress</h3>
                        <p className="text-amber-700 mb-4">
                          Your KYC verification is currently being reviewed by our team. This process typically takes
                          1-3 business days.
                        </p>
                        <div className="text-sm text-amber-600">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Submission Date:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Estimated Completion:</span>
                            <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {kycStatus === "verified" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Verification Successful</h3>
                        <p className="text-green-700 mb-4">
                          Your KYC verification has been successfully completed. You now have full access to all
                          platform features.
                        </p>
                        <div className="text-sm text-green-600">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Verification Date:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Valid Until:</span>
                            <span>{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {kycStatus === "rejected" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Verification Failed</h3>
                        <p className="text-red-700 mb-4">
                          Unfortunately, your KYC verification was not successful. Please review the feedback below and
                          resubmit.
                        </p>
                        <div className="bg-white border border-red-100 rounded-md p-3 mb-4">
                          <div className="font-medium text-red-800 mb-1">Reason for Rejection:</div>
                          <div className="text-red-700">
                            The uploaded document is not clearly visible. Please upload a higher quality image.
                          </div>
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">Resubmit Verification</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
