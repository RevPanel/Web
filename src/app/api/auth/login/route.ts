import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { UserAction } from "@prisma/client";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "node-2fa";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const code = formData.get("code");

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);

    const user = await prisma.user.findUnique({
      where: {
        id: key.userId,
      },
      select: {
        twoFactorSecret: true,
      },
    });

    if (user?.twoFactorSecret) {
      if (typeof code !== "string") {
        return NextResponse.json(
          {
            error: "Missing required fields",
            is2fa: true,
          },
          {
            status: 400,
          }
        );
      }

      const verified = verifyToken(user.twoFactorSecret, code);
      if (!verified || verified.delta !== 0) {
        return NextResponse.json(
          {
            error: "Invalid code",
          },
          {
            status: 400,
          }
        );
      }
    }

    const address = request.headers.get("x-real-ip") || request.ip;
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {
        address: address || "N/A",
        user_agent: request.headers.get("user-agent") || "N/A",
      },
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);

    await prisma.userLogs.create({
      data: {
        userId: key.userId,
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
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      return NextResponse.json(
        {
          error: "Incorrect username or password",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
