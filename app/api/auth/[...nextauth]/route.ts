import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/models/db';
import User from '../../../../lib/models/user';
import bcrypt from 'bcryptjs';

import type { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connectToDatabase();
  
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("User not found");
  
          const isPasswordValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");
  
          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in");
          }
  
          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
          };
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (session.user && token) {
          session.user.id = token.sub;
          session.user.role = token.role;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
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
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };