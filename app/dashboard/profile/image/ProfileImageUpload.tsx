"use client"

import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function ProfileImageUpload() {
  const { data: session, update } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  // Initialize with the user's current image from session
  useEffect(() => {
    if (session?.user?.image) {
      // Ensure the image path is properly formatted
      const imagePath = session.user.image.startsWith('/uploads/') 
        ? session.user.image 
        : `/uploads/${session.user.image}`
      setCurrentImage(imagePath)
    } else {
      setCurrentImage(null)
    }
  }, [session])

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(null)
    
    const file = e.target.files?.[0] || null
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed")
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds the 5MB limit")
      return
    }

    setSelectedFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Upload the selected file
  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/user/profile/image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setSuccess('Profile image updated successfully!')
      setSelectedFile(null)
      setCurrentImage(data.data.filePath)
      if (fileInputRef.current) fileInputRef.current.value = ''
      
      // Update session to reflect the new image
      await update({
        ...session,
        user: {
          ...session?.user,
          image: data.data.filePath
        }
      })
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
      // Reset file selection on error
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } finally {
      setIsUploading(false)
    }
  }

  // Delete the current profile image
  const handleDelete = async () => {
    if (!currentImage) return

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      // Extract just the filename from the path
      const filename = currentImage.split('/').pop()
      const response = await fetch(`/api/user/profile?path=${filename}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete image')
      }

      setSuccess('Profile image removed successfully!')
      setPreviewUrl(null)
      setCurrentImage(null)
      
      // Update session to remove the image
      await update({
        ...session,
        user: {
          ...session?.user,
          image: null
        }
      })
    } catch (err) {
      console.error('Delete error:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete image')
    } finally {
      setIsUploading(false)
    }
  }

  // Determine what to show as the current image
  const displayImageUrl = previewUrl || currentImage || '/default-profile.png'

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
      
      {/* Current Image Preview */}
      <div className="mb-4 flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
          <Image
            src={displayImageUrl}
            alt="Profile preview"
            fill
            className="object-cover"
            sizes="128px"
            priority
          />
        </div>
        {currentImage && !selectedFile && (
          <span className="text-sm text-gray-500">
            Current profile image
          </span>
        )}
        {selectedFile && (
          <span className="text-sm text-blue-600">
            New image selected
          </span>
        )}
      </div>

      {/* File Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {currentImage ? 'Change profile image' : 'Upload profile image'}
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/gif, image/webp"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={isUploading}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* Upload Button (shown when file is selected) */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Update Profile Image'}
          </button>
        )}

        {/* Delete Button (shown when there's an existing image and no new file selected) */}
        {currentImage && !selectedFile && (
          <button
            onClick={handleDelete}
            disabled={isUploading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-red-300 transition-colors duration-200"
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Removing...
              </span>
            ) : 'Remove Profile Image'}
          </button>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-start">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>{success}</span>
        </div>
      )}
    </div>
  )
}