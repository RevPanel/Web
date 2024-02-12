import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { token } }: { params: { token: string } }
) {
  const server = await prisma.server.findUnique({
    where: {
      token,
    },
    select: {
      name: true,
      id: true,
      token: true,
      url: true,
      owner: {
        select: {
          plan: true,
        },
      },
    },
  });

  if (!server) {
    return error("Invalid token", 404);
  }

  return NextResponse.json(server);
}
