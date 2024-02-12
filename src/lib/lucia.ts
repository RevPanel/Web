import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Discord, GitHub, Google } from "arctic";
import { Octokit } from "@octokit/core";
import { Lucia } from "lucia";
import DiscordOauth2 from "discord-oauth2";

export const lucia = new Lucia(new PrismaAdapter(prisma.session, prisma.user), {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getSessionAttributes: (data) => {
    return {
      address: data.address,
      user_agent: data.user_agent,
    };
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      avatarUrl: data.avatarUrl,
      plan: data.plan,
      serverCreated: data.serverCreated,
      stripeId: data.stripeId,
      admin: data.admin,
      twoFactorEnabled: data.twoFactorSecret ? true : false,
    };
  },
});

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);
export const discord = new Discord(
  process.env.DISCORD_CLIENT_ID!,
  process.env.DISCORD_CLIENT_SECRET!,
  process.env.APP_URL + "/api/auth/callback/discord"
);
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.APP_URL + "/api/auth/callback/google"
);

export const getAuthUrl = async (state: string, method: string) => {
  switch (method) {
    case "discord":
      return await discord.createAuthorizationURL(state, {
        scopes: ["identify", "email"],
      });
    case "github":
      return await github.createAuthorizationURL(state, {
        scopes: ["read:user", "user:email"],
      });

    default:
      return null;
  }
};

export const validateCallback = async (method: string, code: string) => {
  let tokens;

  switch (method) {
    case "github":
      tokens = await github.validateAuthorizationCode(code);

      const octokit = new Octokit({ auth: tokens.accessToken });
      const githubUser = await octokit.request("GET /user");
      let email = githubUser.data.email;
      if (!email) {
        const emails = await octokit.request("GET /user/emails");
        const primaryEmail = emails.data.find((email) => email.primary);
        if (primaryEmail) {
          email = primaryEmail.email;
        }
      }

      if (!email) {
        return null;
      }

      return {
        id: githubUser.data.id.toString(),
        email,
        name: githubUser.data.name || githubUser.data.login,
        avatarUrl: githubUser.data.avatar_url,
        username: githubUser.data.login,
      };
    case "discord":
      tokens = await discord.validateAuthorizationCode(code);

      const oauth = new DiscordOauth2();
      const discordUser = await oauth.getUser(tokens.accessToken);

      if (!discordUser || !discordUser.id || !discordUser.email) {
        return null;
      }

      return {
        id: discordUser.id,
        email: discordUser.email,
        name: discordUser.global_name || discordUser.username,
        avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
        username: discordUser.username,
      };
    default:
      return null;
  }
};

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  username: string;
  name: string;
  emailVerified: boolean;
  plan?: string | null;
  emailToken?: string | null;
  avatarUrl?: string | null;
  serverCreated: boolean;
  stripeId?: string | null;
  admin?: boolean | null;
  twoFactorSecret?: string | null;
}

interface DatabaseSessionAttributes {
  address: string;
  user_agent: string;
}
