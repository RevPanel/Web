import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  {
    params: { user: userId },
  }: {
    params: {
      user: string;
    };
  }
) {
  const authorization = req.headers.get("authorization");
  if (!authorization) return error("No authorization header", 401);

  const token = authorization.split(" ")[1];
  if (!token) return error("No token provided", 401);

  if (token !== process.env.ADMIN_KEY) {
    return error("Invalid token", 401);
  }

  const user = await prisma.user.findFirst({
    where: {
      oauthAccounts: {
        some: {
          providerId: "discord",
          providerUserId: userId,
        },
      },
    },
    select: {
      plan: true,
    },
  });

  if (!user) return error("User not found", 404);

  return NextResponse.json({
    plan: user.plan,
    paid: user.plan && user.plan !== "free",
  });
}
