import { NextResponse, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

// Middleware to check if the user is authenticated and an admin
export async function middleware(req: NextRequest) {
  const session = await getSession({ req });

  // If the user is not logged in, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { user } = session;

  // If the user is trying to access the admin page and is not an admin
  if (req.url.includes('/api/admin') && user.role !== 'admin') {
    return NextResponse.json(
      { message: 'Forbidden: You do not have permission to access this resource' },
      { status: 403 }
    );
  }

  // Allow the request if everything is fine
  return NextResponse.next();
}

// Apply this middleware to the routes under `/api/admin/*`
export const config = {
  matcher: ['/api/admin/*'],
};
