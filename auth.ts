import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserPosition } from "@prisma/client";
import authConfig from "./auth.config";

import "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    plan?: UserPosition;
    credits?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db), // make sure this points to the same Prisma client
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
            accounts: {
              // @ts-ignore
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
                idToken: account.id_token,
                sessionState: account.session_state,
              },
            },
          },
        });
      } else {
        // link account if needed
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refreshToken: account.refresh_token,
              accessToken: account.access_token,
              expiresAt: account.expires_at,
              tokenType: account.token_type,
              scope: account.scope,
              idToken: account.id_token,
              // @ts-ignore
              sessionState: account.session_state,
            },
          });
        }
      }
      return true;
    },

    // Ensure token.sub contains our DB user id (not a NextAuth UUID)
async jwt({ token, user }) {
  // On first sign in
  if (user) {
    const dbUser = await db.user.findUnique({
      where: { email: user.email! },
      select: { id: true, plan: true, credits: true, name: true },
    });

    if (dbUser) {
      token.id = dbUser.id;
      token.plan = dbUser.plan;
      token.credits = dbUser.credits;
      token.name = dbUser.name;
    }
  } else if (token.email) {
    // On subsequent requests, revalidate from DB to ensure token carries the correct plan
    const dbUser = await db.user.findUnique({
      where: { email: token.email as string },
      select: { id: true, plan: true, credits: true, name: true },
    });

    if (dbUser) {
      token.id = dbUser.id;
      token.plan = dbUser.plan;
      token.credits = dbUser.credits;
      token.name = dbUser.name;
    }
  }

  return token;
}


,

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.plan = token.plan as UserPosition
        session.user.credits = token.credits as number
      }
      return session
    },
  },
  ...authConfig,
});
