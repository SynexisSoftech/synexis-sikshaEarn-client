import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import Package from "@/lib/models/package"
import Course from "@/lib/models/course"
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

// Delete image function
const deleteImage = (imagePath: string) => {
  if (!imagePath) return
  const filePath = path.join(process.cwd(), "public", imagePath)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

// GET all packages
export async function GET() {
  await connectToDatabase()
  try {
    const packages = await Package.find({}).sort({ category: 1 }).populate("courseRefs")
    return NextResponse.json({ success: true, data: packages })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// CREATE new package
export async function POST(req: NextRequest) {
  await connectToDatabase()

  try {
    const formData = await req.formData()
    const category = formData.get("category") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const description = formData.get("description") as string
    const features = formData.getAll("features") as string[] // course titles
    const imageFile = formData.get("image") as File | null

    // Validate category
    if (!category || !["Silver", "Gold", "Diamond", "Heroic"].includes(category)) {
      return NextResponse.json({ success: false, error: "Invalid package category" }, { status: 400 })
    }

    // Check for existing package
    const existingPackage = await Package.findOne({ category })
    if (existingPackage) {
      return NextResponse.json(
        {
          success: false,
          error: `Package "${category}" already exists. Use update instead.`,
        },
        { status: 400 },
      )
    }

    // Validate features
    const validFeatures = features.filter((f) => f.trim().length > 0)
    if (validFeatures.length === 0) {
      return NextResponse.json({ success: false, error: "At least one course is required" }, { status: 400 })
    }

    // Convert features into Course ObjectIds
    const courseRefs = []
    for (const title of validFeatures) {
      // Find existing course or create new one
      let course = await Course.findOne({ title })
      if (!course) {
        course = await Course.create({ title, videoPlaylist: [] })
      }
      courseRefs.push(course._id)
    }

    // Handle image upload
    const imagePath = await handleFileUpload(imageFile)

    // Create new package with explicit courseRefs
    const packageData = {
      category,
      price,
      description,
      courseRefs, // Make sure this is an array of ObjectIds
      image: imagePath,
    }

    // Debug log
    console.log("Creating package with data:", JSON.stringify(packageData, null, 2))
    console.log("courseRefs:", courseRefs)

    // Create the package directly
    const newPackage = await Package.create(packageData)

    // Return the created package with populated courseRefs
    const createdPackage = await Package.findById(newPackage._id).populate("courseRefs")

    return NextResponse.json({ success: true, data: createdPackage }, { status: 201 })
  } catch (err: any) {
    console.error("Error creating package:", err)

    // Provide more detailed error information
    let errorMessage = err.message || "Failed to create package"
    if (err.errors) {
      // Extract validation error messages
      const validationErrors = Object.keys(err.errors)
        .map((key) => {
          return `${key}: ${err.errors[key].message}`
        })
        .join(", ")
      errorMessage = `Validation failed: ${validationErrors}`
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: err.errors ? err.errors : undefined,
      },
      { status: 500 },
    )
  }
}

// UPDATE package
export async function PUT(req: NextRequest) {
  await connectToDatabase()

  try {
    const { category, price, description, features } = await req.json()

    // Find package to update
    const packageToUpdate = await Package.findOne({ category })
    if (!packageToUpdate) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 })
    }

    // Validate features
    const validFeatures = features.filter((f: string) => f.trim() !== "")
    if (validFeatures.length === 0) {
      return NextResponse.json({ success: false, error: "At least one course is required" }, { status: 400 })
    }

    // Convert titles to courseRefs
    const courseRefs = []
    for (const title of validFeatures) {
      let course = await Course.findOne({ title })
      if (!course) {
        course = await Course.create({ title, videoPlaylist: [] })
      }
      courseRefs.push(course._id)
    }

    // Update package
    packageToUpdate.price = price
    packageToUpdate.description = description
    packageToUpdate.courseRefs = courseRefs

    await packageToUpdate.save()

    // Return updated package with populated courseRefs
    const updatedPackage = await Package.findOne({ category }).populate("courseRefs")

    return NextResponse.json({ success: true, data: updatedPackage })
  } catch (err: any) {
    console.error("Error updating package:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// PATCH: Update package image only
export async function PATCH(req: NextRequest) {
  await connectToDatabase()

  try {
    const formData = await req.formData()
    const category = formData.get("category") as string
    const imageFile = formData.get("image") as File | null

    // Optional: also update other fields if they exist in formData
    const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : undefined
    const description = formData.get("description") as string | undefined
    const features = formData.getAll("features") as string[] | undefined

    // Find package to update
    const packageToUpdate = await Package.findOne({ category })
    if (!packageToUpdate) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 })
    }

    // Handle image update
    if (imageFile) {
      // Delete old image if exists
      if (packageToUpdate.image) {
        deleteImage(packageToUpdate.image)
      }

      // Upload new image
      const imagePath = await handleFileUpload(imageFile)
      packageToUpdate.image = imagePath
    }

    // Update other fields if provided
    if (price !== undefined) packageToUpdate.price = price
    if (description) packageToUpdate.description = description

    // Update courseRefs if features provided
    if (features && features.length > 0) {
      const validFeatures = features.filter((f) => f.trim() !== "")
      if (validFeatures.length > 0) {
        const courseRefs = []
        for (const title of validFeatures) {
          let course = await Course.findOne({ title })
          if (!course) {
            course = await Course.create({ title, videoPlaylist: [] })
          }
          courseRefs.push(course._id)
        }
        packageToUpdate.courseRefs = courseRefs
      }
    }

    await packageToUpdate.save()

    // Return updated package with populated courseRefs
    const updatedPackage = await Package.findOne({ category }).populate("courseRefs")

    return NextResponse.json({ success: true, data: updatedPackage })
  } catch (err: any) {
    console.error("Error updating package image:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// DELETE package
export async function DELETE(req: NextRequest) {
  await connectToDatabase()

  try {
    const { category } = await req.json()

    // Find package to delete
    const packageToDelete = await Package.findOne({ category })
    if (!packageToDelete) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 })
    }

    // Delete associated image if exists
    if (packageToDelete.image) {
      deleteImage(packageToDelete.image)
    }

    // Delete package
    await packageToDelete.deleteOne()

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    })
  } catch (err: any) {
    console.error("Error deleting package:", err)
    return NextResponse.json({ success: false, error: err.message || "Server error" }, { status: 500 })
  }
}
