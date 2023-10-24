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
  const code = body.get("code") as string;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.userId,
    },

    select: {
      twoFactorSecret: true,
    },
  });

  if (!code || !user?.twoFactorSecret) {
    return error("Missing code", 400);
  }

  const verified = verifyToken(user.twoFactorSecret, code);
  if (!verified || verified.delta !== 0) {
    return error("Invalid code", 400);
  }

  return NextResponse.redirect("/panel");
}
