import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Argon2id } from "oslo/password";

export const POST = async (req: NextRequest) => {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return error("Missing required fields", 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        hashed_password: true,
      },
    });

    if (!user || !user.hashed_password) {
      return error("Incorrect password", 400);
    }

    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      currentPassword
    );

    if (!validPassword) {
      return error("Incorrect password", 400);
    }

    const hashedPassword = await new Argon2id().hash(newPassword);
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        hashed_password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (e: any) {
    return error("Invalid current password", 500);
  }
};
