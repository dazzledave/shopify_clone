import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as any;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // We use the full Prisma-enabled auth here to fetch the role
      const user = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;

      token.role = user.role;
      return token;
    },
  },
});
