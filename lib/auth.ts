// lib/auth.ts
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth';
import { auth as nextAuth } from 'next-auth'; // ✅ import `auth()` properly

export const authOptions: NextAuthOptions = {
  // ... your existing providers and callbacks
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  // ... rest of your configuration
}
export const auth = nextAuth; 