import prismadb from "@/lib/prisma";
import { prisma } from "@lucia-auth/adapter-prisma";
import { discord, github } from "@lucia-auth/oauth/providers";
import { Octokit } from "@octokit/core";
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

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: `${
    process.env.APP_URL || process.env.VERCEL_URL
  }/api/auth/callback/github`,
  scope: ["user:email", "read:user"],
});

export type Auth = typeof auth;

export const getAuthUrl = async (method: string) => {
  switch (method) {
    case "discord":
      return await discordAuth.getAuthorizationUrl();
    case "github":
      return await githubAuth.getAuthorizationUrl();
    default:
      return null;
  }
};

export const validateCallback = async (method: string, code: string) => {
  let data;

  switch (method) {
    case "discord":
      data = await discordAuth.validateCallback(code);
      break;
    case "github":
      data = await githubAuth.validateCallback(code);
      break;
    default:
      data = null;
      break;
  }

  if (!data) return null;

  const { getExistingUser, createUser } = data;
  let platformUser;

  if ("discordUser" in data) {
    platformUser = data.discordUser;
  } else if ("githubUser" in data) {
    platformUser = data.githubUser;

    if (!platformUser.email) {
      const octokit = new Octokit({ auth: data.githubTokens.accessToken });
      const emails = await octokit.request("GET /user/emails");
      const primaryEmail = emails.data.find((email) => email.primary);
      if (primaryEmail) {
        platformUser.email = primaryEmail.email;
      }
    }
  }

  return {
    getExistingUser,
    createUser,
    platformUser: platformUser!,
  };
};
