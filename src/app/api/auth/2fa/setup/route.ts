import { NextRequest, NextResponse } from "next/server";
import * as context from "next/headers";
import { auth } from "@/lib/lucia";
import { error } from "@/utils/responses";
import { verifyToken } from "node-2fa";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const body = await req.formData();
  const secret = body.get("secret") as string;
  const code = body.get("code") as string;

  if (!secret || !code) {
    return error("Missing secret or code", 400);
  }

  const verified = verifyToken(secret, code);
  if (!verified) {
    return error("Invalid code", 400);
  }

  await prisma.user.update({
    where: {
      id: session.user.userId,
    },
    data: {
      twoFactorSecret: secret,
    },
  });

  return NextResponse.redirect("/panel/account");
}
