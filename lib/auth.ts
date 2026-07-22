import NextAuth from "next-auth"
import { compare } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },  
      },
      async authorize(credentials) {
        const typedCredentials = credentials as Record<string, string> | undefined;

        if (!typedCredentials?.email || !typedCredentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: typedCredentials.email },
        });
        if (!user) return null;
        
        const isValid = await compare(typedCredentials.password, user.password!);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  
  // ADD THESE:
  pages: {
    signIn: "/login",
    error: "/login",
  },
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
})