"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
  Upload,
  DollarSign,
  PackageIcon,
  Save,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Course {
  _id: string
  title: string
  videoPlaylist: string[]
}

interface PackageData {
  _id?: string
  category: string
  price: string | number
  description: string
  courseRefs: Course[]
  image: string | null
}

// Custom Toast Component
interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md shadow-lg p-4 ${
        type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-black hover:bg-opacity-10 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export default function PackagePage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Form states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPackage, setCurrentPackage] = useState<PackageData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form data
  const [formData, setFormData] = useState<Omit<PackageData, "courseRefs"> & { features: string[] }>({
    category: "",
    price: "",
    description: "",
    features: [""], // Temporary field for form input (course titles)
    image: null,
  })

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Toast functions
  const showSuccessToast = (message: string) => {
    setToast({ message, type: "success" })
  }

  const showErrorToast = (message: string) => {
    setToast({ message, type: "error" })
  }

  const closeToast = () => {
    setToast(null)
  }

  // Fetch packages
  const fetchPackages = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get("/api/admin/package")

      if (response.data.success) {
        setPackages(response.data.data)
      } else {
        throw new Error("Failed to fetch packages")
      }
    } catch (err: any) {
      console.error("Error fetching packages:", err)
      setError("Failed to load packages. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Create package
  const createPackage = async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.category) {
        throw new Error("Package category is required")
      }

      if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        throw new Error("Valid price is required")
      }

      if (!formData.description || formData.description.trim().length < 10) {
        throw new Error("Description must be at least 10 characters")
      }

      // Filter out empty features
      const validFeatures = formData.features.filter((f) => f.trim() !== "")
      if (validFeatures.length === 0) {
        throw new Error("At least one course is required")
      }

      const formDataToSend = new FormData()
      formDataToSend.append("category", formData.category)
      formDataToSend.append("price", formData.price.toString())
      formDataToSend.append("description", formData.description)

      // Append only valid features
      validFeatures.forEach((feature) => {
        formDataToSend.append("features", feature)
      })

      if (selectedFile) {
        formDataToSend.append("image", selectedFile)
      }

      const response = await axios.post("/api/admin/package", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        showSuccessToast("Package created successfully")
        fetchPackages()
        resetForm()
        setIsAddDialogOpen(false)
      } else {
        throw new Error(response.data.error || "Failed to create package")
      }
    } catch (err: any) {
      console.error("Error creating package:", err)
      showErrorToast(err.response?.data?.error || err.message || "Failed to create package")
    } finally {
      setIsSaving(false)
    }
  }

  // Update package
  const updatePackage = async () => {
    if (!currentPackage) return

    setIsSaving(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        throw new Error("Valid price is required")
      }

      if (!formData.description || formData.description.trim().length < 10) {
        throw new Error("Description must be at least 10 characters")
      }

      const validFeatures = formData.features.filter((f) => f.trim() !== "")
      if (validFeatures.length === 0) {
        throw new Error("At least one course is required")
      }

      // If there's a new image or we need to update multiple fields, use FormData
      if (selectedFile) {
        const formDataToSend = new FormData()
        formDataToSend.append("category", currentPackage.category)
        formDataToSend.append("price", formData.price.toString())
        formDataToSend.append("description", formData.description)

        // Append features (course titles)
        validFeatures.forEach((feature) => {
          formDataToSend.append("features", feature)
        })

        formDataToSend.append("image", selectedFile)

        const response = await axios.patch("/api/admin/package", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.data.success) {
          showSuccessToast("Package updated successfully")
          fetchPackages()
          resetForm()
          setIsEditDialogOpen(false)
        } else {
          throw new Error(response.data.error || "Failed to update package")
        }
      } else {
        // If no new image, use regular JSON
        const dataToSend = {
          category: currentPackage.category,
          price: Number(formData.price),
          description: formData.description,
          features: validFeatures,
        }

        const response = await axios.put("/api/admin/package", dataToSend)

        if (response.data.success) {
          showSuccessToast("Package updated successfully")
          fetchPackages()
          resetForm()
          setIsEditDialogOpen(false)
        } else {
          throw new Error(response.data.error || "Failed to update package")
        }
      }
    } catch (err: any) {
      console.error("Error updating package:", err)
      showErrorToast(err.response?.data?.error || err.message || "Failed to update package")
    } finally {
      setIsSaving(false)
    }
  }

  // Delete package
  const deletePackage = async () => {
    if (!currentPackage) return

    setIsSaving(true)
    setError(null)

    try {
      const response = await axios.delete("/api/admin/package", {
        data: { category: currentPackage.category },
      })

      if (response.data.success) {
        showSuccessToast("Package deleted successfully")
        fetchPackages()
        setIsDeleteDialogOpen(false)
        setCurrentPackage(null)
      } else {
        throw new Error(response.data.error || "Failed to delete package")
      }
    } catch (err: any) {
      console.error("Error deleting package:", err)
      showErrorToast(err.response?.data?.error || err.message || "Failed to delete package")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (field: keyof typeof formData, value: string | number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle feature changes
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    handleInputChange("features", updatedFeatures)
  }

  // Add feature field
  const addFeature = () => {
    handleInputChange("features", [...formData.features, ""])
  }

  // Remove feature field
  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    handleInputChange("features", updatedFeatures)
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (pkg: PackageData) => {
    setCurrentPackage(pkg)
    setFormData({
      category: pkg.category,
      price: pkg.price,
      description: pkg.description,
      features: pkg.courseRefs.map((course) => course.title) || [""], // Convert courseRefs to titles
      image: pkg.image,
    })
    setPreviewUrl(pkg.image ? pkg.image : null)
    setSelectedFile(null)
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (pkg: PackageData) => {
    setCurrentPackage(pkg)
    setIsDeleteDialogOpen(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      category: "",
      price: "",
      description: "",
      features: [""],
      image: null,
    })
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Open add dialog
  const openAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  // Format price
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return !isNaN(numPrice) ? `$${numPrice.toFixed(2)}` : "$0.00"
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchPackages()
  }, [])

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Packages</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchPackages}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-md" />
              ))}
            </div>
          ) : (
            <>
              {/* Empty state */}
              {packages.length === 0 ? (
                <div className="text-center py-12 border rounded-md bg-slate-50">
                  <PackageIcon className="h-12 w-12 mx-auto text-slate-400" />
                  <p className="text-slate-500 mt-4 mb-6">No packages found</p>
                  <Button onClick={openAddDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Package
                  </Button>
                </div>
              ) : (
                /* Package grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <Card key={pkg._id} className="overflow-hidden flex flex-col">
                      {pkg.image && (
                        <div className="h-40 overflow-hidden bg-slate-100">
                          <img
                            src={pkg.image || "/placeholder.svg?height=160&width=320"}
                            alt={pkg.category}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=160&width=320"
                            }}
                          />
                        </div>
                      )}
                      <CardContent className="p-4 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{pkg.category}</h3>
                          <div className="font-bold text-lg text-green-600">{formatPrice(pkg.price)}</div>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
                        {pkg.courseRefs && pkg.courseRefs.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Courses Included:</h4>
                            <ul className="text-sm space-y-1">
                              {pkg.courseRefs.map((course) => (
                                <li key={course._id} className="flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  <span>{course.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(pkg)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => openDeleteDialog(pkg)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Package</DialogTitle>
            <DialogDescription>Create a new package with details and courses.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="Heroic">Heroic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="99.99"
                  className="pl-9"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the package"
                rows={3}
                required
              />
              <p className="text-xs text-slate-500">Minimum 10 characters</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Courses</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-8">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Course
                </Button>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Course title ${index + 1}`}
                      required
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Package Image</Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {selectedFile ? "Change Image" : "Upload Image"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""
                        }
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createPackage} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Package
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Package Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>Update the details for {currentPackage?.category} package.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input id="edit-category" value={currentPackage?.category || ""} disabled className="bg-slate-50" />
              <p className="text-xs text-slate-500">Category cannot be changed. Create a new package instead.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="99.99"
                  className="pl-9"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the package"
                rows={3}
                required
              />
              <p className="text-xs text-slate-500">Minimum 10 characters</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Courses</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-8">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Course
                </Button>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Course title ${index + 1}`}
                      required
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Package Image</Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {selectedFile ? "Change Image" : "Change Image"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setSelectedFile(null)
                        // If we're editing and there was an existing image, keep it
                        setPreviewUrl(currentPackage?.image || null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""
                        }
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updatePackage} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Package
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {currentPackage?.category} package? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deletePackage} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Package
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      </AnimatePresence>
    </div>
  )
}
