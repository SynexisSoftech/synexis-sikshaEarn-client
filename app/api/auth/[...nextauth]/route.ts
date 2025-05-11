import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/models/db';
import User from '../../../../lib/models/user';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from "next-auth";

// Define your custom user and session types
interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    image: string | null;
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          console.log('Authorization attempt with credentials:', {
            email: credentials?.email,
            hasPassword: !!credentials?.password
          });

          await connectToDatabase();
  
          if (!credentials?.email || !credentials.password) {
            console.error('Missing credentials');
            throw new Error("Email and password are required");
          }
  
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.error('User not found for email:', credentials.email);
            throw new Error("User not found");
          }
  
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            console.error('Invalid password for user:', user.email);
            throw new Error("Invalid password");
          }
  
          if (!user.emailVerified) {
            console.error('Email not verified for user:', user.email);
            throw new Error("Please verify your email before logging in");
          }
          if (user.blocked) {
            return new Response('This account is blocked', { status: 403 });
          }
          

          const userData = {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };

          console.log('Authorization successful. Returning user:', userData);
          return userData;
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        console.log('Session callback triggered with initial session:', session);
        console.log('Token received in session callback:', token);

        if (session.user) {
          session.user.id = token.sub || token.id;
          session.user.role = token.role;
          session.user.image = token.image;
    
          console.log("Final session object:", {
            user: {
              id: session.user.id,
              name: session.user.name,
              email: session.user.email,
              role: session.user.role,
              image: session.user.image,
            },
            expires: session.expires
          });
        }
        return session;
      },
      async jwt({ token, user }) {
        console.log('JWT callback triggered with token:', token);
        if (user) {
          console.log('JWT callback processing user:', user);
          token.id = user.id;
          token.role = user.role;
          token.image = user.image;
          console.log('Updated token with user data:', token);
        }
        return token;
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      },
      cookies: {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          },
        },
      },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
};
  
const handler = NextAuth(authOptions);
  
export { handler as GET, handler as POST };