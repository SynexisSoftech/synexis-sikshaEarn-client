import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import User from "@/lib/models/user"
import { getToken } from "next-auth/jwt"
import bcrypt from "bcryptjs"

// POST - Change admin's password
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 })
    }

    const body = await req.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findById(token.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Error changing admin password:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
