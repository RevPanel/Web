import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";
import { Argon2id } from "oslo/password";

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

  if (
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      }
    );
  }

  if (password.length < 6 || password.length > 255) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        hashed_password: true,
        twoFactorSecret: true,
      },
    });

    if (!user || !user.hashed_password) {
      return NextResponse.json(
        {
          error: "Incorrect username or password",
        },
        {
          status: 400,
        }
      );
    }

    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      password
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Incorrect username or password",
        },
        {
          status: 400,
        }
      );
    }

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

      const verified = await new TOTPController().verify(
        code,
        decodeHex(user.twoFactorSecret)
      );
      if (!verified) {
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

    const session = await lucia.createSession(user.id, {
      address: request.headers.get("x-real-ip") || request.ip || "N/A",
      user_agent: request.headers.get("user-agent") || "N/A",
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
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: "Incorrect username or password",
      },
      {
        status: 400,
      }
    );
  }
};
