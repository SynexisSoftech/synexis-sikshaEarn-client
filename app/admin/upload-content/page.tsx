// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import {
//   Upload,
//   Trash2,
//   AlertCircle,
//   CheckCircle,
//   Loader2,
//   VideoIcon,
//   ExternalLink,
//   Search,
//   Filter,
// } from "lucide-react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"

// interface Video {
//   _id: string
//   title: string
//   url: string
//   description?: string
//   packageCategory: string
//   feature?: string
//   course: {
//     _id: string
//     title: string
//   }
//   createdAt?: string
// }

// interface PackageType {
//   _id: string
//   category: string
//   features: string[]
//   description?: string
//   price?: number
//   image?: string
// }

// export default function UploadContentPage() {
//   const [packages, setPackages] = useState<PackageType[]>([])
//   const [selectedPackage, setSelectedPackage] = useState("")
//   const [features, setFeatures] = useState<string[]>([])
//   const [selectedFeature, setSelectedFeature] = useState("")
//   const [formData, setFormData] = useState({
//     title: "",
//     url: "",
//     description: "",
//   })
//   const [videos, setVideos] = useState<Video[]>([])
//   const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
//   const [isLoading, setIsLoading] = useState({
//     packages: false,
//     videos: false,
//     submit: false,
//     delete: false,
//   })
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterPackage, setFilterPackage] = useState("")
//   const [notification, setNotification] = useState<{
//     type: "success" | "error"
//     message: string
//   } | null>(null)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [videoToDelete, setVideoToDelete] = useState<string | null>(null)
//   const [defaultCourseId, setDefaultCourseId] = useState("")

//   const fetchVideos = async () => {
//     setIsLoading((prev) => ({ ...prev, videos: true }))
//     try {
//       const res = await fetch("/api/admin/upload-content")
//       const data = await res.json()
//       if (Array.isArray(data)) {
//         setVideos(data)
//         setFilteredVideos(data)
//       } else {
//         console.error("Unexpected video data format:", data)
//         setVideos([])
//         setFilteredVideos([])
//       }
//     } catch (error) {
//       console.error("Error fetching videos:", error)
//       showNotification("error", "Failed to load videos")
//     } finally {
//       setIsLoading((prev) => ({ ...prev, videos: false }))
//     }
//   }

//   const fetchPackages = async () => {
//     setIsLoading((prev) => ({ ...prev, packages: true }))
//     try {
//       const res = await fetch("/api/admin/package")
//       const data = await res.json()
//       if (data.success && Array.isArray(data.data)) {
//         setPackages(data.data)
//       } else {
//         console.error("Unexpected package data format:", data)
//         setPackages([])
//       }
//     } catch (error) {
//       console.error("Error fetching packages:", error)
//       setPackages([])
//       showNotification("error", "Failed to load packages")
//     } finally {
//       setIsLoading((prev) => ({ ...prev, packages: false }))
//     }
//   }

//   const fetchDefaultCourse = async () => {
//     try {
//       const res = await fetch("/api/admin/course")
//       const data = await res.json()
//       if (Array.isArray(data) && data.length > 0) {
//         setDefaultCourseId(data[0]._id)
//       } else {
//         console.error("No courses available for default selection")
//         showNotification("error", "No courses available. Please create a course first.")
//       }
//     } catch (error) {
//       console.error("Error fetching default course:", error)
//     }
//   }

//   useEffect(() => {
//     fetchVideos()
//     fetchPackages()
//     fetchDefaultCourse()
//   }, [])

