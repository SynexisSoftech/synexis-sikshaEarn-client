import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const path = request.nextUrl.pathname

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Protect admin API routes
  if (path.startsWith("/api/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized: Admin access required" }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
