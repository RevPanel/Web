import prismadb from "@/lib/prisma";
import { prisma } from "@lucia-auth/adapter-prisma";
import { discord } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: prisma(prismadb),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      name: data.name,
      email: data.email,
    };
  },
});

export const discordAuth = discord(auth, {
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  redirectUri: `${
    process.env.APP_URL || process.env.VERCEL_URL
  }/api/auth/callback/discord`,
  scope: ["email"],
});

export type Auth = typeof auth;
