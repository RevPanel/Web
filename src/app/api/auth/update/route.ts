import { getUser } from "@/components/auth";
import RegisterEmail from "@/emails/register";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { error } from "@/utils/responses";
import { createId } from "@paralleldrive/cuid2";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const { email, name } = await req.json();
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
        email: email,
      },
    });

    if (email !== session.user.email) {
      const newToken = createId();
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          emailToken: newToken,
          emailVerified: false,
        },
      });

      const mailStatus = await sendEmail(
        session.user.email,
        "Verify your new email",
        RegisterEmail({
          name: session.user.name,
          link: `${process.env.APP_URL}/api/auth/verify/${newToken}`,
        })
      );

      if ("message" in mailStatus) {
        console.error(mailStatus);
      }
    }

    return NextResponse.json({
      message: "User updated successfully",
    });
  } catch (e: any) {
    return error(e.message, 500);
  }
};
