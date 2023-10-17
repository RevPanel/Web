import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { error } from "@/utils/responses";
import * as context from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id as string,
    },
    include: {
      members: {
        where: {
          userId: session.user.userId,
        },
      },
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId && !server.members.length) {
    return error("Unauthorized", 403);
  }

  return new NextResponse(JSON.stringify(server), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const authRequest = auth.handleRequest(req.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return error("Not logged in", 403);
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.id as string,
    },
  });

  if (!server) {
    return error("Server not found", 404);
  }

  if (server.ownerId !== session.user.userId) {
    return error("Unauthorized", 403);
  }

  const body = await req.json();
  await prisma.server.update({
    where: {
      id: server.id,
    },
    data: {
      name: body.name,
      description: body.description,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
