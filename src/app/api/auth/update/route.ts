import { NextResponse, type NextRequest } from "next/server";
import * as context from "next/headers";
import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";

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

    // todo: send verify email

    authRequest.invalidate();

    await authRequest.validate();

    return NextResponse.json({
      message: "User updated successfully",
    });
  } catch (e: any) {
    return error(e.message, 500);
  }
};
