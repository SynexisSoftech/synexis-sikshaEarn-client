import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import KycVerification from "@/lib/models/KycVerification"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Middleware to check if user is admin
async function isAdmin() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return false
  }

  return session.user?.role === "admin"
}

// GET - Retrieve all KYC verifications (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check if user is admin
    const admin = await isAdmin()

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    // Build query based on status filter
    const query = status ? { status } : {}

    const kycVerifications = await KycVerification.find(query)
      .sort({ submittedAt: -1 }) // Most recent first
      .lean()

    return NextResponse.json({ success: true, data: kycVerifications })
  } catch (error) {
    console.error("Error fetching KYC verifications:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}