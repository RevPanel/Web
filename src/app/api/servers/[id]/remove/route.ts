import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const body = await req.json();

  const server = await prisma.server.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (!body?.token) {
    return error("No token provided", 400);
  }

  if (body.token !== server.key) {
    return error("Invalid token", 401);
  }

  await prisma.server.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
