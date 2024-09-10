import RegisterEmail from "@/emails/register";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { createId } from "@paralleldrive/cuid2";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";

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
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);
    const emailToken = createId();

    await prisma.user.create({
      data: {
        id: userId,
        username: username.toLowerCase(),
        email,
        name,
        hashed_password: hashedPassword,
        emailToken,
      },
    });

    const session = await lucia.createSession(userId, {
      address: request.headers.get("x-real-ip") || request.ip || "N/A",
      user_agent: request.headers.get("user-agent") || "N/A",
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    await sendEmail(
      email,
      "Welcome to RevPanel",
      RegisterEmail({
        name,
        link: `${process.env.APP_URL}/auth/verify/${emailToken}`,
      })
    );

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
