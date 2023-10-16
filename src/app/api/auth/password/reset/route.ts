import ResetPasswordEmail from "@/emails/reset-password";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const email = formData.get("email");

  if (typeof email !== "string") {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      {
        status: 400,
      }
    );
  }

  const token = randomUUID();
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: token,
    },
  });

  const mailStatus = await resend.sendEmail({
    from: "RevPanel <noreply@revpanel.io>",
    to: [user.email],
    subject: "Reset your password",
    text: "",
    react: ResetPasswordEmail({
      name: user.name,
      link: `${process.env.APP_URL}/password/reset/callback?token=${token}`,
    }),
    tags: [
      {
        name: "category",
        value: "password-reset",
      },
    ],
  });

  if ("message" in mailStatus) {
    console.error(mailStatus);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Password reset email sent",
    },
    {
      status: 200,
    }
  );
};
