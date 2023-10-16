import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return error("Missing required fields", 400);
  }

  try {
    const key = await auth.useKey(
      "username",
      session.user.username,
      currentPassword
    );

    if (!key) {
      return error("Incorrect password", 400);
    }

    await auth.updateKeyPassword(
      "username",
      session.user.username,
      newPassword
    );

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (e: any) {
    return error("Invalid current password", 500);
  }
};
