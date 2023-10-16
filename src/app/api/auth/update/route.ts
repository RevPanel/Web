import RegisterEmail from "@/emails/register";
import { auth } from "@/lib/lucia";
import resend from "@/lib/resend";
import { error } from "@/utils/responses";
import { createId } from "@paralleldrive/cuid2";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const { email, name } = await req.json();
  try {
    await auth.updateUserAttributes(session.user.userId, {
      name: name,
      email: email,
    });

    if (email !== session.user.email) {
      const newToken = createId();
      await auth.updateUserAttributes(session.user.userId, {
        emailVerified: false,
        emailToken: newToken,
      });

      const mailStatus = await resend.sendEmail({
        from: "RevPanel <noreply@revpanel.io>",
        to: [session.user.email],
        subject: "Thanks for creating an account!",
        text: "",
        react: RegisterEmail({
          name: session.user.name,
          link: `${process.env.APP_URL}/api/auth/verify/${newToken}`,
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
    }

    authRequest.invalidate();

    await authRequest.validate();

    return NextResponse.json({
      message: "User updated successfully",
    });
  } catch (e: any) {
    return error(e.message, 500);
  }
};
