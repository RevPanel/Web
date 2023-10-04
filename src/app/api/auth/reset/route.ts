import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import * as context from "next/headers";
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

  // todo: send email
  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
};
