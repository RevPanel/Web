import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const token = formData.get("resetToken");
  const newPassword = formData.get("newPassword");

  if (typeof token !== "string" || typeof newPassword !== "string") {
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
      resetToken: token,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await auth.updateKeyPassword("username", user.username, newPassword);

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (e: any) {
    return error(e.message, 500);
  }
};
