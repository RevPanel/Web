import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import prismadb from "@/lib/prisma";

// expect error (see next section)
export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(), // NOT nextjs()
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

export type Auth = typeof auth;
