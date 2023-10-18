import RegisterEmail from "@/emails/register";
import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import { UserAction } from "@prisma/client";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        error: "Passwords do not match",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: {
        email,
        username: username.toLowerCase(),
        name,
        emailVerified: false,
        serverCreated: false,
      },
    });

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
        action: UserAction.REGISTER,
      },
    });

    const { emailToken } = (await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        emailToken: true,
      },
    })) || { emailToken: null };

    const mailStatus = await resend.sendEmail({
      from: "RevPanel <noreply@revpanel.io>",
      to: [user.email],
      subject: "Thanks for creating an account!",
      text: "",
      react: RegisterEmail({
        name: user.name,
        link: `${process.env.APP_URL}/api/auth/verify/${emailToken}`,
      }),
      tags: [
        {
          name: "category",
          value: "register",
        },
      ],
    });

    if ("message" in mailStatus) {
      console.error(mailStatus);
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/panel/account",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Username already taken",
      },
      {
        status: 400,
      }
    );
  }
};
