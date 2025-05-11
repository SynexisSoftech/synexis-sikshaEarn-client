"use client"

import { useState, useEffect } from "react"
import { Trash2, Search, Filter, RefreshCw, AlertCircle, CheckCircle, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactQuery {
  id: string
  name: string
  email: string
  subject: string
  inquiryType: string
  message: string
  createdAt: string
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
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

export default function ContactQueriesPage() {
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([])
  const [filteredQueries, setFilteredQueries] = useState<ContactQuery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [queryToDelete, setQueryToDelete] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

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

  // Fetch contact queries
 const fetchContactQueries = async () => {
  setIsLoading(true)
  setError(null)

  try {
    const response = await fetch("/api/admin/contact")

    if (!response.ok) {
      throw new Error("Failed to fetch contact queries")
    }

    const data = await response.json()
    console.log("Fetched contact queries:", data)

    // Set both the main and filtered queries state
    setContactQueries(data)
    setFilteredQueries(data)
    
  } catch (err) {
    console.error("Error fetching contact queries:", err)
    setError(err instanceof Error ? err.message : "An unknown error occurred")
    
    // For demo purposes, you might want to use mock data when API fails
    const mockData: ContactQuery[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        subject: "Technical Issue",
        inquiryType: "Technical Support",
        message: "I'm having trouble with the dashboard",
        createdAt: new Date().toISOString()
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Billing Question",
        inquiryType: "Billing",
        message: "Can you explain my last invoice?",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]
    setContactQueries(mockData)
    setFilteredQueries(mockData)
    
  } finally {
    setIsLoading(false)
  }
}

  // Delete contact query
  const deleteContactQuery = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete contact query")
      }

      // Remove the deleted query from state
      setContactQueries((prev) => prev.filter((query) => query.id !== id))
      setFilteredQueries((prev) => prev.filter((query) => query.id !== id))

      showSuccessToast("Contact query deleted successfully")
    } catch (err) {
      console.error("Error deleting contact query:", err)
      showErrorToast(err instanceof Error ? err.message : "Failed to delete contact query")

      // For demo purposes, remove from state even if API fails
      setContactQueries((prev) => prev.filter((query) => query.id !== id))
      setFilteredQueries((prev) => prev.filter((query) => query.id !== id))
    }
  }

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setQueryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (queryToDelete) {
      deleteContactQuery(queryToDelete)
      setDeleteDialogOpen(false)
      setQueryToDelete(null)
    }
  }

  // Apply filters
  const applyFilters = () => {
    let filtered = contactQueries

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (query) =>
          query.name.toLowerCase().includes(term) ||
          query.email.toLowerCase().includes(term) ||
          query.subject.toLowerCase().includes(term) ||
          query.message.toLowerCase().includes(term),
      )
    }

    // Apply inquiry type filter
    if (inquiryTypeFilter !== "all") {
      filtered = filtered.filter((query) => query.inquiryType === inquiryTypeFilter)
    }

    setFilteredQueries(filtered)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setInquiryTypeFilter("all")
    setFilteredQueries(contactQueries)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get inquiry type badge color
  const getInquiryTypeBadge = (type: string) => {
    switch (type) {
      case "Technical Support":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Technical Support
          </Badge>
        )
      case "Billing":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Billing
          </Badge>
        )
      case "Feedback":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Feedback
          </Badge>
        )
      case "Affiliate":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Affiliate
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
            {type}
          </Badge>
        )
    }
  }

  // Truncate long text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchContactQueries()
  }, [])

  // Apply filters when search term or inquiry type filter changes
  useEffect(() => {
    applyFilters()
  }, [searchTerm, inquiryTypeFilter])

  // Get unique inquiry types for filter dropdown
  const uniqueInquiryTypes = Array.from(new Set(contactQueries.map((query) => query.inquiryType)))

  // Render desktop table
  const renderDesktopTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Email</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Subject</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Message</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
              <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.map((query, index) => (
              <tr key={query.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <td className="py-3 px-4">{query.name}</td>
                <td className="py-3 px-4">{query.email}</td>
                <td className="py-3 px-4">{truncateText(query.subject, 30)}</td>
                <td className="py-3 px-4">{getInquiryTypeBadge(query.inquiryType)}</td>
                <td className="py-3 px-4">{truncateText(query.message, 50)}</td>
                <td className="py-3 px-4">{formatDate(query.createdAt)}</td>
                <td className="py-3 px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(query.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Render mobile cards
  const renderMobileCards = () => {
    return (
      <div className="space-y-4">
        {filteredQueries.map((query) => (
          <Card key={query.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{query.name}</h3>
                    <p className="text-sm text-slate-500">{query.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(query.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Subject:</span>
                    <span className="text-xs text-slate-500">{formatDate(query.createdAt)}</span>
                  </div>
                  <p className="text-sm">{query.subject}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Type:</span>
                  <div className="mt-1">{getInquiryTypeBadge(query.inquiryType)}</div>
                </div>
                <div>
                  <span className="font-medium text-sm">Message:</span>
                  <p className="text-sm mt-1 bg-slate-50 p-2 rounded-md border">{truncateText(query.message, 150)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Contact Queries</CardTitle>
                <CardDescription>Manage and respond to user inquiries and contact form submissions</CardDescription>
              </div>
              <Button onClick={fetchContactQueries} variant="outline" size="sm" className="w-full md:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, subject or message..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={inquiryTypeFilter} onValueChange={setInquiryTypeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueInquiryTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset filters">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Loading state */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <>
                {/* Empty state */}
                {filteredQueries.length === 0 ? (
                  <div className="text-center py-12 border rounded-md bg-slate-50">
                    <p className="text-slate-500 mb-4">No contact queries found</p>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  /* Responsive table/cards */
                  <div className="mt-4">{isMobile ? renderMobileCards() : renderDesktopTable()}</div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact Query</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact query? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      </AnimatePresence>
    </>
  )
}
