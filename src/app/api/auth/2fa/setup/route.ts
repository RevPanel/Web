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
  const secret = body.get("secret") as string;
  const code = body.get("code") as string;

  if (!secret || !code) {
    return error("Missing secret or code", 400);
  }

  const verified = await new TOTPController().verify(code, decodeHex(secret));
  if (!verified) {
    return error("Invalid code", 400);
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      twoFactorSecret: secret,
    },
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/panel/account",
    },
  });
}
