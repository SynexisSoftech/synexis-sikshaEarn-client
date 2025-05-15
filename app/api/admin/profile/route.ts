import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import User from "@/lib/models/user"
import { getToken } from "next-auth/jwt"

// GET - Retrieve admin profile details
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 })
    }

    await connectToDatabase()

    const user = await User.findById(token.id).select("-password").lean()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Error fetching admin profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
