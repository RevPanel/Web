import { getUser } from "@/components/auth";
import { lucia, validateCallback } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { User, UserAction } from "@prisma/client";
import { generateId } from "lucia";
import * as context from "next/headers";
import { cookies } from "next/headers";

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
  if (!["discord", "github", "google"].includes(params.method)) {
    return new Response(null, {
      status: 400,
    });
  }

  const currentSession = await getUser();

  const storedState = context
    .cookies()
    .get(`${params.method.toLowerCase()}_oauth_state`)?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    console.error("Invalid state or code");
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const data = await validateCallback(params.method, code);
    if (!data) {
      return new Response(null, {
        status: 400,
      });
    }

    const oauthAccount = await prisma.oauthAccount.findFirst({
      where: {
        providerId: params.method.toLowerCase(),
        providerUserId: data.id,
      },
    });

    if (oauthAccount) {
      return handleLogin(request, oauthAccount.userId);
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (currentSession || existingEmail) {
      const userId = existingEmail ? existingEmail.id : currentSession!.user.id;

      await prisma.oauthAccount.create({
        data: {
          providerId: params.method.toLowerCase(),
          providerUserId: data.id,
          userId: userId,
        },
      });

      return handleLogin(request, userId);
    }

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    const username = existingUsername
      ? `${data.username}${generateId(5)}`
      : data.username;

    const userId = generateId(15);
    const user = await prisma.user.create({
      data: {
        id: userId,
        username: username,
        name: data.name,
        email: data.email,
        emailVerified: true,
        avatarUrl: data.avatarUrl,
        oauthAccounts: {
          create: {
            providerId: params.method.toLowerCase(),
            providerUserId: data.id,
          },
        },
      },
    });

    return handleLogin(request, user.id);
  } catch (e) {
    console.error(e);

    return new Response(null, {
      status: 500,
    });
  }
};

async function handleLogin(request: NextRequest, userId: string) {
  const address = request.headers.get("x-real-ip") || request.ip || "N/A";
  const user_agent = request.headers.get("user-agent") || "N/A";

  await prisma.userLogs.create({
    data: {
      userId: userId,
      action: UserAction.LOGIN,
    },
  });

  const session = await lucia.createSession(userId, {
    address,
    user_agent,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/panel",
    },
  });
}
