import { auth, validateCallback } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { UserAction } from "@prisma/client";
import * as context from "next/headers";

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

  const authRequest = auth.handleRequest(request.method, context);
  const currentSession = await authRequest.validate();

  const storedState = context
    .cookies()
    .get(`${params.method.toLowerCase()}_oauth_state`)?.value;
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

    const { getExistingUser, platformUser, createUser, createKey } = res;
    const getUser = async () => {
      let existingUser = await getExistingUser();
      if (existingUser) return existingUser;

      if (!platformUser.emailVerified) {
        throw new Error("Email not verified");
      }

      if (currentSession) {
        await createKey(currentSession.user.userId);
        return currentSession.user;
      }

      const prismaUser = await prisma.user.findFirst({
        where: {
          email: platformUser.email!,
        },
      });

      let user;

      if (prismaUser) {
        await createKey(prismaUser.id);

        user = auth.transformDatabaseUser(prismaUser);
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
            emailVerified: true,
          },
        });
      }

      return user;
    };

    const user = await getUser();
    const address = request.headers.get("x-real-ip") || request.ip;
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {
        address: address || "N/A",
        user_agent: request.headers.get("user-agent") || "N/A",
      },
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);

    await prisma.userLogs.create({
      data: {
        userId: user.userId,
        action: UserAction.LOGIN,
      },
    });

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
