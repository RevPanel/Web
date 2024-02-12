import { NextRequest, NextResponse } from "next/server";
import { error } from "@/utils/responses";
import prisma from "@/lib/prisma";
import { getUser } from "@/components/auth";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";

export async function POST(req: NextRequest) {
  const session = await getUser();

  if (!session) {
    return error("Not logged in", 403);
  }

  const body = await req.formData();
  const code = body.get("code") as string;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },

    select: {
      twoFactorSecret: true,
    },
  });

  if (!code || !user?.twoFactorSecret) {
    return error("Missing code", 400);
  }

  const verified = await new TOTPController().verify(
    code,
    decodeHex(user.twoFactorSecret)
  );
  if (!verified) {
    return error("Invalid code", 400);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/panel",
    },
  });
}
