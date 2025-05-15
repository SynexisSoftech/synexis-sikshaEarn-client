import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import User from "@/lib/models/user"
import { getToken } from "next-auth/jwt"

// PATCH - Update admin's first name and last name
export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 })
    }

    const body = await req.json()
    const { firstName, lastName } = body

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "First name and last name are required" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findById(token.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    user.firstName = firstName
    user.lastName = lastName
    await user.save()

    return NextResponse.json({
      success: true,
      message: "Name updated successfully",
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
    })
  } catch (error) {
    console.error("Error updating admin name:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
