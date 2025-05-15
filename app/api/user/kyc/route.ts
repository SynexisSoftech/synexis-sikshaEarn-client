import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import KycVerification from "@/lib/models/KycVerification"
import { getToken } from "next-auth/jwt"

// Middleware to check if user is authenticated
async function isAuthenticated(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return null
  }

  return token
}

// GET - Retrieve user's own KYC data
export async function GET(req: NextRequest) {
  try {
    const token = await isAuthenticated(req)

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const kycData = await KycVerification.findOne({ userId: token.id }).lean()

    if (!kycData) {
      return NextResponse.json({ message: "No KYC verification found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: kycData })
  } catch (error) {
    console.error("Error fetching KYC data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST - Submit new KYC verification
export async function POST(req: NextRequest) {
  try {
    const token = await isAuthenticated(req)

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    await connectToDatabase()

    // Check if user already has a KYC submission
    const existingKyc = await KycVerification.findOne({ userId: token.id })

    if (existingKyc) {
      return NextResponse.json({ error: "KYC verification already submitted" }, { status: 400 })
    }

    // Create new KYC verification
    const newKyc = await KycVerification.create({
      ...body,
      userId: token.id,
      status: "pending",
      submittedAt: new Date(),
    })

    return NextResponse.json({ success: true, data: newKyc }, { status: 201 })
  } catch (error) {
    console.error("Error creating KYC verification:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// PATCH - Update KYC verification (only if status is pending or rejected)
export async function PATCH(req: NextRequest) {
  try {
    const token = await isAuthenticated(req)

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    await connectToDatabase()

    // Find user's KYC submission
    const existingKyc = await KycVerification.findOne({ userId: token.id })

    if (!existingKyc) {
      return NextResponse.json({ error: "No KYC verification found" }, { status: 404 })
    }

    // Only allow updates if status is pending or rejected
    if (existingKyc.status === "approved") {
      return NextResponse.json({ error: "Cannot update approved KYC verification" }, { status: 400 })
    }

    // Update KYC verification
    const updatedKyc = await KycVerification.findOneAndUpdate(
      { userId: token.id },
      {
        ...body,
        status: "pending", // Reset to pending if it was rejected
        submittedAt: new Date(),
      },
      { new: true },
    )

    return NextResponse.json({ success: true, data: updatedKyc })
  } catch (error) {
    console.error("Error updating KYC verification:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
