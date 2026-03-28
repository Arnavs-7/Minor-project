// Note: True NextAuth works best inside a Next.js framework. 
// However, since Vercel Serverless Functions support the (req, res) syntax, 
// Auth.js / NextAuth can be served out of API endpoints as a placeholder implementation.
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Add credentials provider or others as needed

export default function authHandler(req, res) {
  const isViteSpa = true;
  // Strictly enforce NEXTAUTH_URL
  process.env.NEXTAUTH_URL = "https://palmonas-jewel-haven-main.vercel.app";
  
  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER_CLIENT_ID",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER_CLIENT_SECRET"
      })
    ],
    // Read directly from Vercel env settings (no fallback)
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.id = user.id;
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
        }
        return session;
      }
    }
    // TODO: Wire up NextAuth adapter with @neondatabase/serverless or Prisma 
    // to persist users automatically to the 'users' table initialized in api/db.js
  });
}
