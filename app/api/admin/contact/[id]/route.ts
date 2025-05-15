import { connectToDatabase } from "@/lib/models/db"
import { Contact } from "@/lib/models/Contact"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated and has admin role
    const token = await getToken({
      req: req as any, // Type casting needed as Request types differ
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 })
    }

    await connectToDatabase()
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required." }, { status: 400 })
    }

    const deleted = await Contact.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
