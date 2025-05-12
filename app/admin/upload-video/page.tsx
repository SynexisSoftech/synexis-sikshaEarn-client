"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Loader2,
  Package,
  Video,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  ListPlus,
  Upload,
  X,
  FileVideo,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Course {
  _id: string
  title: string
  videoPlaylist: string[]
}

interface PackageData {
  _id: string
  category: string
  price: number
  description: string
  courseRefs: Course[]
  image: string | null
}

interface VideoInput {
  url: string
  title: string
  description: string
}

export default function ContentUploadPage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [videoInputs, setVideoInputs] = useState<VideoInput[]>([{ url: "", title: "", description: "" }])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<string>("single")
  const [batchVideoUrls, setBatchVideoUrls] = useState<string>("")

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get("/api/admin/package")
        if (response.data.success) {
          setPackages(response.data.data)

          // Initialize expanded state for all courses
          const expanded: Record<string, boolean> = {}
          response.data.data.forEach((pkg: PackageData) => {
            pkg.courseRefs.forEach((course) => {
              expanded[course._id] = false
            })
          })
          setExpandedCourses(expanded)
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

    fetchPackages()
  }, [])

  // Get current package
  const currentPackage = packages.find((pkg) => pkg._id === selectedPackage)

  // Get current course
  const currentCourse = currentPackage?.courseRefs.find((course) => course._id === selectedCourse)

  // Add a new video input field
  const addVideoInput = () => {
    setVideoInputs([...videoInputs, { url: "", title: "", description: "" }])
  }

  // Remove a video input field
  const removeVideoInput = (index: number) => {
    const newInputs = [...videoInputs]
    newInputs.splice(index, 1)
    setVideoInputs(newInputs)
  }

  // Update a video input field
  const updateVideoInput = (index: number, field: keyof VideoInput, value: string) => {
    const newInputs = [...videoInputs]
    newInputs[index][field] = value
    setVideoInputs(newInputs)
  }

  // Handle adding videos (single or multiple)
  const handleAddVideos = async () => {
    if (!selectedCourse) {
      setError("Please select a course")
      return
    }

    // For single mode, check if there are any videos to add
    if (activeTab === "single" && !videoInputs.some((input) => input.url.trim() !== "")) {
      setError("Please enter at least one video URL")
      return
    }

    // For batch mode, check if there are any videos to add
    if (activeTab === "batch" && batchVideoUrls.trim() === "") {
      setError("Please enter video URLs")
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      let videosToAdd: string[] = []

      // Process videos based on active tab
      if (activeTab === "single") {
        // Filter out empty URLs
        videosToAdd = videoInputs.filter((input) => input.url.trim() !== "").map((input) => input.url.trim())
      } else {
        // Process batch URLs (split by newlines)
        videosToAdd = batchVideoUrls
          .split("\n")
          .map((url) => url.trim())
          .filter((url) => url !== "")
      }

      if (videosToAdd.length === 0) {
        setError("Please enter at least one valid video URL")
        setIsSaving(false)
        return
      }

      // Add videos one by one
      const successfullyAdded: string[] = []
      const failedToAdd: string[] = []

      for (const videoUrl of videosToAdd) {
        try {
          const response = await axios.post("/api/admin/course-video", {
            courseId: selectedCourse,
            videoUrl,
          })

          if (response.data.success) {
            successfullyAdded.push(videoUrl)
          } else {
            failedToAdd.push(videoUrl)
          }
        } catch (err) {
          console.error("Error adding video:", videoUrl, err)
          failedToAdd.push(videoUrl)
        }
      }

      // Update local state with the new videos
      if (successfullyAdded.length > 0) {
        setPackages((prevPackages) => {
          return prevPackages.map((pkg) => {
            if (pkg._id === selectedPackage) {
              return {
                ...pkg,
                courseRefs: pkg.courseRefs.map((course) => {
                  if (course._id === selectedCourse) {
                    return {
                      ...course,
                      videoPlaylist: [...course.videoPlaylist, ...successfullyAdded],
                    }
                  }
                  return course
                }),
              }
            }
            return pkg
          })
        })
      }

      // Show success/error message
      if (failedToAdd.length === 0) {
        setSuccess(`Successfully added ${successfullyAdded.length} video${successfullyAdded.length !== 1 ? "s" : ""}!`)
        // Reset form
        setVideoInputs([{ url: "", title: "", description: "" }])
        setBatchVideoUrls("")
      } else if (successfullyAdded.length === 0) {
        setError(`Failed to add any videos. Please try again.`)
      } else {
        setSuccess(
          `Added ${successfullyAdded.length} video${successfullyAdded.length !== 1 ? "s" : ""} successfully. ${failedToAdd.length} failed.`,
        )
        // Reset form
        setVideoInputs([{ url: "", title: "", description: "" }])
        setBatchVideoUrls("")
      }
    } catch (err: any) {
      console.error("Error adding videos:", err)
      setError(err.response?.data?.error || err.message || "Failed to add videos")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle removing a video
  const handleRemoveVideo = async (courseId: string, videoIndex: number) => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axios.delete("/api/admin/course-video", {
        data: {
          courseId,
          videoIndex,
        },
      })

      if (response.data.success) {
        // Update local state
        setPackages((prevPackages) => {
          return prevPackages.map((pkg) => {
            return {
              ...pkg,
              courseRefs: pkg.courseRefs.map((course) => {
                if (course._id === courseId) {
                  const updatedPlaylist = [...course.videoPlaylist]
                  updatedPlaylist.splice(videoIndex, 1)
                  return {
                    ...course,
                    videoPlaylist: updatedPlaylist,
                  }
                }
                return course
              }),
            }
          })
        })

        setSuccess("Video removed successfully!")
      } else {
        throw new Error(response.data.error || "Failed to remove video")
      }
    } catch (err: any) {
      console.error("Error removing video:", err)
      setError(err.response?.data?.error || err.message || "Failed to remove video")
    } finally {
      setIsSaving(false)
    }
  }

  // Toggle course expansion
  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }))
  }

  // Format video URL for display
  const formatVideoUrl = (url: string) => {
    if (url.length > 50) {
      return url.substring(0, 47) + "..."
    }
    return url
  }

  // Get video thumbnail from YouTube URL
  const getYouTubeThumbnail = (url: string) => {
    try {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
      )?.[1]
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error)
    }
    return "/placeholder.svg?height=120&width=200"
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Content Management</h1>
        <p className="text-gray-600">Upload and manage video content for your courses</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Package and Course Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Package & Course</CardTitle>
              <CardDescription>Choose a package and course to add videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="package">Package</Label>
                    <Select
                      value={selectedPackage}
                      onValueChange={(value) => {
                        setSelectedPackage(value)
                        setSelectedCourse("")
                      }}
                    >
                      <SelectTrigger id="package">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg._id} value={pkg._id}>
                            {pkg.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPackage && (
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentPackage?.courseRefs.map((course) => (
                            <SelectItem key={course._id} value={course._id}>
                              {course.title}
                              {course.videoPlaylist.length > 0 && ` (${course.videoPlaylist.length} videos)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedCourse && (
                    <div className="space-y-4 pt-4 border-t mt-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Add Videos</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {currentCourse?.videoPlaylist.length || 0} videos in course
                        </Badge>
                      </div>

                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-2 mb-4">
                          <TabsTrigger value="single" className="flex items-center gap-1">
                            <FileVideo className="h-4 w-4" />
                            <span>Individual</span>
                          </TabsTrigger>
                          <TabsTrigger value="batch" className="flex items-center gap-1">
                            <ListPlus className="h-4 w-4" />
                            <span>Batch</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="single" className="space-y-4">
                          {videoInputs.map((input, index) => (
                            <div key={index} className="space-y-3 p-3 border rounded-md bg-gray-50">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Video {index + 1}</h4>
                                {videoInputs.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => removeVideoInput(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`videoUrl-${index}`}>Video URL</Label>
                                <Input
                                  id={`videoUrl-${index}`}
                                  placeholder="https://youtube.com/watch?v=..."
                                  value={input.url}
                                  onChange={(e) => updateVideoInput(index, "url", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`videoTitle-${index}`}>Title (Optional)</Label>
                                <Input
                                  id={`videoTitle-${index}`}
                                  placeholder="Introduction to Digital Marketing"
                                  value={input.title}
                                  onChange={(e) => updateVideoInput(index, "title", e.target.value)}
                                />
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" className="w-full flex items-center gap-2" onClick={addVideoInput}>
                            <Plus className="h-4 w-4" />
                            Add Another Video
                          </Button>
                        </TabsContent>

                        <TabsContent value="batch" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="batchUrls">Video URLs (one per line)</Label>
                            <Textarea
                              id="batchUrls"
                              placeholder="https://youtube.com/watch?v=video1&#10;https://youtube.com/watch?v=video2&#10;https://youtube.com/watch?v=video3"
                              value={batchVideoUrls}
                              onChange={(e) => setBatchVideoUrls(e.target.value)}
                              rows={6}
                              className="font-mono text-sm"
                            />
                            <p className="text-xs text-gray-500">Enter one video URL per line</p>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Button onClick={handleAddVideos} disabled={isSaving || !selectedCourse} className="w-full">
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {activeTab === "single"
                              ? `Add ${videoInputs.filter((i) => i.url.trim() !== "").length || "0"} Video${videoInputs.filter((i) => i.url.trim() !== "").length !== 1 ? "s" : ""}`
                              : `Add ${batchVideoUrls.split("\n").filter((url) => url.trim() !== "").length || "0"} Video${batchVideoUrls.split("\n").filter((url) => url.trim() !== "").length !== 1 ? "s" : ""}`}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Course Content Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Content Overview</CardTitle>
              <CardDescription>View and manage videos for all courses</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No packages found. Create packages first.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {packages.map((pkg) => (
                    <AccordionItem key={pkg._id} value={pkg._id}>
                      <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-md">
                        <div className="flex items-center">
                          <span className="font-medium">{pkg.category} Package</span>
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {pkg.courseRefs.length} courses
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pl-4">
                          {pkg.courseRefs.map((course) => (
                            <div key={course._id} className="border rounded-md overflow-hidden">
                              <div
                                className={`flex justify-between items-center p-4 cursor-pointer ${selectedCourse === course._id ? "bg-blue-50" : "bg-gray-50"}`}
                                onClick={() => toggleCourseExpansion(course._id)}
                              >
                                <div className="font-medium flex items-center">
                                  {course.title}
                                  {selectedCourse === course._id && (
                                    <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                      Selected
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                                    {course.videoPlaylist.length} videos
                                  </span>
                                  {expandedCourses[course._id] ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedCourses[course._id] && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="p-4 border-t">
                                      {course.videoPlaylist.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">
                                          <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                          <p>No videos added yet</p>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => {
                                              setSelectedPackage(pkg._id)
                                              setSelectedCourse(course._id)
                                            }}
                                          >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add Videos
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="space-y-3">
                                          {course.videoPlaylist.map((videoUrl, index) => (
                                            <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                                              <div className="h-16 w-28 flex-shrink-0 mr-3 overflow-hidden rounded-md">
                                                <img
                                                  src={getYouTubeThumbnail(videoUrl) || "/placeholder.svg"}
                                                  alt="Video thumbnail"
                                                  className="h-full w-full object-cover"
                                                  onError={(e) => {
                                                    ;(e.target as HTMLImageElement).src =
                                                      "/placeholder.svg?height=120&width=200"
                                                  }}
                                                />
                                              </div>
                                              <div className="flex-grow">
                                                <div className="text-sm font-medium mb-1 break-all">
                                                  {formatVideoUrl(videoUrl)}
                                                </div>
                                                <div className="text-xs text-gray-500">Video {index + 1}</div>
                                              </div>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleRemoveVideo(course._id, index)}
                                                disabled={isSaving}
                                              >
                                                {isSaving ? (
                                                  <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                  <Trash2 className="h-4 w-4" />
                                                )}
                                              </Button>
                                            </div>
                                          ))}

                                          <div className="flex justify-end pt-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                setSelectedPackage(pkg._id)
                                                setSelectedCourse(course._id)
                                              }}
                                            >
                                              <Plus className="h-4 w-4 mr-1" />
                                              Add More Videos
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
