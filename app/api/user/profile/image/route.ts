import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { connectToDatabase } from "@/lib/models/db"
import User from "@/lib/models/user"
import fs from "fs"
import path from "path"

// Handle file upload function
const handleFileUpload = async (file: File | null): Promise<string | null> => {
  if (!file || !(file instanceof File) || file.size === 0) return null

  const uploadDir = path.join(process.cwd(), "public", "uploads")
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const buffer = await file.arrayBuffer()
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
  const filePath = path.join(uploadDir, filename)

  await fs.promises.writeFile(filePath, Buffer.from(buffer))
  return `/uploads/${filename}`
}

// POST - Upload an image
export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 })
    }

    // Process the form data
    const formData = await req.formData()
    const image = formData.get("image") as File | null
    
    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(image.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed" 
      }, { status: 400 })
    }

    // Validate file size (limit to 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (image.size > maxSize) {
      return NextResponse.json({ 
        error: "File size exceeds the 5MB limit" 
      }, { status: 400 })
    }

    // Upload the file
    const filePath = await handleFileUpload(image)
    
    if (!filePath) {
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }

    // Connect to database
    await connectToDatabase()

    // Update user document with new image path
    const updatedUser = await User.findByIdAndUpdate(
      token.sub, // Using the user ID from the token
      { image: filePath },
      { new: true } // Return the updated document
    )

    if (!updatedUser) {
      // Clean up the uploaded file if user update fails
      const relativePath = filePath.replace(/^\/uploads\//, "")
      const fullPath = path.join(process.cwd(), "public", "uploads", relativePath)
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath)
      }
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Profile image updated successfully",
      data: { 
        filePath,
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          image: updatedUser.image
        }
      }
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE - Remove an uploaded image
export async function DELETE(req: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 })
    }

    // Get the file path from the request
    const { searchParams } = new URL(req.url)
    const filePath = searchParams.get("path")

    if (!filePath) {
      return NextResponse.json({ error: "File path is required" }, { status: 400 })
    }

    // Ensure the path is within the uploads directory for security
    const relativePath = filePath.replace(/^\/uploads\//, "")
    const fullPath = path.join(process.cwd(), "public", "uploads", relativePath)
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Connect to database
    await connectToDatabase()

    // Update user document to remove image reference
    const updatedUser = await User.findByIdAndUpdate(
      token.sub,
      { $unset: { image: 1 } }, // Remove the image field
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete the file after successful database update
    await fs.promises.unlink(fullPath)

    return NextResponse.json({
      success: true,
      message: "Profile image removed successfully",
      data: {
        user: {
          id: updatedUser._id,
          email: updatedUser.email
        }
      }
    })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}