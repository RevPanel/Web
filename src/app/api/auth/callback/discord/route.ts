import { auth, discordAuth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("discord_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code);

    const getUser = async () => {
      let existingUser = await getExistingUser();
      if (existingUser) return existingUser;

      const prismaUser = await prisma.user.findFirst({
        where: {
          email: discordUser.email,
        },
      });

      let user;

      if (prismaUser) {
        await auth.createKey({
          userId: prismaUser.id,
          providerId: "discord",
          providerUserId: discordUser.id,
          password: null,
        });

        user = await auth.getUser(prismaUser.id);
      } else {
        user = await createUser({
          attributes: {
            username: discordUser.username.toLowerCase(),
            email: discordUser.email!,
            name: discordUser.global_name || discordUser.username,
          },
        });
      }

      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });

    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
};
