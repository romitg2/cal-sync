import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@/generated/prisma";
import { v4 as uuidv4 } from "uuid";
import { subscribeCalendar } from "./subscribeCalendar";

const prisma = new PrismaClient();
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      accessToken?: string;
      userId?: string;
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      console.log("access token", token.accessToken);

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;

      const userId = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
        },
      });

      session.user.userId = userId?.id;

      return session;
    },
    signIn: async ({ user, account }) => {
      console.log("user", user);
      console.log("account", account);

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (existingUser) {
        return true;
      }

      try {
        const newUser = await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name as string,
            accessToken: account?.access_token as string,
            refreshToken: account?.refresh_token as string,
          },
        });

        const channelId = uuidv4();

        await prisma.calendar.create({
          data: {
            token: account?.access_token as string,
            userId: newUser.id,
            GoogleChannelId: channelId,
          },
        });

        await subscribeCalendar(channelId, account?.access_token as string);

        console.log("newUser created sucessfully", newUser);
      } catch (error) {
        console.log("error creating user", error);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
