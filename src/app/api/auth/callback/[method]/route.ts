import { auth, discordAuth, validateCallback } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      method: string;
    };
  }
) => {
  if (!["discord", "github"].includes(params.method)) {
    return new Response(null, {
      status: 400,
    });
  }

  const storedState = cookies().get(
    `${params.method.toLowerCase()}_oauth_state`
  )?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const res = await validateCallback(params.method, code);
    if (!res) {
      return new Response(null, {
        status: 400,
      });
    }

    const { getExistingUser, platformUser, createUser } = res;
    const getUser = async () => {
      let existingUser = await getExistingUser();
      if (existingUser) return existingUser;

      const prismaUser = await prisma.user.findFirst({
        where: {
          email: platformUser.email!,
        },
      });

      let user;

      if (prismaUser) {
        await auth.createKey({
          userId: prismaUser.id,
          providerId: params.method.toLowerCase(),
          providerUserId: String(platformUser.id),
          password: null,
        });

        user = await auth.getUser(prismaUser.id);
      } else {
        let username;
        let name;

        if ("global_name" in platformUser && "username" in platformUser) {
          name = platformUser.global_name || platformUser.username;
          username = platformUser.username.toLowerCase();
        } else if ("login" in platformUser) {
          name = platformUser.name;
          username = platformUser.login.toLowerCase();
        }

        user = await createUser({
          attributes: {
            username: username!,
            email: platformUser.email!,
            name: name!,
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
        Location: "/panel",
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
