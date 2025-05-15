import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import KycVerification from "@/lib/models/KycVerification"
import mongoose from "mongoose"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Admin verification middleware
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.role === "admin"
}

// GET - Retrieve specific KYC verification by ID (Admin only)
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Admin check
    if (!await verifyAdmin()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 403 }
      )
    }

    const { id } = params

    // ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid KYC ID format" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const kycVerification = await KycVerification.findById(id).lean()

    if (!kycVerification) {
      return NextResponse.json(
        { success: false, error: "KYC verification not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: kycVerification })
  } catch (error) {
    console.error("Error fetching KYC verification:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// PATCH - Update KYC verification status (Admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin check
    if (!await verifyAdmin()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 403 }
      )
    }

    const { id } = params

    // ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid KYC ID format" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { status, reviewerComment } = body

    // Status validation
    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid status. Must be 'approved' or 'rejected'" 
        },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const kycVerification = await KycVerification.findById(id)

    if (!kycVerification) {
      return NextResponse.json(
        { success: false, error: "KYC verification not found" },
        { status: 404 }
      )
    }

    // Update KYC
    kycVerification.status = status
    kycVerification.reviewedAt = new Date()
    kycVerification.reviewerComment = reviewerComment || undefined

    await kycVerification.save()

    return NextResponse.json({
      success: true,
      message: `KYC verification ${status}`,
      data: kycVerification,
    })
  } catch (error) {
    console.error("Error updating KYC verification:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// DELETE - Remove a KYC verification (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin check
    if (!await verifyAdmin()) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 403 }
      )
    }

    const { id } = params

    // ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid KYC ID format" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const deletedKyc = await KycVerification.findByIdAndDelete(id)

    if (!deletedKyc) {
      return NextResponse.json(
        { success: false, error: "KYC verification not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "KYC verification deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting KYC verification:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}