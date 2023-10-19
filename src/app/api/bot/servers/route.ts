import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization) return error("No authorization header", 401);

  const token = authorization.split(" ")[1];
  if (!token) return error("No token provided", 401);

  if (token !== process.env.ADMIN_KEY) {
    return error("Invalid token", 401);
  }

  const query = new URL(req.nextUrl).searchParams;
  const discordId = query.get("discordId");
  if (!discordId) return error("No discordId provided", 400);

  const user = await prisma.user.findFirst({
    where: {
      key: {
        some: {
          id: `discord:${discordId}`,
        },
      },
    },
    include: {
      servers: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  });

  if (!user) return error("User not found", 404);

  return NextResponse.json(user.servers);
}