//   useEffect(() => {
//     let results = [...videos]

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       results = results.filter(
//         (video) =>
//           video.title.toLowerCase().includes(term) ||
//           (video.description && video.description.toLowerCase().includes(term)),
//       )
//     }

//     if (filterPackage && filterPackage !== "all") {
//       results = results.filter((video) => video.packageCategory === filterPackage)
//     }

//     setFilteredVideos(results)
//   }, [videos, searchTerm, filterPackage])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handlePackageChange = (value: string) => {
//     setSelectedPackage(value)
//     setSelectedFeature("")

//     const pkg = packages.find((p) => p.category === value)
//     if (pkg) {
//       setFeatures(pkg.features || [])
//     } else {
//       setFeatures([])
//     }
//   }

//   const showNotification = (type: "success" | "error", message: string) => {
//     setNotification({ type, message })
//     setTimeout(() => setNotification(null), 5000)
//   }

//   const resetForm = () => {
//     setFormData({ title: "", url: "", description: "" })
//     setSelectedPackage("")
//     setSelectedFeature("")
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading((prev) => ({ ...prev, submit: true }))

//     try {
//       if (!defaultCourseId) {
//         showNotification("error", "No course available. Please create a course first.")
//         setIsLoading((prev) => ({ ...prev, submit: false }))
//         return
//       }

//       const payload = {
//         ...formData,
//         courseId: defaultCourseId,
//         packageCategory: selectedPackage,
//         feature: selectedFeature,
//       }

//       const res = await fetch("/api/admin/upload-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       })

//       if (res.ok) {
//         showNotification("success", "Video uploaded successfully!")
//         resetForm()
//         fetchVideos()
//       } else {
//         const errorData = await res.json()
//         showNotification("error", errorData.error || "Failed to upload video")
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//       showNotification("error", "An error occurred while submitting the form")
//     } finally {
//       setIsLoading((prev) => ({ ...prev, submit: false }))
//     }
//   }

//   const confirmDelete = (id: string) => {
//     setVideoToDelete(id)
//     setDeleteDialogOpen(true)
//   }

//   const handleDelete = async () => {
//     if (!videoToDelete) return

//     setIsLoading((prev) => ({ ...prev, delete: true }))
//     try {
//       const res = await fetch(`/api/admin/upload-content?id=${videoToDelete}`, {
//         method: "DELETE",
//       })

//       if (res.ok) {
//         showNotification("success", "Video deleted successfully")
//         fetchVideos()
//       } else {
//         const errorData = await res.json()
//         showNotification("error", errorData.error || "Failed to delete video")
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error)
//       showNotification("error", "An error occurred while deleting the video")
//     } finally {
//       setIsLoading((prev) => ({ ...prev, delete: false }))
//       setDeleteDialogOpen(false)
//       setVideoToDelete(null)
//     }
//   }

//   const getYouTubeEmbedUrl = (url: string) => {
//     try {
//       const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//       const match = url.match(regExp)
//       const videoId = match && match[2].length === 11 ? match[2] : null
//       return videoId ? `https://www.youtube.com/embed/${videoId}` : url
//     } catch (e) {
//       return url
//     }
//   }

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "N/A"
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex flex-col space-y-8">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold">Video Content Management</h1>
//         </div>

//         {notification && (
//           <Alert variant={notification.type === "success" ? "default" : "destructive"} className="animate-in fade-in">
//             {notification.type === "success" ? (
//               <CheckCircle className="h-4 w-4" />
//             ) : (
//               <AlertCircle className="h-4 w-4" />
//             )}
//             <AlertTitle>{notification.type === "success" ? "Success" : "Error"}</AlertTitle>
//             <AlertDescription>{notification.message}</AlertDescription>
//           </Alert>
//         )}

//         <Tabs defaultValue="upload" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="upload">Upload New Video</TabsTrigger>
//             <TabsTrigger value="manage">Manage Videos</TabsTrigger>
//           </TabsList>

//           <TabsContent value="upload" className="mt-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upload New Video Content</CardTitle>
//                 <CardDescription>
//                   Add video content for your courses. Videos will be available to users based on their package.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form id="upload-form" onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="package">Package Category</Label>
//                         <Select
//                           value={selectedPackage}
//                           onValueChange={handlePackageChange}
//                           disabled={isLoading.packages || isLoading.submit}
//                           required
//                         >
//                           <SelectTrigger id="package">
//                             <SelectValue placeholder="Select a package" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {isLoading.packages ? (
//                               <div className="flex items-center justify-center p-2">
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 <span>Loading packages...</span>
//                               </div>
//                             ) : packages.length > 0 ? (
//                               packages.map((pkg) => (
//                                 <SelectItem key={pkg._id} value={pkg.category}>
//                                   {pkg.category}
//                                 </SelectItem>
//                               ))
//                             ) : (
//                               <div className="p-2 text-center text-muted-foreground">No packages available</div>
//                             )}
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       {features.length > 0 && (
//                         <div className="space-y-2">
//                           <Label htmlFor="feature">Feature</Label>
//                           <Select
//                             value={selectedFeature}
//                             onValueChange={setSelectedFeature}
//                             disabled={isLoading.submit}
//                             required
//                           >
//                             <SelectTrigger id="feature">
//                               <SelectValue placeholder="Select a feature" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {features.map((feature, index) => (
//                                 <SelectItem key={index} value={feature}>
//                                   {feature}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="title">Video Title</Label>
//                         <Input
//                           id="title"
//                           name="title"
//                           value={formData.title}
//                           onChange={handleChange}
//                           placeholder="Enter video title"
//                           disabled={isLoading.submit}
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="url">Video URL</Label>
//                         <Input
//                           id="url"
//                           name="url"
//                           type="url"
//                           value={formData.url}
//                           onChange={handleChange}
//                           placeholder="https://www.youtube.com/watch?v=..."
//                           disabled={isLoading.submit}
//                           required
//                         />
//                         <p className="text-xs text-muted-foreground">YouTube, Vimeo, or other video hosting URLs</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       placeholder="Enter video description"
//                       rows={4}
//                       disabled={isLoading.submit}
//                     />
//                   </div>
//                 </form>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" onClick={resetForm} disabled={isLoading.submit}>
//                   Reset
//                 </Button>
//                 <Button
//                   type="submit"
//                   form="upload-form"
//                   disabled={
//                     isLoading.submit ||
//                     !selectedPackage ||
//                     !formData.title ||
//                     !formData.url ||
//                     (features.length > 0 && !selectedFeature)
//                   }
//                 >
//                   {isLoading.submit ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Uploading...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="mr-2 h-4 w-4" />
//                       Upload Video
//                     </>
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           <TabsContent value="manage" className="mt-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Manage Video Content</CardTitle>
//                 <CardDescription>View, filter, and manage all uploaded video content.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col md:flex-row gap-4 mb-6">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       placeholder="Search videos..."
//                       className="pl-8"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full md:w-64">
//                     <Select value={filterPackage} onValueChange={setFilterPackage}>
//                       <SelectTrigger>
//                         <div className="flex items-center">
//                           <Filter className="mr-2 h-4 w-4" />
//                           <span>{filterPackage || "Filter by Package"}</span>
//                         </div>
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Packages</SelectItem>
//                         {packages.map((pkg) => (
//                           <SelectItem key={pkg._id} value={pkg.category}>
//                             {pkg.category}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {isLoading.videos ? (
//                   <div className="flex justify-center items-center py-12">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                     <span className="ml-3 text-lg">Loading videos...</span>
//                   </div>
//                 ) : filteredVideos.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredVideos.map((video) => (
//                       <Card key={video._id} className="overflow-hidden flex flex-col">
//                         <div className="aspect-video bg-muted relative group">
//                           <iframe
//                             src={getYouTubeEmbedUrl(video.url)}
//                             className="w-full h-full"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                           ></iframe>
//                         </div>
//                         <CardContent className="p-4 flex-grow">
//                           <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
//                           {video.description && (
//                             <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
//                           )}
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
//                               {video.packageCategory}
//                             </div>
//                             {video.feature && (
//                               <div className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
//                                 {video.feature}
//                               </div>
//                             )}
//                             {video.course && (
//                               <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
//                                 {video.course.title}
//                               </div>
//                             )}
//                           </div>
//                           <div className="text-xs text-muted-foreground mt-3">Added: {formatDate(video.createdAt)}</div>
//                         </CardContent>
//                         <CardFooter className="p-4 pt-0 border-t flex justify-between">
//                           <a
//                             href={video.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm flex items-center text-blue-600 hover:text-blue-800"
//                           >
//                             <ExternalLink className="h-3.5 w-3.5 mr-1" />
//                             View Original
//                           </a>
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             onClick={() => confirmDelete(video._id)}
//                             disabled={isLoading.delete && videoToDelete === video._id}
//                           >
//                             {isLoading.delete && videoToDelete === video._id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </CardFooter>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 border rounded-md bg-muted/20">
//                     <VideoIcon className="h-12 w-12 mx-auto text-muted-foreground" />
//                     <p className="mt-4 text-muted-foreground">
//                       {videos.length > 0 ? "No videos match your search criteria" : "No videos have been uploaded yet"}
//                     </p>
//                     {videos.length === 0 && (
//                       <Button
//                         variant="outline"
//                         className="mt-4"
//                         onClick={() => document.querySelector('[data-value="upload"]')?.click()}
//                       >
//                         <Upload className="mr-2 h-4 w-4" />
//                         Upload Your First Video
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this video? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isLoading.delete}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete} disabled={isLoading.delete}>
//               {isLoading.delete ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Delete Video
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
